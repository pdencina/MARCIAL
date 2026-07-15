/* ========================================
   CONSTRUCTORA JIREH - Main Entry Point
   ======================================== */

// Remove no-js class
document.documentElement.classList.remove('no-js');

// Import and initialize modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  try {
    initNavigation();
  } catch (e) {
    console.error('Navigation init failed:', e);
  }

  try {
    initPortfolio();
  } catch (e) {
    console.error('Portfolio init failed:', e);
  }

  try {
    initAnimations();
  } catch (e) {
    console.error('Animations init failed:', e);
  }

  try {
    initContactForm();
  } catch (e) {
    console.error('Contact form init failed:', e);
  }
});
