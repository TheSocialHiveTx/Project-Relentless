/* =======================================================
   OPERATION RELENTLESS — MAIN JS
   Handles: sticky header, hamburger, scroll reveal,
            donation toggle, amount selector
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- STICKY HEADER SHADOW ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- ACTIVE NAV LINK ---- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav .nav-link, .mobile-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- SCROLL REVEAL (IntersectionObserver) ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  /* ---- DONATION AMOUNT SELECTOR ---- */
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('custom-amount');
  if (amountBtns.length) {
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        if (customInput) customInput.value = '';
      });
    });
    if (customInput) {
      customInput.addEventListener('input', () => {
        amountBtns.forEach(b => b.classList.remove('selected'));
      });
    }
  }

  /* ---- DONATION ONE-TIME / MONTHLY TOGGLE ---- */
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  if (toggleBtns.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Update label / context if needed
        const type = btn.dataset.type;
        const ctx = document.getElementById('donate-type-label');
        if (ctx) {
          ctx.textContent = type === 'monthly'
            ? 'Your monthly gift creates lasting change.'
            : 'Every gift makes an immediate impact.';
        }
      });
    });
  }

  /* ---- PROGRESS BAR ANIMATE ON SCROLL ---- */
  const progressBars = document.querySelectorAll('.progress-fill[data-width]');
  if (progressBars.length) {
    const progressObserver = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          progressObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.5 }
    );
    progressBars.forEach(bar => {
      bar.style.width = '0%';
      progressObserver.observe(bar);
    });
  }

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
