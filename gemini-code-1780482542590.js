/* Scroll progress + nav */
const sp = document.getElementById('sp');
const nav = document.getElementById('nav');
const btt = document.getElementById('btt');

window.addEventListener('scroll', () => {
  const st = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  sp.style.width = (st / dh * 100) + '%';
  nav.classList.toggle('scrolled', st > 50);
  btt.classList.toggle('visible', st > 300);
});

/* Theme */
const themeBtn = document.getElementById('theme-btn');
const html = document.documentElement;
const saved = localStorage.getItem('ts-theme') || 'dark';

html.setAttribute('data-theme', saved);
themeBtn.textContent = saved === 'dark' ? '🌙' : '☀️';

themeBtn.addEventListener('click', () => {
  const n = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', n);
  themeBtn.textContent = n === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('ts-theme', n);
});

/* Mobile nav */
const ham = document.getElementById('ham');
const mobNav = document.getElementById('mob-nav');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mobNav.classList.toggle('open');
});

function closeMob() {
  ham.classList.remove('open');
  mobNav.classList.remove('open');
}

/* Smooth anchors */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* Intersection observer for animations */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => obs.observe(el));

/* Counters */
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function runCounter(el) {
  const target = parseInt(el.getAttribute('data-t'));
  const dur = target > 100 ? 2000 : 1200;
  const start = performance.now();
  
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(easeOut(p) * target).toLocaleString();
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString();
    }
  })(start);
}

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.counter').forEach(runCounter);
    }
  });
}, { threshold: 0.3 }).observe(document.getElementById('stats'));