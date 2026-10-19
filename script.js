(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = v => Math.min(1, Math.max(0, v));
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  const burger = $('#menuToggle');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  };
  if (burger) {
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    $$('.menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('resize', () => innerWidth > 760 && setMenu(false));
  }
  const io = new IntersectionObserver(list => list.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('.rv').forEach(n => (still ? n.classList.add('in') : io.observe(n)));
  const video = $('.stage video');
  if (video) {
    new IntersectionObserver(list => list.forEach(e => {
      if (e.isIntersecting) video.play().catch(() => {}); else video.pause();
    }), { threshold: .15 }).observe(video);
  }
  const stage = $('.stage');
  const scrub = $('.scrub');
  let words = [];
  if (scrub && !still) {
    words = scrub.textContent.trim().split(/\s+/).map(w => {
      const s = document.createElement('span');
      s.textContent = w + ' ';
      s.style.opacity = '.22';
      return s;
    });
    scrub.textContent = '';
    scrub.append(...words);
  }
  let queued = false;
  const update = () => {
    queued = false;
    const vh = innerHeight;
    if (stage && !still) stage.style.setProperty('--p', clamp((vh - stage.getBoundingClientRect().top) / (vh * .7)).toFixed(3));
    if (words.length) {
      const r = scrub.getBoundingClientRect();
      const t = clamp((vh * .85 - r.top) / (r.height + vh * .1));
      words.forEach((w, i) => { w.style.opacity = (.22 + .78 * clamp(t * words.length * 1.1 - i)).toFixed(2); });
    }
  };
  const request = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  update();
})();
