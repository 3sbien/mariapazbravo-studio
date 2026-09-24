const root = document.documentElement;
const langButtons = document.querySelectorAll('.lang');
const translatable = document.querySelectorAll('[data-es][data-en]');

function setLanguage(lang) {
  root.lang = lang;
  translatable.forEach(el => {
    el.textContent = el.dataset[lang];
  });
  langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  localStorage.setItem('mpb-language', lang);
}

langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
setLanguage(localStorage.getItem('mpb-language') || 'es');

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const form = document.querySelector('#contact-form');

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const note = form.querySelector('.form-note');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const lang = root.lang || 'es';
    const originalButton = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = lang === 'en' ? 'SENDING…' : 'ENVIANDO…';
    note.textContent = lang === 'en'
      ? 'Sending your request…'
      : 'Enviando tu solicitud…';

    try {
      const data = Object.fromEntries(new FormData(form).entries());

      const response = await fetch('https://formsubmit.co/ajax/ceodecoracion@mariapazbravo.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Submission failed');
      }

      form.reset();
      note.textContent = lang === 'en'
        ? 'Thank you. Your request has been sent.'
        : 'Gracias. Tu solicitud ha sido enviada.';
      submitButton.textContent = lang === 'en' ? 'SENT ✓' : 'ENVIADO ✓';

      setTimeout(() => {
        submitButton.textContent = originalButton;
        submitButton.disabled = false;
      }, 3500);
    } catch (error) {
      console.error(error);
      note.textContent = lang === 'en'
        ? 'The request could not be sent. Please try again.'
        : 'No se pudo enviar la solicitud. Inténtalo nuevamente.';
      submitButton.textContent = originalButton;
      submitButton.disabled = false;
    }
  });
}
