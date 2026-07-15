/* ========================================
   CONSTRUCTORA JIREH - Main Entry Point
   ======================================== */

// Remove no-js class
document.documentElement.classList.remove('no-js');

// Splash screen - hide after animation
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => splash.remove(), 800);
    }, 2200);
  }
});

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
