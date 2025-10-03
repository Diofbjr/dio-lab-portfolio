const root = document.documentElement;
const toggleBtn = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('themeIcon');

function getSavedTheme() {
  return localStorage.getItem('theme');
}
function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeIcon.className = 'bi bi-sun-fill';
    toggleBtn.setAttribute('aria-pressed', 'false');
  } else {
    root.setAttribute('data-theme', 'dark');
    themeIcon.className = 'bi bi-moon-stars-fill';
    toggleBtn.setAttribute('aria-pressed', 'true');
  }
}

(function initTheme() {
  const saved = getSavedTheme();
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

toggleBtn?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

const openMenuBtn = document.getElementById('openMenu');
const nav = document.getElementById('primaryNav');

openMenuBtn?.addEventListener('click', () => {
  const expanded = openMenuBtn.getAttribute('aria-expanded') === 'true';
  openMenuBtn.setAttribute('aria-expanded', String(!expanded));
  nav.style.display = expanded ? '' : 'block';
});

document.querySelectorAll('.nav-primary a').forEach(a => {
  a.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    a.classList.add('active');
    if (window.innerWidth < 768 && nav) {
      nav.style.display = 'none';
      openMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

document.querySelectorAll('.accordion__header').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const panel = btn.nextElementSibling;
    btn.setAttribute('aria-expanded', String(!expanded));
    if (panel) {
      if (expanded) {
        panel.hidden = true;
      } else {
        panel.hidden = false;
      }
    }
  });
});
