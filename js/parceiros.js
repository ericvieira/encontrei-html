/**
 * Partners Page JavaScript
 * Handles filtering, search, and tab navigation
 */

(function() {
  'use strict';

  // Tab filtering
  function initTabFiltering() {
    const tabs = document.querySelectorAll('.tabs__tab[data-filter]');
    const cards = document.querySelectorAll('.partner-card-detailed');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');

        // Update active tab
        tabs.forEach(t => {
          t.classList.remove('tabs__tab--active');
        });
        tab.classList.add('tabs__tab--active');

        // Filter cards
        cards.forEach(card => {
          const cardType = card.getAttribute('data-type');

          if (filter === 'todos' || cardType === filter) {
            card.style.display = 'block';
            // Animate in
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // Search functionality
  function initSearch() {
    const searchInput = document.querySelector('.search-bar__input');
    const cards = document.querySelectorAll('.partner-card-detailed');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();

      cards.forEach(card => {
        const name = card.querySelector('.partner-card-detailed__name').textContent.toLowerCase();
        const location = card.querySelector('.partner-card-detailed__location').textContent.toLowerCase();
        const description = card.querySelector('.partner-card-detailed__description').textContent.toLowerCase();

        const matches = name.includes(searchTerm) ||
                       location.includes(searchTerm) ||
                       description.includes(searchTerm);

        if (matches) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });

      // Show "no results" message if needed
      const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
      updateNoResultsMessage(visibleCards.length === 0);
    });
  }

  // No results message
  function updateNoResultsMessage(show) {
    const grid = document.getElementById('partners-grid');
    let noResults = document.getElementById('no-results');

    if (show && !noResults) {
      noResults = document.createElement('div');
      noResults.id = 'no-results';
      noResults.className = 'text-center';
      noResults.style.gridColumn = '1 / -1';
      noResults.style.padding = 'var(--space-20) 0';
      noResults.innerHTML = `
        <p style="font-size: var(--font-size-xl); color: var(--color-text-secondary); margin-bottom: var(--space-2);">
          Nenhum espaço encontrado
        </p>
        <p style="color: var(--color-text-secondary);">
          Tente ajustar seus filtros ou busca
        </p>
      `;
      grid.appendChild(noResults);
    } else if (!show && noResults) {
      noResults.remove();
    }
  }

  // Filter buttons (location, genre, profile)
  function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.search-bar__filter');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.classList.toggle('search-bar__filter--active');
      });
    });
  }

  // Card hover effects
  function initCardEffects() {
    const cards = document.querySelectorAll('.partner-card-detailed');

    cards.forEach(card => {
      // Add smooth transitions
      card.style.transition = 'opacity 0.2s, transform 0.2s';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }

  // View details button
  function initDetailsButtons() {
    const detailsButtons = document.querySelectorAll('.partner-card-detailed__cta');

    detailsButtons.forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.partner-card-detailed');
        const name = card.querySelector('.partner-card-detailed__name').textContent;

        // In a real app, this would navigate to a detail page
        console.log(`Viewing details for: ${name}`);

        // Show feedback
        const originalText = button.textContent;
        button.textContent = 'Carregando...';
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          // Would navigate here: window.location.href = `/parceiros/${partnerId}`
        }, 500);
      });
    });
  }

  // Initialize all features
  function init() {
    initTabFiltering();
    initSearch();
    initFilterButtons();
    initCardEffects();
    initDetailsButtons();

    console.log('Partners page initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
