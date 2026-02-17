/**
 * Forum Page JavaScript
 * Handles category filtering and search
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initCategoryTabs();
    initSearch();
  }

  /**
   * Category Tab Filtering
   */
  function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tabs__tab');
    const discussionCards = document.querySelectorAll('.discussion-card');

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('category-tabs__tab--active'));
        tab.classList.add('category-tabs__tab--active');

        // Filter discussions
        discussionCards.forEach(card => {
          const cardCategory = card.dataset.category;

          if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            // Animate in
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /**
   * Search Functionality
   */
  function initSearch() {
    const searchInput = document.querySelector('.search-bar__input');
    const discussionCards = document.querySelectorAll('.discussion-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      discussionCards.forEach(card => {
        const title = card.querySelector('.discussion-card__title').textContent.toLowerCase();
        const excerpt = card.querySelector('.discussion-card__excerpt').textContent.toLowerCase();
        const author = card.querySelector('.discussion-card__author').textContent.toLowerCase();

        const matches = title.includes(searchTerm) ||
                       excerpt.includes(searchTerm) ||
                       author.includes(searchTerm);

        if (searchTerm === '' || matches) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });

      // Show "no results" message if needed
      const visibleCards = Array.from(discussionCards).filter(
        card => card.style.display !== 'none'
      );

      updateNoResultsMessage(visibleCards.length === 0, searchTerm);
    });
  }

  /**
   * Show/hide "no results" message
   */
  function updateNoResultsMessage(show, searchTerm) {
    let noResultsEl = document.querySelector('.no-results-message');

    if (show) {
      if (!noResultsEl) {
        noResultsEl = document.createElement('div');
        noResultsEl.className = 'no-results-message';
        noResultsEl.style.cssText = `
          padding: var(--space-8);
          text-align: center;
          color: var(--color-text-secondary);
        `;

        const discussionsPanel = document.getElementById('discussions');
        const discussionList = discussionsPanel.querySelector('.discussion-list');
        discussionList.appendChild(noResultsEl);
      }

      noResultsEl.innerHTML = `
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto var(--space-4); opacity: 0.3;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p style="font-size: var(--font-size-lg); margin-bottom: var(--space-2);">
          Nenhuma discussão encontrada
        </p>
        <p style="font-size: var(--font-size-base);">
          Tente ajustar sua busca ou explore outras categorias
        </p>
      `;
    } else if (noResultsEl) {
      noResultsEl.remove();
    }
  }

  /**
   * Add CSS animation keyframes
   */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);

})();
