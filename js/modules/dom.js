/**
 * ============================================================================
 * [ITE 387: Lab 02 - DOM and UI Manipulation]
 * File: js/modules/dom.js
 * Description: Dynamic element generation adhering to the 4-Step Lifecycle:
 * Create -> Configure -> Listen -> Append.
 * ============================================================================
 */

import { create } from './utilities.js';
import { OFFICIALS_DATA, ATTRACTIONS_DATA, EVENTS_DATA } from './data.js';

/**
 * [ITE 387: Lab 02]
 * Dynamically renders the Barangay Officials directory into the target container.
 *
 * @param {string} containerId - Target container ID in officials.html
 */
export const renderOfficials = (containerId = 'officialsContainer') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Wipe clean to prevent duplicate entries
  container.innerHTML = '';

  // 1. Punong Barangay (Executive Leader Card)
  const pbCard = create(
    'div',
    { className: 'official-lead-card' },
    create('div', { className: 'official-badge' }, '🎖️ Punong Barangay / Chief Executive'),
    create('h3', { className: 'official-lead-name' }, OFFICIALS_DATA.punongBarangay.name),
    create('p', { className: 'official-lead-subtitle' }, 'Head of the Barangay Local Government Unit & Sangguniang Barangay')
  );
  container.appendChild(pbCard);

  // 2. Sangguniang Barangay Members (Kagawads Grid)
  const kagawadGrid = create('div', { className: 'kagawads-grid' });
  OFFICIALS_DATA.kagawads.forEach((kagawadName, index) => {
    const tile = create(
      'div',
      { className: 'kagawad-tile' },
      create('div', { className: 'kagawad-num' }, `Council Member ${index + 1}`),
      create('div', { className: 'kagawad-name' }, kagawadName)
    );
    kagawadGrid.appendChild(tile);
  });

  const kagawadsSection = create(
    'div',
    { className: 'officials-group-card' },
    create(
      'div',
      { className: 'officials-group-header' },
      create('span', { className: 'official-badge' }, '🏛️ Legislative Council'),
      create('h3', { className: 'officials-group-title' }, 'Barangay Kagawads')
    ),
    kagawadGrid
  );
  container.appendChild(kagawadsSection);

  // 3. Administrative Officers Grid (SK, Secretary, Treasurer)
  const adminGrid = create('div', { className: 'admin-staff-grid' });
  OFFICIALS_DATA.administrativeStaff.forEach((official) => {
    let icon = '📋';
    if (official.role.includes('SK')) icon = '⚡';
    if (official.role.includes('Treasurer')) icon = '💰';

    const staffCard = create(
      'div',
      { className: 'admin-staff-card' },
      create(
        'div',
        { className: 'staff-icon-role' },
        create('span', { className: 'staff-icon' }, icon),
        create('span', { className: 'staff-role' }, official.role)
      ),
      create('div', { className: 'staff-name' }, official.name)
    );
    adminGrid.appendChild(staffCard);
  });

  const adminSection = create(
    'div',
    { className: 'officials-group-card' },
    create(
      'div',
      { className: 'officials-group-header' },
      create('span', { className: 'official-badge' }, '👥 Administrative Officers'),
      create('h3', { className: 'officials-group-title' }, 'Barangay Administration')
    ),
    adminGrid
  );
  container.appendChild(adminSection);
};

/**
 * [ITE 387: Lab 01 & Lab 02]
 * Renders attractions dynamically with array filtering.
 *
 * @param {string} containerId - Target grid container ID in attractions.html
 * @param {string} activeCategory - Selected category ('all', 'landmark', 'nature', 'recreation')
 */
export const renderAttractions = (containerId = 'attractionsGrid', activeCategory = 'all') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  const filtered = ATTRACTIONS_DATA.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  if (filtered.length === 0) {
    const emptyNotice = create(
      'div',
      { className: 'text-center', style: { gridColumn: '1 / -1', padding: '2rem', color: 'var(--text-light)' } },
      create('p', {}, 'No attractions found in this category.')
    );
    container.appendChild(emptyNotice);
    return;
  }

  filtered.forEach((item) => {
    const imgEl = create('img', {
      src: item.image,
      alt: item.title,
      loading: 'lazy',
      onerror: function () {
        this.style.display = 'none';
        const parent = this.parentElement;
        if (parent) {
          const placeholder = parent.querySelector('.img-placeholder');
          if (placeholder) placeholder.style.display = 'flex';
        }
      },
    });

    const placeholderEl = create(
      'div',
      { className: 'img-placeholder', style: { display: 'none', minHeight: '200px' } },
      create('span', { className: 'placeholder-icon' }, '🏞️'),
      create('span', {}, item.title)
    );

    const card = create(
      'div',
      { className: 'card', dataset: { category: item.category } },
      create('div', { className: 'card-img' }, imgEl, placeholderEl),
      create(
        'div',
        { className: 'card-content' },
        create('span', { className: `card-badge badge-${item.category}` }, item.badge),
        create('h3', {}, item.title),
        create('p', {}, item.description)
      )
    );

    container.appendChild(card);
  });
};

/**
 * [ITE 387: Lab 01 & Lab 02]
 * Renders the annual community festivals and events list.
 *
 * @param {string} containerId - Target container ID in events.html
 */
export const renderEvents = (containerId = 'eventsContainer') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  EVENTS_DATA.forEach((event) => {
    const eventCard = create(
      'div',
      { className: 'event-card' },
      create(
        'div',
        { className: 'event-date' },
        create('span', { className: 'month' }, event.month),
        create('span', { className: 'icon' }, event.icon)
      ),
      create(
        'div',
        { className: 'event-info' },
        create('h3', {}, event.title),
        create('p', {}, event.description),
        create('span', { className: 'event-tag' }, event.tag)
      )
    );

    container.appendChild(eventCard);
  });
};
