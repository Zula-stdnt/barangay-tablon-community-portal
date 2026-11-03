/**
 * ============================================================================
 * [ITE 387: Lab 01 & Lab 03 - Consolidated Form State & Local Persistence]
 * File: js/modules/feedback.js
 * Description: Interactive citizen feedback controller implementing consolidated
 * object state, input validation, and localStorage persistence.
 * ============================================================================
 */

import { showToast } from './toast.js';

const STORAGE_KEY = 'tablon_resident_feedback';

/**
 * [ITE 387: AI Reference §5.4 Optimization 02]
 * Consolidated state object representing form fields.
 */
let formData = {
  fullName: '',
  email: '',
  contactNumber: '',
  category: 'general',
  message: '',
};

/**
 * Retrieves past submissions from browser LocalStorage.
 *
 * @returns {Array<Object>} List of submitted inquiries
 */
export const getStoredFeedback = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading feedback from storage:', err);
    return [];
  }
};

/**
 * Saves a new feedback submission to LocalStorage.
 *
 * @param {Object} entry - Feedback data payload
 */
const saveFeedback = (entry) => {
  const existing = getStoredFeedback();
  const updated = [
    {
      id: `FB-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...entry,
    },
    ...existing,
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

/**
 * Initializes the Resident Feedback Form on services.html.
 *
 * @param {string} formId - Target form element ID
 */
export const initFeedbackForm = (formId = 'residentFeedbackForm') => {
  const form = document.getElementById(formId);
  if (!form) return;

  const nameInput = form.querySelector('[name="fullName"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="contactNumber"]');
  const categoryInput = form.querySelector('[name="category"]');
  const messageInput = form.querySelector('[name="message"]');

  // Input change handler maintaining consolidated state immutability
  const handleInputChange = (field, value) => {
    formData = {
      ...formData,
      [field]: value.trim(),
    };
  };

  if (nameInput) nameInput.addEventListener('input', (e) => handleInputChange('fullName', e.target.value));
  if (emailInput) emailInput.addEventListener('input', (e) => handleInputChange('email', e.target.value));
  if (phoneInput) phoneInput.addEventListener('input', (e) => handleInputChange('contactNumber', e.target.value));
  if (categoryInput) categoryInput.addEventListener('change', (e) => handleInputChange('category', e.target.value));
  if (messageInput) messageInput.addEventListener('input', (e) => handleInputChange('message', e.target.value));

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || formData.fullName.length < 2) {
      showToast('Please enter your full name.', 'warning');
      nameInput?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address.', 'warning');
      emailInput?.focus();
      return;
    }

    if (!formData.message || formData.message.length < 10) {
      showToast('Please provide a message with at least 10 characters.', 'warning');
      messageInput?.focus();
      return;
    }

    // Persist to LocalStorage
    saveFeedback(formData);

    // Provide user feedback
    showToast('Your inquiry has been submitted to Barangay Tablon!', 'success');

    // Reset state & form
    formData = {
      fullName: '',
      email: '',
      contactNumber: '',
      category: 'general',
      message: '',
    };
    form.reset();
  });
};
