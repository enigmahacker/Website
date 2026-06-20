// Patne Law — interactivity
(() => {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // Header scroll state
  const header = $('#header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  const toggle = $('#menuToggle');
  const navMobile = $('#navMobile');
  if (toggle && navMobile) {
    toggle.addEventListener('click', () => navMobile.classList.toggle('open'));
    $$('a', navMobile).forEach(a => a.addEventListener('click', () => navMobile.classList.remove('open')));
  }

  // Remove intro overlay
  setTimeout(() => {
    const intro = $('.page-intro');
    if (intro) intro.style.display = 'none';
  }, 2200);

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  // Animated counters
  const counters = $$('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '+';
      const dur = 1600;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * eased).toLocaleString() + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));

  // Testimonial indicator toggle (visual only, single quote)
  const indicators = $$('.testimony__indicators button');
  let idx = 0;
  if (indicators.length) {
    setInterval(() => {
      indicators[idx].classList.remove('active');
      idx = (idx + 1) % indicators.length;
      indicators[idx].classList.add('active');
    }, 4500);
  }

  // Subtle parallax on hero ornament
  const ornament = $('.hero__ornament');
  if (ornament && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      ornament.style.transform = `translateY(calc(-50% + ${y * 0.12}px)) rotate(${y * 0.02}deg)`;
    }, { passive: true });
  }
})();
