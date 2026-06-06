/* =====================================================
   KAIVALYA PROPERTIES — MAIN JS (Fixed)
   ===================================================== */
document.addEventListener('DOMContentLoaded', function () {

  /* ── NAVBAR scroll effect ── */
  const navbar = document.getElementById('navbar');
  const isHome = ['/', '/index.html', ''].some(p =>
    window.location.pathname.endsWith(p) || window.location.pathname === p
  );

  function updateNav() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else if (isHome) {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── HAMBURGER / MOBILE DRAWER ── */
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileDrawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL TO TOP ── */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Small stagger based on index among siblings
          const parent = entry.target.parentElement;
          const siblings = Array.from(parent.querySelectorAll(
            ':scope > .reveal, :scope > .reveal-left, :scope > .reveal-right'
          ));
          const idx = siblings.indexOf(entry.target);
          if (idx > 0) {
            entry.target.style.transitionDelay = (idx * 0.1) + 's';
          }
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: show everything instantly
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(function (link) {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === page) link.classList.add('active');
  });

});