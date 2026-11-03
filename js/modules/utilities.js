/**
 * ============================================================================
 * [ITE 387: Lab 01 & Lab 02 - ECMAScript Modules (ESM) & Abstracted Helpers]
 * File: js/modules/utilities.js
 * Description: Abstracted helper utilities for DOM creation, formatting, and
 * safe document lifecycle initialization.
 * ============================================================================
 */

/**
 * [ITE 387: Lab 02 - DOM 4-Step Lifecycle Helper]
 * Programmatically creates, configures, and returns a DOM element.
 * Steps executed: Create -> Configure properties/attributes -> Listen -> Append children.
 *
 * @param {string} tag - HTML tag name (e.g. 'div', 'button', 'span')
 * @param {Object} attributes - Element attributes, event handlers, and data properties
 * @param {...(Node|string|number)} children - Child elements or text nodes
 * @returns {HTMLElement} The configured DOM element
 */
export const create = (tag, attributes = {}, ...children) => {
  const el = document.createElement(tag);

  if (attributes && typeof attributes === 'object') {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === 'className' || key === 'class') {
        el.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(el.style, value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key.substring(2).toLowerCase();
        el.addEventListener(eventName, value);
      } else if (key === 'dataset' && typeof value === 'object') {
        Object.entries(value).forEach(([dataKey, dataVal]) => {
          el.dataset[dataKey] = dataVal;
        });
      } else {
        el.setAttribute(key, value);
      }
    });
  }

  children.flat().forEach((child) => {
    if (child === undefined || child === null) return;
    if (child instanceof Node) {
      el.appendChild(child);
    } else {
      el.appendChild(document.createTextNode(String(child)));
    }
  });

  return el;
};

/**
 * [ITE 387: Lab 01 - Safe DOM Initialization]
 * Wraps callback execution to guarantee DOM is ready before manipulating nodes.
 *
 * @param {Function} callback - Function to run once the DOM is ready
 */
export const safeInit = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

/**
 * Formats an ISO or standard date string into a user-friendly format.
 *
 * @param {string|Date} dateInput
 * @returns {string} Formatted date string (e.g., "Nov 3, 2026, 10:30 AM")
 */
export const formatDateTime = (dateInput) => {
  const date = new Date(dateInput);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
