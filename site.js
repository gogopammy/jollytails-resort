const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navGroups = document.querySelectorAll('.nav-group');
const siteHeader = document.querySelector('[data-site-header]');
const desktopNavigation = window.matchMedia('(min-width: 46.01rem)');

const closeNavigation = ({ returnFocus = false } = {}) => {
  if (!navToggle || !primaryNav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.querySelector('.nav-toggle-label').textContent = 'Menu';
  primaryNav.classList.remove('is-open');
  navGroups.forEach((group) => group.removeAttribute('open'));
  if (returnFocus) navToggle.focus();
};

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.querySelector('.nav-toggle-label').textContent = isOpen ? 'Menu' : 'Close menu';
    primaryNav.classList.toggle('is-open', !isOpen);
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target.closest('a') && !desktopNavigation.matches) closeNavigation();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') closeNavigation({ returnFocus: true });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) {
      if (!desktopNavigation.matches) closeNavigation();
      navGroups.forEach((group) => group.removeAttribute('open'));
    }
  });

  desktopNavigation.addEventListener('change', () => closeNavigation());
}

navGroups.forEach((group) => {
  group.addEventListener('toggle', () => {
    if (!group.open) return;
    navGroups.forEach((otherGroup) => {
      if (otherGroup !== group) otherGroup.removeAttribute('open');
    });
  });
});

if (siteHeader) {
  const updateHeaderState = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const newsletterForm = document.querySelector('[data-newsletter-form]');
const newsletterStatus = document.querySelector('[data-newsletter-status]');

if (newsletterForm && newsletterStatus) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newsletterStatus.textContent = 'This form is ready for Mailchimp, but it is not connected yet. Your information has not been submitted.';
  });
}

const galleryItems = [...document.querySelectorAll('[data-gallery-item]')];

if (galleryItems.length) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('aria-label', 'Full-size photo viewer');
  lightbox.innerHTML = `<div class="gallery-lightbox-shell"><button class="gallery-lightbox-close" type="button" aria-label="Close full-size photo">×</button><button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Previous photo">‹</button><img class="gallery-lightbox-image" alt=""><button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Next photo">›</button><p class="gallery-lightbox-count" aria-live="polite"></p></div>`;
  document.body.append(lightbox);

  if (typeof lightbox.showModal === 'function') {
    const lightboxImage = lightbox.querySelector('.gallery-lightbox-image');
    const lightboxCount = lightbox.querySelector('.gallery-lightbox-count');
    const closeButton = lightbox.querySelector('.gallery-lightbox-close');
    let activeIndex = 0;
    let lastTrigger = null;

    const showPhoto = (index) => {
      activeIndex = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[activeIndex];
      const image = item.querySelector('img');
      lightboxImage.src = item.href;
      lightboxImage.alt = image.alt;
      lightboxCount.textContent = `${activeIndex + 1} of ${galleryItems.length}`;
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        lastTrigger = item;
        showPhoto(index);
        document.body.classList.add('has-open-lightbox');
        lightbox.showModal();
      });
    });

    closeButton.addEventListener('click', () => lightbox.close());
    lightbox.querySelector('.gallery-lightbox-prev').addEventListener('click', () => showPhoto(activeIndex - 1));
    lightbox.querySelector('.gallery-lightbox-next').addEventListener('click', () => showPhoto(activeIndex + 1));

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') showPhoto(activeIndex - 1);
      if (event.key === 'ArrowRight') showPhoto(activeIndex + 1);
    });

    lightbox.addEventListener('close', () => {
      document.body.classList.remove('has-open-lightbox');
      lastTrigger?.focus();
    });
  }
}
