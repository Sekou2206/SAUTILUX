(() => {
  const progress = document.getElementById('progressBar');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      mobileMenu.classList.toggle('open', !open);
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
    }));
  }
  const nodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
  } else nodes.forEach(node => node.classList.add('visible'));
})();
