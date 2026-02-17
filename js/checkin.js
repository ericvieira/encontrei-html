/**
 * Check-in Page JavaScript
 * Handles star rating, file upload, QR scanning, geolocation, and form submission
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
    initStarRating();
    initFileUpload();
    initQrScanner();
    initGeolocation();
    initFormSubmission();
  }

  /**
   * Star Rating System
   */
  function initStarRating() {
    const starsContainer = document.getElementById('starRating');
    const ratingInput = document.getElementById('rating');
    const stars = starsContainer.querySelectorAll('.star-rating__star');

    let currentRating = 0;

    stars.forEach((star, index) => {
      // Click to set rating
      star.addEventListener('click', () => {
        currentRating = index + 1;
        ratingInput.value = currentRating;
        updateStars(currentRating);

        // Animate clicked star
        star.classList.add('star-rating__star--animate');
        setTimeout(() => {
          star.classList.remove('star-rating__star--animate');
        }, 300);
      });

      // Hover effect
      star.addEventListener('mouseenter', () => {
        updateStars(index + 1, true);
      });

      // Reset hover on mouse leave
      starsContainer.addEventListener('mouseleave', () => {
        updateStars(currentRating);
      });
    });

    function updateStars(rating, isHover = false) {
      stars.forEach((star, index) => {
        if (index < rating) {
          star.classList.add(isHover ? 'star-rating__star--hover' : 'star-rating__star--filled');
          if (!isHover) {
            star.classList.remove('star-rating__star--hover');
          }
        } else {
          star.classList.remove('star-rating__star--filled', 'star-rating__star--hover');
        }
      });
    }
  }

  /**
   * File Upload with Drag and Drop
   */
  function initFileUpload() {
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = document.getElementById('photoUpload');
    const uploadContent = document.getElementById('uploadContent');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const browseBtn = document.getElementById('browseFilesBtn');
    const removeBtn = document.getElementById('removePhotoBtn');

    // Click to browse
    browseBtn.addEventListener('click', () => {
      fileInput.click();
    });

    // File selected via input
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFile(file);
      }
    });

    // Drag and drop
    fileUpload.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUpload.classList.add('file-upload--dragover');
    });

    fileUpload.addEventListener('dragleave', () => {
      fileUpload.classList.remove('file-upload--dragover');
    });

    fileUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUpload.classList.remove('file-upload--dragover');

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFile(file);
      }
    });

    // Remove photo
    removeBtn.addEventListener('click', () => {
      fileInput.value = '';
      uploadContent.style.display = 'flex';
      uploadPreview.style.display = 'none';
      previewImage.src = '';
    });

    function handleFile(file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        uploadContent.style.display = 'none';
        uploadPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * QR Code Scanner (Simulated)
   */
  function initQrScanner() {
    const scanBtn = document.getElementById('scanQrBtn');
    const bookIdInput = document.getElementById('bookId');

    scanBtn.addEventListener('click', () => {
      // In a real app, this would open camera and scan QR code
      // For now, we'll simulate it
      showMessage('Funcionalidade de escaneamento QR em desenvolvimento', 'info');

      // Simulate QR scan result
      setTimeout(() => {
        const simulatedBookId = 'WBS-' + Math.floor(1000 + Math.random() * 9000);
        bookIdInput.value = simulatedBookId;
        bookIdInput.focus();
      }, 1500);
    });
  }

  /**
   * Geolocation
   */
  function initGeolocation() {
    const locationBtn = document.getElementById('getLocationBtn');
    const locationInput = document.getElementById('location');

    locationBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        showMessage('Geolocalização não é suportada pelo seu navegador', 'error');
        return;
      }

      // Show loading state
      locationBtn.disabled = true;
      locationBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      `;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // In a real app, reverse geocode to get address
          // For now, use placeholder
          const address = await reverseGeocode(latitude, longitude);
          locationInput.value = address;

          // Reset button
          resetLocationButton();
          showMessage('Localização detectada com sucesso!', 'success');
        },
        (error) => {
          resetLocationButton();

          let errorMessage = 'Erro ao obter localização';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permissão de localização negada';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Localização indisponível';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tempo esgotado ao obter localização';
              break;
          }

          showMessage(errorMessage, 'error');
        }
      );
    });

    function resetLocationButton() {
      locationBtn.disabled = false;
      locationBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      `;
    }

    async function reverseGeocode(lat, lng) {
      // Placeholder - in production, use a geocoding service
      // For demo purposes, return a simulated address
      return `Café do Centro, Rua Principal, ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  }

  /**
   * Form Submission
   */
  function initFormSubmission() {
    const form = document.getElementById('checkinForm');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const bookId = formData.get('bookId');
      const location = formData.get('location');
      const observations = formData.get('observations');
      const rating = formData.get('rating');
      const photo = formData.get('photo');

      // Validate
      if (!bookId || !location) {
        showMessage('Por favor, preencha os campos obrigatórios.', 'error');
        return;
      }

      if (rating === '0') {
        showMessage('Por favor, avalie o livro antes de fazer check-in.', 'error');
        return;
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processando...';

      // Simulate API call
      setTimeout(() => {
        // Success
        showMessage('Check-in realizado com sucesso!', 'success');

        // Show success modal
        showSuccessModal({
          bookId,
          location,
          rating,
          hasPhoto: photo && photo.name
        });

        // Reset form after delay
        setTimeout(() => {
          form.reset();
          document.getElementById('rating').value = '0';
          document.querySelectorAll('.star-rating__star').forEach(star => {
            star.classList.remove('star-rating__star--filled');
          });

          // Reset file upload
          document.getElementById('uploadContent').style.display = 'flex';
          document.getElementById('uploadPreview').style.display = 'none';

          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 3000);
      }, 1500);
    });
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
        ">Check-in Realizado!</h2>
        <p style="
          font-size: 16px;
          color: #6d6d6d;
          margin-bottom: 24px;
        ">Seu livro foi registrado com sucesso.</p>
        <div style="
          background: #f9f1db;
          border-radius: 12px;
          padding: 20px;
          text-align: left;
          margin-bottom: 24px;
        ">
          <p style="margin-bottom: 8px;"><strong>ID do Livro:</strong> ${data.bookId}</p>
          <p style="margin-bottom: 8px;"><strong>Localização:</strong> ${data.location}</p>
          <p style="margin-bottom: 8px;"><strong>Avaliação:</strong> ${'★'.repeat(parseInt(data.rating))}${'☆'.repeat(5 - parseInt(data.rating))}</p>
          ${data.hasPhoto ? '<p><strong>Foto:</strong> Anexada ✓</p>' : ''}
        </div>
        <button onclick="this.closest('.modal-overlay').remove()" style="
          background: #2b619e;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        ">Fechar</button>
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

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

})();
