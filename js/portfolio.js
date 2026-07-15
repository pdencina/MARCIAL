/* ========================================
   PORTFOLIO MODULE
   Masonry grid, category filters, lightbox
   ======================================== */

// Portfolio image data - matches actual uploaded files (.jpeg)
// Ordenadas intercalando categorías para variedad visual
const portfolioData = [
  { src: 'img/portfolio/casas/casa-01.jpeg', category: 'casas', title: 'Casa Moderna Doble Altura' },
  { src: 'img/portfolio/terminaciones/term-01.jpeg', category: 'terminaciones', title: 'Escalera Flotante' },
  { src: 'img/portfolio/exteriores/ext-01.jpeg', category: 'exteriores', title: 'Fachada Moderna' },
  { src: 'img/portfolio/casas/casa-02.jpeg', category: 'casas', title: 'Residencia Minimalista' },
  { src: 'img/portfolio/terminaciones/term-02.jpeg', category: 'terminaciones', title: 'Revestimiento Mármol' },
  { src: 'img/portfolio/exteriores/ext-02.jpeg', category: 'exteriores', title: 'Terraza Vista Montaña' },
  { src: 'img/portfolio/casas/casa-03.jpeg', category: 'casas', title: 'Casa Contemporánea' },
  { src: 'img/portfolio/terminaciones/term-03.jpeg', category: 'terminaciones', title: 'Baño Premium' },
  { src: 'img/portfolio/exteriores/ext-03.jpeg', category: 'exteriores', title: 'Pérgola Metálica' },
  { src: 'img/portfolio/piscinas/pisc-01.jpeg', category: 'piscinas', title: 'Piscina con Deck' },
  { src: 'img/portfolio/casas/casa-04.jpeg', category: 'casas', title: 'Villa Premium' },
  { src: 'img/portfolio/terminaciones/term-04.jpeg', category: 'terminaciones', title: 'Doble Altura Interior' },
  { src: 'img/portfolio/exteriores/ext-04.jpeg', category: 'exteriores', title: 'Estructura Hormigón' },
  { src: 'img/portfolio/casas/casa-05.jpeg', category: 'casas', title: 'Casa de Diseño' },
  { src: 'img/portfolio/terminaciones/term-05.jpeg', category: 'terminaciones', title: 'Porcelanato Escaleras' },
  { src: 'img/portfolio/exteriores/ext-05.jpeg', category: 'exteriores', title: 'Quincho Piedra Natural' },
  { src: 'img/portfolio/casas/casa-06.jpeg', category: 'casas', title: 'Residencia Alto Hospicio' },
  { src: 'img/portfolio/terminaciones/term-06.jpeg', category: 'terminaciones', title: 'Cerámica Diseño' },
  { src: 'img/portfolio/exteriores/ext-06.jpeg', category: 'exteriores', title: 'Cierro Perimetral' },
  { src: 'img/portfolio/casas/casa-07.jpeg', category: 'casas', title: 'Casa Vista Montaña' },
  { src: 'img/portfolio/terminaciones/term-07.jpeg', category: 'terminaciones', title: 'Baño Doble Lavamanos' },
  { src: 'img/portfolio/exteriores/ext-07.jpeg', category: 'exteriores', title: 'Hormigonado Losa' },
  { src: 'img/portfolio/casas/casa-08.jpeg', category: 'casas', title: 'Proyecto Residencial' },
  { src: 'img/portfolio/terminaciones/term-09.jpeg', category: 'terminaciones', title: 'Vanitory Premium' },
  { src: 'img/portfolio/exteriores/ext-08.jpeg', category: 'exteriores', title: 'Pasarela Hormigón' },
  { src: 'img/portfolio/casas/casa-09.jpeg', category: 'casas', title: 'Casa Moderna Interior' },
  { src: 'img/portfolio/exteriores/ext-09.jpeg', category: 'exteriores', title: 'Radier y Pavimentos' },
  { src: 'img/portfolio/casas/casa-10.jpeg', category: 'casas', title: 'Fachada Premium' },
  { src: 'img/portfolio/exteriores/ext-10.jpeg', category: 'exteriores', title: 'Fachada Principal' },
  { src: 'img/portfolio/exteriores/ext-11.jpeg', category: 'exteriores', title: 'Vista Panorámica Obra' },
  { src: 'img/portfolio/exteriores/ext-12.jpeg', category: 'exteriores', title: 'Terraza en Proceso' },
  { src: 'img/portfolio/exteriores/ext-13.jpeg', category: 'exteriores', title: 'Obra Gruesa Completa' },
];

let currentFilter = 'all';
let currentLightboxIndex = 0;
let filteredImages = [...portfolioData];

function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const filters = document.querySelectorAll('.portfolio__filter');
  const lightbox = document.getElementById('lightbox');

  if (!grid) return;

  // Render initial grid
  renderGrid(grid);

  // Filter buttons
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGrid(grid);
    });
  });

  // Lightbox events
  if (lightbox) {
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        navigateLightbox(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }
}

function renderGrid(grid) {
  filteredImages = currentFilter === 'all'
    ? [...portfolioData]
    : portfolioData.filter(item => item.category === currentFilter);

  grid.innerHTML = filteredImages.map((item, index) => `
    <div class="portfolio__item" data-index="${index}">
      <img src="${item.src}" alt="${item.title}" loading="lazy"
           onerror="this.src='img/placeholder.svg'">
    </div>
  `).join('');

  // Add click events
  grid.querySelectorAll('.portfolio__item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      openLightbox(index);
    });
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const img = lightbox.querySelector('.lightbox__img');

  currentLightboxIndex = index;
  img.src = filteredImages[index].src;
  img.alt = filteredImages[index].title;

  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add('active'));
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  setTimeout(() => {
    lightbox.hidden = true;
  }, 300);
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  const lightbox = document.getElementById('lightbox');
  const img = lightbox.querySelector('.lightbox__img');

  currentLightboxIndex += direction;
  if (currentLightboxIndex >= filteredImages.length) currentLightboxIndex = 0;
  if (currentLightboxIndex < 0) currentLightboxIndex = filteredImages.length - 1;

  img.src = filteredImages[currentLightboxIndex].src;
  img.alt = filteredImages[currentLightboxIndex].title;
}
