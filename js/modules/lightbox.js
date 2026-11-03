/**
 * ============================================================================
 * [ITE 387: Lab 02 & Lab 03 - Reusable Modal Shell Strategy]
 * File: js/modules/lightbox.js
 * Description: Manages the photo gallery modal viewer using a single shared
 * modal shell with keyboard navigation and focus management.
 * ============================================================================
 */

/**
 * Initializes the Lightbox modal shell for gallery items.
 */
export const initLightbox = () => {
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

  // Attach listeners to gallery items
  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => showImage(idx));
  });

  // Modal controls
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  // Backdrop click to dismiss
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
};
