/* =====================================================
   KAIVALYA PROPERTIES — MAIN JS
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ── NAVBAR ── */
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
  const hamburger     = document.getElementById('hamburger');
  const mobileDrawer  = document.getElementById('mobileDrawer');

  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', function () {
      const open = mobileDrawer.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileDrawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL TO TOP ── */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* ── SCROLL REVEAL ── */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right';
  const revealEls = document.querySelectorAll(revealSelectors);

  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // stagger siblings
          const siblings = Array.from(e.target.parentElement.children)
            .filter(el => el.classList.contains('reveal') ||
                          el.classList.contains('reveal-left') ||
                          el.classList.contains('reveal-right'));
          const idx = siblings.indexOf(e.target);
          e.target.style.transitionDelay = `${idx * 0.1}s`;
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── ACTIVE NAV LINK ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === page) link.classList.add('active');
  });

  /* ── SMOOTH ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

});
