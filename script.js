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
