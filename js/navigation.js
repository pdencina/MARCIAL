/* ========================================
   NAVIGATION MODULE
   Sticky nav, hamburger menu, smooth scroll
   ======================================== */

function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!header || !navToggle || !navMenu) return;

  // --- Sticky nav on scroll ---
  let lastScroll = 0;
  const scrollThreshold = 100;

  function handleScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  // Throttle scroll events
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        updateActiveSection();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // --- Hamburger toggle ---
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // --- Close menu on link click ---
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // --- Close menu on click outside ---
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // --- Active section tracking ---
  const sections = document.querySelectorAll('section[id]');

  function updateActiveSection() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Initial call
  handleScroll();
  updateActiveSection();
}
