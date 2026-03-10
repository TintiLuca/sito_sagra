/* ============================================
   CITY FESTIVAL — Contact JS (contact.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  // ── Simple client-side validation ──
  function validateField(input) {
    const value = input.value.trim();
    const isRequired = input.hasAttribute('required');
    const isEmail = input.type === 'email';

    let error = '';

    if (isRequired && !value) {
      error = 'Questo campo è obbligatorio.';
    } else if (isEmail && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Inserisci un indirizzo email valido.';
    }

    setFieldState(input, error);
    return !error;
  }

  function setFieldState(input, errorMsg) {
    const group = input.closest('.form-group');
    if (!group) return;

    let errorEl = group.querySelector('.form-error');

    if (errorMsg) {
      input.style.borderColor = 'var(--coral)';
      input.style.boxShadow   = '0 0 0 3px rgba(255,87,51,0.15)';
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'form-error';
        errorEl.style.cssText = 'color:var(--coral);font-size:0.75rem;margin-top:4px;';
        group.appendChild(errorEl);
      }
      errorEl.textContent = errorMsg;
    } else {
      input.style.borderColor = '#16A34A';
      input.style.boxShadow   = '0 0 0 3px rgba(22,163,74,0.1)';
      if (errorEl) errorEl.remove();
    }
  }

  // Validate on blur
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      // Clear error as user types
      if (field.style.borderColor === 'var(--coral)') validateField(field);
    });
  });

  // ── Form submit ──
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = [...form.querySelectorAll('input[required], textarea[required], select[required]')];
    const allValid = fields.every(f => validateField(f));

    if (!allValid) {
      // Scroll to first error
      const firstError = form.querySelector('[style*="var(--coral)"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // ── NOTE ──────────────────────────────────────────────────
    // This form does NOT send data anywhere by default.
    // To make it functional, connect it to a backend service such as:
    //   - Formspree (https://formspree.io) — just change the form action
    //   - Netlify Forms — add netlify attribute to <form>
    //   - EmailJS — call their API here
    //
    // Example with Formspree:
    //   1. Set <form action="https://formspree.io/f/YOUR_ID" method="POST">
    //   2. Remove the e.preventDefault() above
    // ──────────────────────────────────────────────────────────

    // Simulate success for now
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Invio in corso…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      form.querySelectorAll('input, textarea, select').forEach(f => {
        f.style.borderColor = '';
        f.style.boxShadow   = '';
      });
      successMsg && successMsg.classList.add('visible');
      submitBtn.textContent = 'Invia messaggio →';
      submitBtn.disabled = false;
      successMsg && successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

});
