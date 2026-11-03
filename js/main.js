/**
 * ============================================================================
 * [ITE 387: Advanced Programming - Main Application Orchestrator]
 * File: js/main.js
 * Description: Self-contained, dual-compatible (HTTP + file://) orchestrator.
 * Implements ITE 387 competencies:
 * - Single Source of Truth data modeling
 * - 4-Step Dynamic Element Creation Lifecycle (Create -> Configure -> Listen -> Append)
 * - Consolidated object state and LocalStorage persistence
 * - Reusable modal shell pattern
 * - Progressive enhancement (supports both file:// and http:// execution)
 *
 * Individual modular source files are preserved under js/modules/ for academic review.
 * ============================================================================
 */

(function () {
  'use strict';

  // Mark document as JS-active for progressive enhancement transitions
  document.documentElement.classList.add('js-active');

  // ==========================================================================
  // 1. Core Utilities & DOM 4-Step Lifecycle Helper [ITE 387: Lab 01 & Lab 02]
  // ==========================================================================

  /**
   * Programmatically creates, configures, and appends a DOM element.
   * Steps: 1. Create -> 2. Configure (attrs, classes, data) -> 3. Listen (events) -> 4. Append children.
   */
  const create = (tag, attributes = {}, ...children) => {
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
   * Safe document ready wrapper [ITE 387: Lab 01]
   */
  const safeInit = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  // ==========================================================================
  // 2. Single Source of Truth Datasets [ITE 387: Lab 01]
  // ==========================================================================

  const OFFICIALS_DATA = Object.freeze({
    punongBarangay: {
      title: 'Punong Barangay',
      name: 'ROMEO R. BACARRO',
    },
    kagawads: [
      'ALLAN C. MAGSAYO',
      'ROLLIN C. JACUTIN',
      'GILES S. DINGAL',
      'NORA S. AUZA',
      'VIRGILIO P. AGUS',
      'JENNIFER D. LEONARDO',
      'EDEN FE HUNG',
    ],
    administrativeStaff: [
      { role: 'SK. Chairman', name: 'Wyn Edward Sinomio' },
      { role: 'Brgy. Secretary', name: 'Mirasol Ravidas' },
      { role: 'Brgy. Treasurer', name: 'Jessie Ann Dadap' },
      { role: 'Brgy. Administrator', name: 'Roel Tan' },
    ],
  });

  const ATTRACTIONS_DATA = Object.freeze([
    {
      id: 'attraction-1',
      category: 'landmark',
      badge: 'Landmark',
      title: 'Nestlé Philippines Factory',
      image: 'images/nestle industrial hub.jfif',
      description:
        "A major industrial landmark in Tablon, this 25.6-hectare facility has been operating since 1984, serving as Nestlé's only factory outside Luzon and producing primarily Nescafé.",
    },
    {
      id: 'attraction-2',
      category: 'landmark',
      badge: 'Landmark',
      title: 'Sto. Niño Chapel',
      image: 'images/sto.nino chapel.jfif',
      description:
        'A local Roman Catholic chapel under the Archdiocese of Cagayan de Oro. It serves as the spiritual center for many residents in the barangay.',
    },
    {
      id: 'attraction-3',
      category: 'landmark',
      badge: 'Landmark',
      title: 'Our Lady of Guadalupe Pilgrimage Site',
      image: 'images/Our Lady of Guadalupe Pilgrimage Site (1).jfif',
      description:
        'A sacred pilgrimage destination in Barangay Tablon, this site draws devotees seeking spiritual solace and blessings from Our Lady of Guadalupe, offering a peaceful sanctuary for prayer and reflection.',
    },
  ]);

  const EVENTS_DATA = Object.freeze([
    {
      id: 'event-1',
      month: 'JAN',
      icon: '🎊',
      title: 'Feast of Sr. Sto. Niño',
      tag: 'Religious Festival',
      description:
        'A major religious celebration featuring street dancing, float competitions, and colorful parades in honor of the Holy Child, heavily inspired by Sinulog traditions.',
    },
    {
      id: 'event-2',
      month: 'AUG',
      icon: '🌟',
      title: 'Higalaay Festival',
      tag: 'City-wide Festival',
      description:
        'While a city-wide celebration honoring St. Augustine, Barangay Tablon actively participates in core events, pageants, and trade fairs as part of the "City of Golden Friendship."',
    },
    {
      id: 'event-3',
      month: 'DEC',
      icon: '🎄',
      title: 'Christmas Village Competition',
      tag: 'Community Event',
      description:
        'Tablon actively joins this annual city-wide competition, where community members collaborate to build and display extravagant, themed Christmas villages and lights.',
    },
    {
      id: 'event-4',
      month: 'VAR',
      icon: '🎉',
      title: 'Barangay Fiesta',
      tag: 'Local Celebration',
      description:
        'The annual barangay fiesta is a time of thanksgiving, community feasts, local sports tournaments (liga), and cultural presentations organized by the local government.',
    },
  ]);

  // ==========================================================================
  // 3. Dynamic UI Notifications (Toast System) [ITE 387: Lab 02]
  // ==========================================================================

  let toastContainer = null;
  const ensureToastContainer = () => {
    if (!toastContainer || !document.body.contains(toastContainer)) {
      toastContainer = document.getElementById('toastContainer');
      if (!toastContainer) {
        toastContainer = create('div', { id: 'toastContainer', className: 'toast-container' });
        document.body.appendChild(toastContainer);
      }
    }
    return toastContainer;
  };

  const showToast = (message, type = 'success', duration = 3500) => {
    const container = ensureToastContainer();
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

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      });
    }, duration);
  };

  // ==========================================================================
  // 4. Resident Feedback Form & Local Persistence [ITE 387: Lab 01 & Lab 03]
  // ==========================================================================

  const STORAGE_KEY = 'tablon_resident_feedback';

  const initFeedbackForm = (formId = 'residentFeedbackForm') => {
    const form = document.getElementById(formId);
    if (!form) return;

    let formData = {
      fullName: '',
      email: '',
      contactNumber: '',
      category: 'general',
      message: '',
    };

    const nameInput = form.querySelector('[name="fullName"]');
    const emailInput = form.querySelector('[name="email"]');
    const phoneInput = form.querySelector('[name="contactNumber"]');
    const categoryInput = form.querySelector('[name="category"]');
    const messageInput = form.querySelector('[name="message"]');

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

    form.addEventListener('submit', (e) => {
      e.preventDefault();

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

      // Save to localStorage
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const existing = raw ? JSON.parse(raw) : [];
        const updated = [
          {
            id: `FB-${Date.now()}`,
            timestamp: new Date().toISOString(),
            ...formData,
          },
          ...existing,
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }

      showToast('Your inquiry has been submitted to Barangay Tablon!', 'success');

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

  // ==========================================================================
  // 5. Dynamic DOM Renderers [ITE 387: Lab 02]
  // ==========================================================================

  const renderOfficials = (containerId = 'officialsContainer') => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // Punong Barangay
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

    // Kagawads
    const kagawadList = create('ul', { style: { listStyle: 'none', padding: '0', margin: '0', fontSize: '1.3rem' } });
    OFFICIALS_DATA.kagawads.forEach((name) => {
      kagawadList.appendChild(create('p', { style: { margin: '0.5rem 0' } }, name));
    });

    const kagawadsCard = create(
      'div',
      { className: 'featured-card', style: { marginBottom: '2rem' } },
      create('h3', { style: { fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' } }, 'Barangay Kagawads:'),
      kagawadList
    );
    container.appendChild(kagawadsCard);

    container.appendChild(createDivider());

    // Administrative staff
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

  const renderAttractions = (containerId = 'attractionsGrid', activeCategory = 'all') => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const filtered = ATTRACTIONS_DATA.filter(
      (item) => activeCategory === 'all' || item.category === activeCategory
    );

    if (filtered.length === 0) {
      container.appendChild(
        create(
          'div',
          { className: 'text-center', style: { gridColumn: '1 / -1', padding: '2rem', color: 'var(--text-light)' } },
          create('p', {}, 'No attractions found in this category.')
        )
      );
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

  const renderEvents = (containerId = 'eventsContainer') => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    EVENTS_DATA.forEach((event) => {
      const card = create(
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
      container.appendChild(card);
    });
  };

  // ==========================================================================
  // 6. Lightbox Modal Shell [ITE 387: Lab 02 & Lab 03]
  // ==========================================================================

  const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery-item[data-img]');

    if (!lightbox || !galleryItems.length) return;

    let currentIndex = 0;

    const showImage = (index) => {
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[currentIndex];
      const imgSrc = item.dataset.img;
      const caption = item.dataset.caption || '';

      if (lightboxImg) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = caption;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = caption;
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const nextImage = () => showImage(currentIndex + 1);
    const prevImage = () => showImage(currentIndex - 1);

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => showImage(idx));
    });

    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });
  };

  // ==========================================================================
  // 7. Lifecycle Initialization
  // ==========================================================================

  safeInit(() => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile Navigation Drawer
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    const toggleNav = () => {
      if (!hamburger || !navLinks) return;
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    if (hamburger) hamburger.addEventListener('click', toggleNav);
    if (navOverlay) navOverlay.addEventListener('click', toggleNav);

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) toggleNav();
      });
    });

    // Active Navigation Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // Scroll Entrance Animations (IntersectionObserver)
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers without IntersectionObserver
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.classList.add('animated');
      });
    }

    // Page-specific modules
    if (document.getElementById('officialsContainer')) {
      renderOfficials('officialsContainer');
    }

    if (document.getElementById('attractionsGrid')) {
      renderAttractions('attractionsGrid', 'all');

      const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          renderAttractions('attractionsGrid', btn.dataset.filter || 'all');
        });
      });
    }

    if (document.getElementById('eventsContainer')) {
      renderEvents('eventsContainer');
    }

    if (document.getElementById('lightbox')) {
      initLightbox();

      const galleryFilterBtns = document.querySelectorAll('.filter-buttons .filter-btn[data-filter]');
      const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

      galleryFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          galleryFilterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.dataset.filter;

          galleryItems.forEach((item) => {
            if (cat === 'all' || item.dataset.category === cat) {
              item.style.display = '';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }

    if (document.getElementById('residentFeedbackForm')) {
      initFeedbackForm('residentFeedbackForm');
    }

    // Broken Image Fallback Handling
    document.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', function () {
        this.style.display = 'none';
        const placeholder = this.parentElement?.querySelector('.img-placeholder');
        if (placeholder) placeholder.style.display = 'flex';
      });
    });
  });
})();
