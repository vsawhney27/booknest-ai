(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ----- Smooth anchor scrolling with header offset -----
  const header = document.querySelector('header, .site-header, .navbar, .topbar');
  const headerOffset = () => (header ? header.getBoundingClientRect().height : 0);

  function smoothScrollTo(target) {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const top = window.scrollY + rect.top - headerOffset() - 12; // small gap
    window.scrollTo({ top, behavior: 'smooth' });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    if (prefersReduced) {
      const top = window.scrollY + target.getBoundingClientRect().top - headerOffset() - 12;
      window.scrollTo({ top, behavior: 'auto' });
    } else {
      smoothScrollTo(target);
    }
  });

  // ----- Reveal-on-scroll with IntersectionObserver -----
  if (!prefersReduced) {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Optional: stop observing to prevent re-triggering
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    // Setup staggered reveals
    const staggerGroups = document.querySelectorAll('.reveal-stagger');
    staggerGroups.forEach(group => {
      const children = group.querySelectorAll('[data-stagger]');
      children.forEach((child, i) => {
        child.style.setProperty('--i', i);
      });
    });

    // Start observing
    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Reduced motion: immediately show all reveals
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('in-view');
    });
  }

  // ----- Enhanced card interactions -----
  const cards = document.querySelectorAll('.card, .contact-card, .plan-card, .integration-card');
  cards.forEach(card => {
    // Add subtle scale on press
    card.addEventListener('mousedown', () => {
      if (!prefersReduced) {
        card.style.transform = 'translateY(-2px) scale(0.995)';
      }
    });
    
    card.addEventListener('mouseup', () => {
      if (!prefersReduced) {
        card.style.transform = '';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (!prefersReduced) {
        card.style.transform = '';
      }
    });
  });

  console.log('Motion system initialized', { prefersReduced, revealCount: document.querySelectorAll('.reveal').length });
})();