# Implementation Plan: Constructora Jireh Web

## Overview

Sitio web single-page premium para Constructora Jireh SPA, construido con HTML5, CSS3 y JavaScript vanilla. La implementación sigue un enfoque incremental: estructura base del proyecto, HTML semántico completo, estilos CSS con design tokens, módulos JavaScript para interactividad, y optimización final de SEO/performance.

## Tasks

- [ ] 1. Configurar estructura del proyecto y archivos base
  - [ ] 1.1 Crear estructura de directorios y archivos de configuración
    - Crear carpetas: `css/`, `js/`, `img/hero/`, `img/portfolio/casas/`, `img/portfolio/piscinas/`, `img/portfolio/terminaciones/`, `img/portfolio/exteriores/`, `img/about/`, `img/icons/`
    - Crear `robots.txt` con referencia al sitemap
    - Crear `sitemap.xml` con URL del sitio y secciones principales
    - Crear `favicon.ico` placeholder
    - _Requirements: 10.1, 10.2, 10.4, 9.4_

  - [ ] 1.2 Crear archivo README.md con instrucciones de mantenimiento
    - Documentar estructura del proyecto
    - Instrucciones claras para agregar nuevas imágenes al portafolio (nomenclatura, formatos, carpetas)
    - Instrucciones para despliegue en GitHub Pages o Netlify
    - _Requirements: 10.3_

- [ ] 2. Implementar estructura HTML completa (index.html)
  - [ ] 2.1 Crear la base del documento HTML con meta tags y SEO
    - Doctype HTML5, charset UTF-8, viewport meta tag
    - Meta tags: title, description, keywords optimizados para "constructora Alto Hospicio"
    - Open Graph tags (og:title, og:description, og:image, og:type)
    - JSON-LD LocalBusiness structured data (nombre, dirección Bolivia 9, RUT 78.410.833-3, servicios, coordenadas)
    - Link a Google Fonts (Playfair Display + Raleway)
    - Link a styles.css, scripts con `defer`
    - Clase `.no-js` en `<html>` para progressive enhancement
    - _Requirements: 9.1, 9.2, 9.5, 10.1_

  - [ ] 2.2 Implementar Hero Section
    - `<section id="inicio" class="hero">` con imagen de fondo, overlay oscuro, título "Constructora Jireh", subtítulo con propuesta de valor, y botón CTA "Solicitar Cotización" enlazando a `#contacto`
    - Imagen con `fetchpriority="high"`, formato WebP con fallback JPEG usando `<picture>`
    - Estructura semántica con `<h1>` para el título
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ] 2.3 Implementar Navigation con menú y logo
    - `<header>` con `<nav>` sticky, logo a la izquierda
    - Enlaces: Inicio, Servicios, Portafolio, Nosotros, Contacto
    - Botón hamburguesa (3 líneas) visible solo en mobile (< 768px)
    - Atributos ARIA: `aria-label`, `aria-expanded`, `role="navigation"`
    - _Requirements: 2.1, 2.2, 2.3, 2.6_

  - [ ] 2.4 Implementar Sección Servicios
    - `<section id="servicios">` con título y línea decorativa dorada
    - 6 tarjetas de servicio con SVG placeholder para iconos, título y descripción
    - Servicios: Construcción de Casas, Obra Gruesa, Terminaciones Finas, Piscinas y Áreas Exteriores, Remodelaciones, Diseño Arquitectónico
    - Grid container para layout responsivo
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

  - [ ] 2.5 Implementar Sección Portafolio con filtros y galería
    - `<section id="portafolio">` con título de sección
    - Botones de filtro: Todos, Casas Completas, Piscinas, Terminaciones, Exteriores
    - Grid masonry con `<figure>` elements, cada uno con `<img loading="lazy">` y `<figcaption>` overlay
    - Atributos `data-category` en cada figura para filtrado
    - Alt text descriptivo en cada imagen
    - Lightbox modal markup: overlay, imagen, botones prev/next, botón cerrar
    - Keyboard/ARIA: `role="dialog"`, `aria-modal="true"`, `aria-label`
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 9.3_

  - [ ] 2.6 Implementar Sección Nosotros
    - `<section id="nosotros">` con layout 2 columnas (texto + imagen)
    - Descripción de la empresa, nombre de Marcial Delgadillo Ruiz, valores diferenciadores
    - Counters animados: proyectos realizados y años de experiencia
    - Atributos `data-target` para animación de números
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 2.7 Implementar Sección Contacto con formulario y mapa
    - `<section id="contacto">` con grid 2 columnas (formulario + info/mapa)
    - Formulario con campos: Nombre, Teléfono, Email, Mensaje, todos `required`
    - `action` attribute apuntando a Formspree endpoint como fallback sin JS
    - Google Maps iframe con `loading="lazy"` para Bolivia 9, Alto Hospicio
    - Datos de contacto: dirección, teléfono, email
    - Mensajes de validación con `aria-live="polite"`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ] 2.8 Implementar Footer y Botón WhatsApp
    - `<footer>` con datos empresa (nombre, RUT 78.410.833-3), enlaces rápidos, redes sociales
    - Botón WhatsApp flotante: `<a href="https://wa.me/...">` con SVG icon, `position: fixed`, `aria-label="Contactar por WhatsApp"`, tooltip span
    - `target="_blank"` y `rel="noopener noreferrer"` en enlace WhatsApp
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.7_

