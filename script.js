/* =========================================================
   Nuttakit Ninsawat — Portfolio
   Handles: welcome popup animation, mobile nav toggle,
   scroll-spy active link highlighting, scroll reveal.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Welcome popup -> hero heading ---------- */
  const overlay = document.getElementById('welcomeOverlay');
  if (overlay) {
    // Let the popup sit centered for a moment, then animate it away
    // while the real hero heading fades/slides into place (see CSS
    // .hero-copy / .hero-media animation-delay, timed to match).
    setTimeout(() => {
      overlay.classList.add('is-moving');
    }, 1600);

    setTimeout(() => {
      overlay.classList.add('is-hidden');
    }, 2500);

    // Fully remove from the accessibility tree / layout once hidden
    overlay.addEventListener('transitionend', () => {
      if (overlay.classList.contains('is-hidden')) {
        overlay.style.display = 'none';
      }
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu after choosing a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  const sections = document.querySelectorAll('main .section');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.dataset.section === id);
    });
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px', // trigger when section is roughly centered
    threshold: 0
  });

  sections.forEach(section => spyObserver.observe(section));

  /* ---------- Scroll reveal for section titles ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => revealObserver.observe(section));

});
