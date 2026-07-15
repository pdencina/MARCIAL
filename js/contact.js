/* ========================================
   CONTACT FORM MODULE
   Validation, formatting and submission
   ======================================== */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = form.querySelector('#name');
  const phoneInput = form.querySelector('#phone');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');

  const fields = {
    name: { element: nameInput, rules: { required: true, minLength: 2, maxLength: 60 } },
    phone: { element: phoneInput, rules: { required: true, pattern: /^\+56\s9\s\d{4}\s\d{4}$/ } },
    email: { element: emailInput, rules: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } },
    message: { element: messageInput, rules: { required: true, minLength: 10, maxLength: 500 } }
  };

  // --- INPUT FORMATTING ---

  // Name: only letters and spaces, capitalize first letter of each word
  nameInput.addEventListener('input', () => {
    let val = nameInput.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    // Capitalize each word
    val = val.replace(/\b\w/g, c => c.toUpperCase());
    if (val.length > 60) val = val.slice(0, 60);
    nameInput.value = val;
  });

  // Phone: auto-format to +56 9 XXXX XXXX
  phoneInput.addEventListener('input', () => {
    // Strip everything except digits
    let digits = phoneInput.value.replace(/\D/g, '');

    // If starts with 56, keep it; otherwise prepend 56
    if (digits.startsWith('56')) {
      digits = digits.slice(2);
    }

    // Limit to 9 digits (9 XXXX XXXX)
    if (digits.length > 9) digits = digits.slice(0, 9);

    // Format: +56 9 XXXX XXXX
    let formatted = '+56';
    if (digits.length > 0) formatted += ' ' + digits.slice(0, 1);
    if (digits.length > 1) formatted += ' ' + digits.slice(1, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 9);

    phoneInput.value = formatted;
  });

  // Phone: handle paste - clean and format
  phoneInput.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    let digits = pasted.replace(/\D/g, '');
    if (digits.startsWith('56')) digits = digits.slice(2);
    if (digits.length > 9) digits = digits.slice(0, 9);

    let formatted = '+56';
    if (digits.length > 0) formatted += ' ' + digits.slice(0, 1);
    if (digits.length > 1) formatted += ' ' + digits.slice(1, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 9);

    phoneInput.value = formatted;
  });

  // Phone: start with +56 on focus if empty
  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value) {
      phoneInput.value = '+56 ';
    }
  });

  // Email: lowercase, no spaces
  emailInput.addEventListener('input', () => {
    emailInput.value = emailInput.value.toLowerCase().replace(/\s/g, '');
  });

  // Message: limit characters and show counter
  messageInput.addEventListener('input', () => {
    if (messageInput.value.length > 500) {
      messageInput.value = messageInput.value.slice(0, 500);
    }
    updateCharCounter(messageInput);
  });

  // Initialize character counter for message
  createCharCounter(messageInput, 500);

  // --- VALIDATION ---

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

  // --- FORM SUBMISSION ---
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
      const payload = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        message: messageInput.value.trim()
      };

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (response.ok) {
        showStatus('success', 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
        form.reset();
        phoneInput.value = '';
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

  // Max length check
  if (rules.maxLength && value.length > rules.maxLength) {
    group.classList.add('error');
    errorEl.textContent = `Máximo ${rules.maxLength} caracteres`;
    return false;
  }

  // Pattern check
  if (rules.pattern && value && !rules.pattern.test(value)) {
    group.classList.add('error');
    if (element.type === 'email') {
      errorEl.textContent = 'Formato de email inválido (ej: tu@correo.com)';
    } else if (element.type === 'tel') {
      errorEl.textContent = 'Completa el número: +56 9 XXXX XXXX';
    } else {
      errorEl.textContent = 'Formato inválido';
    }
    return false;
  }

  return true;
}

function createCharCounter(textarea, max) {
  const counter = document.createElement('span');
  counter.className = 'form-counter';
  counter.textContent = `0/${max}`;
  textarea.closest('.form-group').appendChild(counter);
}

function updateCharCounter(textarea) {
  const counter = textarea.closest('.form-group').querySelector('.form-counter');
  if (counter) {
    const len = textarea.value.length;
    counter.textContent = `${len}/500`;
    counter.classList.toggle('near-limit', len > 450);
  }
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
