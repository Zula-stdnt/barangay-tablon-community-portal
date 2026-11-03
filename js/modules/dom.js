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

  // 1. Punong Barangay (Captain) Card
  const pbCard = create(
    'div',
    { className: 'featured-card', style: { marginBottom: '2rem' } },
    create('h3', { style: { fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' } }, `${OFFICIALS_DATA.punongBarangay.title}:`),
    create('p', { style: { fontSize: '1.3rem', fontWeight: '600', margin: '0' } }, OFFICIALS_DATA.punongBarangay.name)
  );
  container.appendChild(pbCard);

  // Divider
  const createDivider = () =>
    create(
      'div',
      { style: { textAlign: 'center', margin: '2rem 0' } },
      create('hr', { style: { border: 'none', borderTop: '2px solid var(--primary)', width: '50px', margin: '0 auto' } })
    );

  container.appendChild(createDivider());

  // 2. Sangguniang Barangay Members (Kagawads) Card
  const kagawadList = create('ul', { style: { listStyle: 'none', padding: '0', margin: '0', fontSize: '1.3rem' } });
  OFFICIALS_DATA.kagawads.forEach((kagawadName) => {
    const item = create('p', { style: { margin: '0.5rem 0' } }, kagawadName);
    kagawadList.appendChild(item);
  });

  const kagawadsCard = create(
    'div',
    { className: 'featured-card', style: { marginBottom: '2rem' } },
    create('h3', { style: { fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' } }, 'Barangay Kagawads:'),
    kagawadList
  );
  container.appendChild(kagawadsCard);

  container.appendChild(createDivider());

  // 3. Administrative Officers
  OFFICIALS_DATA.administrativeStaff.forEach((official) => {
    const adminCard = create(
      'div',
      { className: 'featured-card', style: { marginBottom: '2rem' } },
      create('h3', { style: { fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' } }, `${official.role}:`),
      create('p', { style: { fontSize: '1.3rem', fontWeight: '600', margin: '0' } }, official.name)
    );
    container.appendChild(adminCard);
  });
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
