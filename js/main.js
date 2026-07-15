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

  try {
    initExitPopup();
  } catch (e) {
    console.error('Exit popup init failed:', e);
  }
});

// Exit intent popup
function initExitPopup() {
  const popup = document.getElementById('exit-popup');
  if (!popup) return;

  let shown = false;

  // Desktop: detect mouse leaving viewport (top)
  document.addEventListener('mouseout', (e) => {
    if (shown) return;
    if (e.clientY <= 0 && !e.relatedTarget) {
      showExitPopup();
    }
  });

  // Mobile: detect back/tab switch after 30s on page
  let timeOnPage = 0;
  const timer = setInterval(() => {
    timeOnPage++;
    if (timeOnPage >= 45) clearInterval(timer);
  }, 1000);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && timeOnPage >= 30 && !shown) {
      // Will show when they come back
      document.addEventListener('visibilitychange', function showOnReturn() {
        if (!document.hidden && !shown) {
          showExitPopup();
          document.removeEventListener('visibilitychange', showOnReturn);
        }
      });
    }
  });

  function showExitPopup() {
    if (shown) return;
    shown = true;
    popup.hidden = false;

    // Close handlers
    const closeBtn = popup.querySelector('.exit-popup__close');
    const backdrop = popup.querySelector('.exit-popup__backdrop');

    closeBtn.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);
  }

  function closePopup() {
    popup.hidden = true;
  }
}
