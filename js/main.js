/**
 * Main JavaScript
 * Handles interactive functionality
 */

(function() {
  'use strict';

  // Smooth scrolling for navigation links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Update active navigation item on scroll
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__menu-item');

    function updateActiveLink() {
      let current = '';
      const scrollPosition = window.pageYOffset + 150;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('header__menu-item--active');
        const href = link.getAttribute('href');

        if (href === `#${current}`) {
          link.classList.add('header__menu-item--active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial check
  }

  // Lazy load images
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });

      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => imageObserver.observe(img));
    }
  }

  // Add animation on scroll
  function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      // Animate cards
      const cards = document.querySelectorAll('.book-card, .partner-card, .feature-card');
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
      });
    }
  }

  // Initialize all features
  function init() {
    initSmoothScroll();
    initScrollSpy();
    initLazyLoading();
    initScrollAnimations();

    console.log('Encontrei - Site initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
