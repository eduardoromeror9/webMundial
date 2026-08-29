/**
 * MLB Picks — Módulo UI y Componentes Visuales
 */

// Contenedor único para toasts de notificación
let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Muestra una notificación tipo Toast en pantalla
 * @param {string} message - Texto de la notificación
 * @param {'success'|'error'|'info'|'warning'} [type='info'] - Tipo de notificación
 * @param {number} [duration=4000] - Tiempo en milisegundos
 */
export function showToast(message, type = 'info', duration = 4000) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  };

  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icons[type] || 'ℹ️'}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Animación de entrada
  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });

  // Auto-cierre
  setTimeout(() => {
    toast.classList.remove('toast-show');
    toast.classList.add('toast-hide');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, duration);
}

/**
 * Muestra un mensaje de alerta dentro de un contenedor de formulario
 * @param {HTMLElement|string} container - Elemento o selector donde mostrar la alerta
 * @param {string} message - Contenido del mensaje
 * @param {'error'|'success'|'warning'|'info'} [type='error']
 */
export function showFormAlert(container, message, type = 'error') {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;

  el.className = `form-alert form-alert-${type}`;
  el.textContent = message;
  el.style.display = 'block';
  el.setAttribute('role', 'alert');
}

/**
 * Limpia la alerta de formulario
 * @param {HTMLElement|string} container
 */
export function clearFormAlert(container) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;

  el.style.display = 'none';
  el.textContent = '';
}

/**
 * Cambia el estado de un botón o elemento a "Cargando..."
 * @param {HTMLButtonElement} button
 * @param {boolean} isLoading
 * @param {string} [loadingText='Cargando...']
 */
export function setButtonLoading(button, isLoading, loadingText = 'Cargando...') {
  if (!button) return;

  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `<span class="spinner" aria-hidden="true"></span> ${loadingText}`;
    button.classList.add('btn-loading');
  } else {
    button.disabled = false;
    if (button.dataset.originalText) {
      button.innerHTML = button.dataset.originalText;
    }
    button.classList.remove('btn-loading');
  }
}

/**
 * Muestra un diálogo modal de confirmación
 * @param {Object} options
 * @param {string} options.title - Título del diálogo
 * @param {string} options.message - Texto explicativo
 * @param {string} [options.confirmText='Confirmar'] - Texto botón confirmar
 * @param {string} [options.cancelText='Cancelar'] - Texto botón cancelar
 * @param {'danger'|'primary'} [options.type='primary'] - Tipo visual
 * @param {Function} options.onConfirm - Callback al confirmar
 */
export function showModal({
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'primary',
  onConfirm
}) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');

  backdrop.innerHTML = `
    <div class="modal-card">
      <h3 class="modal-title">${title}</h3>
      <p class="modal-message">${message}</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary modal-cancel-btn">${cancelText}</button>
        <button type="button" class="btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'} modal-confirm-btn">${confirmText}</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  requestAnimationFrame(() => backdrop.classList.add('modal-show'));

  const closeModal = () => {
    backdrop.classList.remove('modal-show');
    setTimeout(() => {
      if (backdrop.parentNode) {
        backdrop.parentNode.removeChild(backdrop);
      }
    }, 300);
  };

  backdrop.querySelector('.modal-cancel-btn').addEventListener('click', closeModal);
  backdrop.querySelector('.modal-confirm-btn').addEventListener('click', async () => {
    if (typeof onConfirm === 'function') {
      await onConfirm();
    }
    closeModal();
  });
}
