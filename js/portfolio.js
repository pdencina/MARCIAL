/* ========================================
   PORTFOLIO MODULE
   Masonry grid, category filters, lightbox
   ======================================== */

// Portfolio image data
const portfolioData = [
  { src: 'img/portfolio/casas/casa-01.jpg', category: 'casas', title: 'Casa Moderna Doble Altura' },
  { src: 'img/portfolio/casas/casa-02.jpg', category: 'casas', title: 'Residencia Minimalista' },
  { src: 'img/portfolio/casas/casa-03.jpg', category: 'casas', title: 'Casa Contemporánea' },
  { src: 'img/portfolio/casas/casa-04.jpg', category: 'casas', title: 'Villa Premium' },
  { src: 'img/portfolio/casas/casa-05.jpg', category: 'casas', title: 'Casa de Diseño' },
  { src: 'img/portfolio/casas/casa-06.jpg', category: 'casas', title: 'Residencia Alto Hospicio' },
  { src: 'img/portfolio/terminaciones/term-01.jpg', category: 'terminaciones', title: 'Escalera Flotante' },
  { src: 'img/portfolio/terminaciones/term-02.jpg', category: 'terminaciones', title: 'Revestimiento Mármol' },
  { src: 'img/portfolio/terminaciones/term-03.jpg', category: 'terminaciones', title: 'Baño Premium' },
  { src: 'img/portfolio/terminaciones/term-04.jpg', category: 'terminaciones', title: 'Doble Altura Interior' },
  { src: 'img/portfolio/terminaciones/term-05.jpg', category: 'terminaciones', title: 'Porcelanato Escaleras' },
  { src: 'img/portfolio/terminaciones/term-06.jpg', category: 'terminaciones', title: 'Cerámica Diseño' },
  { src: 'img/portfolio/terminaciones/term-07.jpg', category: 'terminaciones', title: 'Baño Doble Lavamanos' },
  { src: 'img/portfolio/terminaciones/term-08.jpg', category: 'terminaciones', title: 'Vanitory Premium' },
  { src: 'img/portfolio/terminaciones/term-09.jpg', category: 'terminaciones', title: 'Mesón Baño' },
  { src: 'img/portfolio/piscinas/pisc-01.jpg', category: 'piscinas', title: 'Piscina con Deck' },
  { src: 'img/portfolio/piscinas/pisc-02.jpg', category: 'piscinas', title: 'Piscina en Construcción' },
  { src: 'img/portfolio/piscinas/pisc-03.jpg', category: 'piscinas', title: 'Área de Piscina' },
  { src: 'img/portfolio/exteriores/ext-01.jpg', category: 'exteriores', title: 'Fachada Moderna' },
  { src: 'img/portfolio/exteriores/ext-02.jpg', category: 'exteriores', title: 'Terraza Vista Montaña' },
  { src: 'img/portfolio/exteriores/ext-03.jpg', category: 'exteriores', title: 'Pérgola Metálica' },
  { src: 'img/portfolio/exteriores/ext-04.jpg', category: 'exteriores', title: 'Obra Gruesa Estructura' },
  { src: 'img/portfolio/exteriores/ext-05.jpg', category: 'exteriores', title: 'Quincho Piedra Natural' },
  { src: 'img/portfolio/exteriores/ext-06.jpg', category: 'exteriores', title: 'Cierro Perimetral' },
  { src: 'img/portfolio/exteriores/ext-07.jpg', category: 'exteriores', title: 'Hormigonado Losa' },
  { src: 'img/portfolio/exteriores/ext-08.jpg', category: 'exteriores', title: 'Pasarela Hormigón' },
  { src: 'img/portfolio/exteriores/ext-09.jpg', category: 'exteriores', title: 'Radier y Pavimentos' },
  { src: 'img/portfolio/exteriores/ext-10.jpg', category: 'exteriores', title: 'Fachada Principal' },
  { src: 'img/portfolio/exteriores/ext-11.jpg', category: 'exteriores', title: 'Vista Panorámica Obra' },
  { src: 'img/portfolio/exteriores/ext-12.jpg', category: 'exteriores', title: 'Terraza en Proceso' },
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
      <div class="portfolio__item-overlay">
        <span class="portfolio__item-category">${item.title}</span>
      </div>
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
