/* ========================================
   CONTACT FORM MODULE
   Validation and submission
   ======================================== */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { element: form.querySelector('#name'), rules: { required: true, minLength: 2 } },
    phone: { element: form.querySelector('#phone'), rules: { required: true, pattern: /^[\+]?[\d\s\-]{8,15}$/ } },
    email: { element: form.querySelector('#email'), rules: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } },
    message: { element: form.querySelector('#message'), rules: { required: true, minLength: 10 } }
  };

  // Real-time validation on blur
  Object.values(fields).forEach(field => {
    field.element.addEventListener('blur', () => {
      validateField(field);
    });

    field.element.addEventListener('input', () => {
      const group = field.element.closest('.form-group');
      if (group.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    Object.values(fields).forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) return;

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (response.ok) {
        showStatus('success', 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        showStatus('error', 'El servidor no responde. Por favor contáctenos por WhatsApp.');
      } else {
        showStatus('error', 'Error al enviar. Intente nuevamente o contáctenos por WhatsApp.');
      }
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

function validateField(field) {
  const { element, rules } = field;
  const value = element.value.trim();
  const group = element.closest('.form-group');
  const errorEl = group.querySelector('.form-error');

  // Clear previous error
  group.classList.remove('error');
  errorEl.textContent = '';

  // Required check
  if (rules.required && !value) {
    group.classList.add('error');
    errorEl.textContent = 'Este campo es obligatorio';
    return false;
  }

  // Min length check
  if (rules.minLength && value.length < rules.minLength) {
    group.classList.add('error');
    errorEl.textContent = `Mínimo ${rules.minLength} caracteres`;
    return false;
  }

  // Pattern check
  if (rules.pattern && value && !rules.pattern.test(value)) {
    group.classList.add('error');
    if (element.type === 'email') {
      errorEl.textContent = 'Formato de email inválido';
    } else if (element.type === 'tel') {
      errorEl.textContent = 'Formato de teléfono inválido';
    } else {
      errorEl.textContent = 'Formato inválido';
    }
    return false;
  }

  return true;
}

function showStatus(type, message) {
  const statusEl = document.getElementById('form-status');
  statusEl.className = 'form-status ' + type;
  statusEl.textContent = message;
  statusEl.style.display = 'block';

  // Auto-hide after 6 seconds
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 6000);
}