- [ ] 3. Checkpoint - Validar estructura HTML
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implementar estilos CSS (styles.css)
  - [ ] 4.1 Crear CSS custom properties y estilos base
    - Definir todas las custom properties (design tokens): colores, tipografías, spacing, transitions, shadows, z-index
    - CSS Reset/normalize básico
    - Estilos base: body, headings, links, `.container`, `.btn`, `.btn--gold`
    - Cargar fuentes con `font-display: swap`
    - Clase `.no-js` para fallback sin JavaScript
    - _Requirements: 8.1, 8.2, 8.6_

  - [ ] 4.2 Implementar estilos del Hero y Navigation
    - Hero: fullscreen `min-height: 100vh`, background-image cover, overlay rgba, parallax con `background-attachment: fixed`
    - Nav: `position: sticky`, fondo transparente inicial, transición a `rgba(18,18,18,0.95)` con `backdrop-filter: blur(10px)`
    - Hamburger icon: 3 líneas animadas a X
    - Panel mobile slide-in desde derecha
    - _Requirements: 1.1, 1.5, 1.6, 2.1, 2.5_

  - [ ] 4.3 Implementar estilos de Servicios y Portafolio
    - Services grid: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
    - Service cards: background card, border, hover `translateY(-8px)` + shadow dorado + border dorado
    - Título de sección con span decorativo dorado
    - Portfolio masonry: `column-count: 3/2/1` según breakpoint, `break-inside: avoid`
    - Filtros: botones con estado activo (border-bottom dorado), transición
    - Overlay hover en imágenes del portfolio
    - _Requirements: 3.3, 3.4, 3.5, 4.1, 4.6, 4.8_

  - [ ] 4.4 Implementar estilos del Lightbox, Nosotros y Contacto
    - Lightbox: `position: fixed; inset: 0`, backdrop oscuro, imagen centrada, botones nav, fade-in con scale
    - About: grid 2 columnas, counters styling
    - Contact: grid 2 columnas (formulario + mapa/info), input styles con focus states dorados
    - Mensajes de error/éxito para formulario
    - _Requirements: 4.3, 4.4, 4.5, 5.4, 6.5_

  - [ ] 4.5 Implementar estilos del Footer, WhatsApp y animaciones
    - Footer: fondo más oscuro, grid para columnas de contenido
    - WhatsApp button: `position: fixed; bottom: 24px; right: 24px`, 60×60px, fondo #25D366, `@keyframes pulse` con box-shadow
    - Tooltip con transición opacity en hover
    - Keyframes: `fade-in`, `slide-left`, `slide-right`, `scale-in`
    - Clases de animación con `opacity: 0` inicial, `.is-visible` con transición
    - _Requirements: 7.1, 7.2, 7.4, 7.5, 7.6, 8.4, 8.7_

  - [ ] 4.6 Implementar media queries y responsive design
    - Breakpoints: 320px, 768px, 1024px, 1440px, 2560px
    - Mobile: nav hamburguesa, grids 1 col, stacked layouts
    - Tablet: grids 2 col, ajustes de spacing
    - Desktop/Large: max-width container, grids 3 col
    - Focus styles visibles en todos los elementos interactivos
    - `prefers-reduced-motion: reduce` para desactivar animaciones
    - _Requirements: 8.3, 8.5_

