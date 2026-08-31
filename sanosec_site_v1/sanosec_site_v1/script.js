const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = Number(el.dataset.delay || 0);
    el.style.setProperty('--delay', `${delay}ms`);
    el.classList.add('visible');
    revealObserver.unobserve(el);
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const score = document.querySelector('.score-panel');
const counter = document.querySelector('.count-up');
const scoreBar = document.querySelector('.score-track span');

if (score && counter && scoreBar) {
  const scoreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = Number(counter.dataset.target || 72);
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        counter.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      scoreBar.style.width = `${target}%`;
      scoreObserver.disconnect();
    });
  }, { threshold: .55 });
  scoreObserver.observe(score);
}

const glow = document.querySelector('.cursor-glow');
if (glow && matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(800px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
