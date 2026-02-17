/**
 * Partner Detail Page JavaScript
 * Handles photo gallery carousel and interactions
 */

(function() {
  'use strict';

  // Photo Gallery Carousel
  function initPhotoGallery() {
    const gallery = document.getElementById('photo-gallery');
    if (!gallery) return;

    const track = gallery.querySelector('.photo-gallery__track');
    const slides = gallery.querySelectorAll('.photo-gallery__slide');
    const prevBtn = gallery.querySelector('.photo-gallery__nav--prev');
    const nextBtn = gallery.querySelector('.photo-gallery__nav--next');
    const indicators = gallery.querySelectorAll('.photo-gallery__indicator');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateGallery(slideIndex) {
      // Update track position
      const offset = slideIndex * -100;
      track.style.transform = `translateX(${offset}%)`;

      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
          indicator.classList.add('photo-gallery__indicator--active');
        } else {
          indicator.classList.remove('photo-gallery__indicator--active');
        }
      });

      currentSlide = slideIndex;
    }

    // Previous button
    prevBtn.addEventListener('click', () => {
      const newIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
      updateGallery(newIndex);
    });

    // Next button
    nextBtn.addEventListener('click', () => {
      const newIndex = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
      updateGallery(newIndex);
    });

    // Indicator buttons
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        updateGallery(index);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        nextBtn.click();
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - show next
          nextBtn.click();
        } else {
          // Swiped right - show previous
          prevBtn.click();
        }
      }
    }

    // Auto-advance (optional)
    // Uncomment to enable auto-play
    // setInterval(() => {
    //   nextBtn.click();
    // }, 5000);
  }

  // Check-in button
  function initCheckIn() {
    const checkinBtn = document.querySelector('.checkin-widget__cta');
    if (!checkinBtn) return;

    checkinBtn.addEventListener('click', () => {
      const originalText = checkinBtn.textContent;
      checkinBtn.textContent = 'Processando...';
      checkinBtn.disabled = true;

      setTimeout(() => {
        checkinBtn.textContent = '✓ Check-in realizado!';
        setTimeout(() => {
          checkinBtn.textContent = originalText;
          checkinBtn.disabled = false;
        }, 2000);
      }, 1000);
    });
  }

  // Event reservation
  function initEventReservation() {
    const reserveButtons = document.querySelectorAll('.event-card__cta');

    reserveButtons.forEach(button => {
      button.addEventListener('click', () => {
        const eventCard = button.closest('.event-card');
        const eventTitle = eventCard.querySelector('.event-card__title').textContent;
        const originalText = button.textContent;

        button.textContent = 'Reservando...';
        button.disabled = true;

        setTimeout(() => {
          button.textContent = '✓ Reservado!';
          console.log(`Reserva para: ${eventTitle}`);

          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
          }, 2000);
        }, 800);
      });
    });
  }

  // Share functionality
  function initShare() {
    const shareBtn = document.querySelector('[aria-label="Compartilhar"], .button:has(svg)');
    if (!shareBtn) return;

    const shareButtons = document.querySelectorAll('button');
    shareButtons.forEach(btn => {
      if (btn.textContent.trim() === 'Compartilhar') {
        btn.addEventListener('click', async () => {
          const shareData = {
            title: 'Café Cultura',
            text: 'Confira este espaço parceiro no Encontrei!',
            url: window.location.href
          };

          if (navigator.share) {
            try {
              await navigator.share(shareData);
              console.log('Compartilhado com sucesso');
            } catch (err) {
              if (err.name !== 'AbortError') {
                fallbackShare();
              }
            }
          } else {
            fallbackShare();
          }
        });
      }
    });

    function fallbackShare() {
      // Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copiado para a área de transferência!');
      });
    }
  }

  // Responsive layout adjustments
  function initResponsiveLayout() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleResponsive(e) {
      const mainContent = document.querySelector('main .container > div');
      if (!mainContent) return;

      if (e.matches) {
        // Mobile: stack sidebar below main content
        mainContent.style.gridTemplateColumns = '1fr';
      } else {
        // Desktop: side-by-side layout
        mainContent.style.gridTemplateColumns = '1fr 400px';
      }
    }

    mediaQuery.addListener(handleResponsive);
    handleResponsive(mediaQuery);
  }

  // Initialize all features
  function init() {
    initPhotoGallery();
    initCheckIn();
    initEventReservation();
    initShare();
    initResponsiveLayout();

    console.log('Partner detail page initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
