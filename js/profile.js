/**
 * Profile Page JavaScript
 * Handles tabs, tag management, and form interactions
 */

(function() {
  'use strict';

  // Tab functionality
  function initTabs() {
    const tabs = document.querySelectorAll('.tabs__tab');
    const panels = document.querySelectorAll('.tabs__panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPanel = tab.getAttribute('aria-controls');

        // Update tabs
        tabs.forEach(t => {
          t.classList.remove('tabs__tab--active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('tabs__tab--active');
        tab.setAttribute('aria-selected', 'true');

        // Update panels
        panels.forEach(panel => {
          panel.classList.remove('tabs__panel--active');
        });
        document.getElementById(targetPanel).classList.add('tabs__panel--active');
      });
    });
  }

  // Tag management
  function initTagManagement() {
    const tagsContainer = document.getElementById('tags-container');
    const interestsInput = document.getElementById('interests');

    if (!tagsContainer || !interestsInput) return;

    // Remove tag functionality
    tagsContainer.addEventListener('click', (e) => {
      const removeButton = e.target.closest('.form__tag-remove');
      if (removeButton) {
        const tag = removeButton.closest('.form__tag');
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        setTimeout(() => {
          tag.remove();
        }, 200);
      }
    });

    // Add tag on Enter
    interestsInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = interestsInput.value.trim();

        if (value) {
          addTag(value);
          interestsInput.value = '';
        }
      }
    });

    function addTag(text) {
      const tag = document.createElement('div');
      tag.className = 'form__tag';
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0.8)';

      tag.innerHTML = `
        <span>${text}</span>
        <button type="button" class="form__tag-remove" aria-label="Remover ${text}">
          <img src="https://www.figma.com/api/mcp/asset/7897f82b-ce0f-4add-be33-832ab4b593f4" alt="">
        </button>
      `;

      tagsContainer.appendChild(tag);

      // Animate in
      setTimeout(() => {
        tag.style.transition = 'opacity 0.2s, transform 0.2s';
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
      }, 10);
    }
  }

  // Form submission
  function initFormHandling() {
    const form = document.querySelector('.form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show success message
      const saveButton = form.querySelector('button[type="submit"]');
      const originalText = saveButton.textContent;

      saveButton.textContent = 'Salvando...';
      saveButton.disabled = true;

      setTimeout(() => {
        saveButton.textContent = '✓ Salvo!';
        setTimeout(() => {
          saveButton.textContent = originalText;
          saveButton.disabled = false;
        }, 1500);
      }, 1000);
    });
  }

  // Photo upload preview
  function initPhotoUpload() {
    const uploadButton = document.querySelector('.form__photo-upload .button');

    if (!uploadButton) return;

    uploadButton.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const avatars = document.querySelectorAll('.profile-card__avatar, .form__avatar');
            avatars.forEach(avatar => {
              avatar.src = e.target.result;
            });
          };
          reader.readAsDataURL(file);
        }
      });

      input.click();
    });
  }

  // Responsive sidebar toggle for mobile
  function initResponsiveSidebar() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleResponsive(e) {
      const sidebar = document.querySelector('aside');
      const mainContent = sidebar?.nextElementSibling;

      if (!sidebar || !mainContent) return;

      if (e.matches) {
        // Mobile: hide sidebar by default, show main content
        sidebar.style.display = 'none';
        mainContent.style.width = '100%';
      } else {
        // Desktop: show both
        sidebar.style.display = 'flex';
        mainContent.style.width = '';
      }
    }

    mediaQuery.addListener(handleResponsive);
    handleResponsive(mediaQuery);
  }

  // Initialize all features
  function init() {
    initTabs();
    initTagManagement();
    initFormHandling();
    initPhotoUpload();
    initResponsiveSidebar();

    console.log('Profile page initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
