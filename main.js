// ── DARK MODE ──
const html = document.documentElement;
const saved = localStorage.getItem('ivette-theme') || 'light';
html.setAttribute('data-theme', saved);

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ivette-theme', next);
}

document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', toggleTheme);
});

// ── NAV scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger && hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
});

function closeMobile() {
  menuOpen = false;
  mobileMenu && mobileMenu.classList.remove('open');
}

// ── Service tabs ──
const tabs = document.querySelectorAll('.stab');
if (tabs.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
  const sections = document.querySelectorAll('.service-detail');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tabs.forEach(tab => {
          tab.classList.toggle('active', tab.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
}

// ── Contact form ──
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  });
}

// ── Scroll reveal ──
const reveals = document.querySelectorAll(
  '.stat-card, .service-card, .client-tile, .value-card, .sd-item, .mf-card, .training-item, .why-item, .ci-card, .mission-card'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `slideIn 0.5s ${i * 0.05}s ease both`;
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});

// ── Ticker ──
const track = document.querySelector('.strip-track');
if (track) track.innerHTML += track.innerHTML;
