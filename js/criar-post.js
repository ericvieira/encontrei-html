/**
 * Criar Post Page JavaScript
 * Handles form submission for creating new forum discussions
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
    initFormSubmission();
    initSearchSync();
  }

  /**
   * Form Submission
   */
  function initFormSubmission() {
    const form = document.getElementById('criarPostForm');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const title = formData.get('title');
      const category = formData.get('category');
      const content = formData.get('content');

      // Validate
      if (!title || !category || !content) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Publicando...';

      // Simulate API call
      setTimeout(() => {
        // Success
        showSuccessModal({
          title,
          category,
          content
        });

        // Reset form
        form.reset();

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  /**
   * Sync search with forum page
   */
  function initSearchSync() {
    const searchInput = document.getElementById('forumSearch');

    if (!searchInput) return;

    // If there's a search query in the URL, populate it
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');

    if (searchQuery) {
      searchInput.value = searchQuery;
    }
  }

  /**
   * Show success modal
   */
  function showSuccessModal(data) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal" style="
        background: white;
        border-radius: 16px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        animation: slideUp 0.3s ease;
      ">
        <div style="
          width: 80px;
          height: 80px;
          background: #10b981;
          border-radius: 50%;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 style="
          font-size: 24px;
          font-weight: 600;
          color: #2b619e;
          margin-bottom: 12px;
        ">Discussão Publicada!</h2>
        <p style="
          font-size: 16px;
          color: #6d6d6d;
          margin-bottom: 24px;
        ">Sua discussão foi criada com sucesso e está visível para a comunidade.</p>
        <div style="
          background: #f9f1db;
          border-radius: 12px;
          padding: 20px;
          text-align: left;
          margin-bottom: 24px;
        ">
          <p style="margin-bottom: 8px;"><strong>Título:</strong> ${escapeHtml(data.title)}</p>
          <p style="margin-bottom: 8px;"><strong>Categoria:</strong> ${getCategoryLabel(data.category)}</p>
          <p><strong>Conteúdo:</strong> ${escapeHtml(data.content.substring(0, 100))}${data.content.length > 100 ? '...' : ''}</p>
        </div>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button onclick="window.location.href='forum.html'" style="
            background: #2b619e;
            color: white;
            border: none;
            padding: 12px 32px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          ">Ver no Fórum</button>
          <button onclick="this.closest('.modal-overlay').remove()" style="
            background: white;
            color: #2b619e;
            border: 1px solid #2b619e;
            padding: 12px 32px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          ">Criar Outra</button>
        </div>
      </div>
    `;

    // Style modal overlay
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(modal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  /**
   * Get category display label
   */
  function getCategoryLabel(category) {
    const labels = {
      'livros': 'Discussões de livros',
      'locais': 'Locais de liberação',
      'eventos': 'Encontros & Eventos',
      'geral': 'Geral'
    };
    return labels[category] || category;
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Show message feedback
   */
  function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      animation: slideInRight 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      ${type === 'success'
        ? 'background: #10b981; color: white;'
        : type === 'error'
        ? 'background: #ef4444; color: white;'
        : 'background: #3b82f6; color: white;'
      }
    `;

    document.body.appendChild(messageEl);

    setTimeout(() => {
      messageEl.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => messageEl.remove(), 300);
    }, 3000);
  }

  /**
   * Add animations
   */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100px);
      }
    }
  `;
  document.head.appendChild(style);

})();
