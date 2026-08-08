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
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const form = document.querySelector('#contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const lang = root.lang;
  const subject = lang === 'en' ? 'Interior design consultation request' : 'Solicitud de consulta de interiorismo';
  const lines = [
    `${lang === 'en' ? 'Name' : 'Nombre'}: ${data.get('name') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `${lang === 'en' ? 'City / country' : 'Ciudad / país'}: ${data.get('city') || ''}`,
    `${lang === 'en' ? 'Service' : 'Servicio'}: ${data.get('service') || ''}`,
    `${lang === 'en' ? 'Estimated timeline' : 'Plazo estimado'}: ${data.get('timeline') || ''}`,
    `${lang === 'en' ? 'Approximate budget' : 'Presupuesto aproximado'}: ${data.get('budget') || ''}`,
    '',
    `${lang === 'en' ? 'Project' : 'Proyecto'}:`,
    data.get('message') || ''
  ];
  window.location.href = `mailto:ceo@mariapazbravo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
});