- [ ] 5. Checkpoint - Validar diseño visual y responsividad
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implementar módulos JavaScript
  - [ ] 6.1 Crear main.js (inicialización y coordinación)
    - Importar e inicializar todos los módulos al DOMContentLoaded
    - Remover clase `.no-js` del `<html>`
    - Manejar errores de inicialización con try/catch
    - _Requirements: 10.1_

  - [ ] 6.2 Implementar navigation.js
    - `initNavigation()`: setup de event listeners
    - Sticky nav: cambio de fondo al scrollear > 100px (throttled scroll listener)
    - Hamburger toggle: abrir/cerrar panel con animación, toggle `aria-expanded`
    - Smooth scroll: `scrollIntoView({ behavior: 'smooth' })` con offset para header
    - Active section tracking: Intersection Observer en cada `<section>` para highlight del enlace activo
    - Cerrar menú mobile al hacer click en un enlace
    - _Requirements: 2.1, 2.3, 2.4, 2.5_

  - [ ] 6.3 Implementar portfolio.js (filtros y lightbox)
    - `initPortfolio()`: setup filtros y lightbox
    - `filterByCategory(category)`: toggle clase, transición opacity para mostrar/ocultar
    - `openLightbox(index)`: abrir modal, mostrar imagen, preload siguiente/anterior
    - Navegación lightbox: flechas click, keyboard (← → Escape), touch swipe (touchstart/touchmove/touchend)
    - `closeLightbox()`: cerrar al click X, Escape, o click en backdrop
    - Focus trap dentro del lightbox cuando está abierto
    - _Requirements: 4.3, 4.4, 4.5, 4.8_

  - [ ] 6.4 Implementar animations.js (scroll animations)
    - `initAnimations()`: crear Intersection Observer con `threshold: 0.15`, `rootMargin: "0px 0px -50px 0px"`
    - Observar elementos con clases `.fade-in`, `.slide-left`, `.slide-right`, `.scale-in`
    - Agregar clase `.is-visible` al entrar en viewport
    - Counter animation: `requestAnimationFrame` para animar números al entrar en viewport
    - Respetar `prefers-reduced-motion`: si está activo, mostrar elementos sin animación
    - Performance: usar `will-change` solo durante animación, remover después
    - _Requirements: 8.4_

  - [ ] 6.5 Implementar contact.js (validación y envío)
    - `initContactForm()`: setup de event listeners (blur para validación en tiempo real, submit)
    - `validateField(field)`: validar según reglas (nombre min 2 chars, teléfono formato chileno, email regex, mensaje min 10 chars)
    - `showFieldError(field, message)` / `clearErrors()`: mostrar/ocultar mensajes de error
    - `submitForm(formData)`: POST a Formspree con fetch, timeout 5s con AbortController
    - Estados del submit: loading spinner → success message / error message con alternativa WhatsApp
    - `showSuccess()`: mensaje de confirmación y reset del formulario
    - _Requirements: 6.2, 6.3, 6.4_

  - [ ] 6.6 Implementar lazy-load.js
    - `initLazyLoad()`: crear Intersection Observer con `rootMargin: "200px"`
    - Observar imágenes con `loading="lazy"` como fallback para navegadores sin soporte nativo
    - Al entrar en viewport: intercambiar `data-src` a `src`, manejar `onerror` con placeholder SVG
    - Lazy load del iframe de Google Maps
    - _Requirements: 4.7, 8.5_

- [ ] 7. Checkpoint - Validar interactividad completa
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Preparar assets e imágenes placeholder
  - [ ] 8.1 Crear SVG icons para servicios
    - 6 iconos SVG inline para: Construcción de Casas, Obra Gruesa, Terminaciones Finas, Piscinas, Remodelaciones, Diseño Arquitectónico
    - Estilo: línea fina, color dorado/acento, consistentes entre sí
    - _Requirements: 3.1_

  - [ ] 8.2 Crear imágenes placeholder y estructura del portafolio
    - Placeholder SVG genérico para imágenes del hero y portafolio mientras se cargan las reales
    - Archivo de datos con la estructura `portfolioData` (al menos 30 entradas con categorías distribuidas)
    - Nomenclatura clara: `{categoria}/{categoria}-{numero}.webp`
    - _Requirements: 4.2, 10.2_

- [ ] 9. Optimización final SEO y Performance
  - [ ] 9.1 Implementar critical CSS y optimizaciones de carga
    - Inline CSS crítico para above-the-fold en `<style>` dentro del `<head>`
    - Verificar `fetchpriority="high"` en hero image
    - Verificar que todas las imágenes debajo del fold tengan `loading="lazy"`
    - Verificar `<picture>` elements con WebP + JPEG fallback
    - Verificar que scripts usen `defer`
    - _Requirements: 8.5, 9.6_

  - [ ] 9.2 Validar accesibilidad y semántica HTML
    - Verificar estructura de headings (h1 → h2 → h3, sin saltos)
    - Verificar que todos los elementos interactivos tengan focus visible
    - Verificar que el lightbox tenga keyboard navigation completa y focus trap
    - Verificar ARIA labels en: botón WhatsApp, lightbox, menú hamburguesa, formulario
    - Verificar contraste de colores ≥ 4.5:1 para texto normal
    - Verificar `prefers-reduced-motion` desactiva todas las animaciones
    - _Requirements: 9.2, 9.6_

- [ ] 10. Final checkpoint - Verificar completitud del proyecto
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- El proyecto usa HTML5/CSS3/JavaScript vanilla sin frameworks ni build tools
- Las imágenes reales del portafolio deben ser proporcionadas por el cliente; el proyecto incluye placeholders y estructura lista para recibirlas
- El endpoint de Formspree debe ser configurado por el propietario del sitio
- El número de WhatsApp debe ser actualizado con el número real de la empresa
- No se incluyen property-based tests ya que el diseño establece que PBT no es aplicable para sitios web estáticos
- Checkpoints permiten validar incrementalmente antes de continuar
- La validación final incluye Lighthouse, W3C Validator y revisión de accesibilidad

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8"] },
    { "id": 3, "tasks": ["4.1"] },
    { "id": 4, "tasks": ["4.2", "4.3", "4.4", "4.5"] },
    { "id": 5, "tasks": ["4.6"] },
    { "id": 6, "tasks": ["6.1", "8.1", "8.2"] },
    { "id": 7, "tasks": ["6.2", "6.3", "6.4", "6.5", "6.6"] },
    { "id": 8, "tasks": ["9.1", "9.2"] }
  ]
}
```
