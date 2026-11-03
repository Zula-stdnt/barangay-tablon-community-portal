/**
 * ============================================================================
 * [ITE 387: Lab 02 - UI Notifications & Dynamic Alerts]
 * File: js/modules/toast.js
 * Description: Accessible dynamic toast notification system.
 * ============================================================================
 */

import { create } from './utilities.js';

let toastContainer = null;

const ensureContainer = () => {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = create('div', { id: 'toastContainer', className: 'toast-container' });
      document.body.appendChild(toastContainer);
    }
  }
  return toastContainer;
};

/**
 * Displays a dynamic toast notification message.
 *
 * @param {string} message - Text content to display
 * @param {'success'|'info'|'warning'|'error'} type - Alert severity type
 * @param {number} duration - Auto-dismiss timeout in milliseconds (default 3500ms)
 */
export const showToast = (message, type = 'success', duration = 3500) => {
  const container = ensureContainer();

  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
  };

  const toast = create(
    'div',
    { className: `toast-message toast-${type}` },
    create('span', { className: 'toast-icon' }, icons[type] || 'ℹ️'),
    create('span', { className: 'toast-text' }, message)
  );

  container.appendChild(toast);

  // Trigger entrance transition
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto dismiss
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    });
  }, duration);
};
