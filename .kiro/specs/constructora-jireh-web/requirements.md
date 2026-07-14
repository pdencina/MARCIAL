# Requirements Document

## Introduction

Sitio web profesional y premium para **Constructora Jireh SPA** (RUT 78.410.833-3), empresa de construcción de casas de alto estándar liderada por Marcial Delgadillo Ruiz, ubicada en Alto Hospicio, Chile. El sitio debe transmitir lujo, calidad y modernidad, acorde al nivel de las construcciones que realiza la empresa (casas minimalistas de doble altura, acabados premium, piscinas, estructuras de hormigón armado). El diseño debe ser impactante visualmente, mobile-first, con estética oscura/elegante que refleje exclusividad.

## Glossary

- **Sitio_Web**: La página web completa de Constructora Jireh SPA, incluyendo todas sus secciones y funcionalidades
- **Visitante**: Persona que accede al Sitio_Web desde cualquier dispositivo
- **Boton_WhatsApp**: Elemento flotante visible en todas las páginas que permite al Visitante iniciar una conversación de WhatsApp con la empresa
- **Hero_Section**: Sección principal de impacto visual al inicio de la página, con imagen o video de fondo a pantalla completa
- **Portafolio**: Galería de proyectos realizados por la constructora, organizada con imágenes de alta calidad
- **Navegacion_Principal**: Menú de navegación del Sitio_Web que permite acceder a todas las secciones
- **Seccion_Servicios**: Área del Sitio_Web que detalla los servicios ofrecidos por la constructora
- **Seccion_Nosotros**: Área del Sitio_Web que presenta la empresa, su trayectoria y valores
- **Seccion_Contacto**: Área del Sitio_Web con información de contacto y formulario
- **Lightbox**: Componente de visualización de imágenes a pantalla completa con navegación entre fotos

## Requirements

### Requirement 1: Hero Section de Impacto Visual

**User Story:** Como Visitante, quiero ver una sección hero impactante al ingresar al sitio, para percibir inmediatamente el nivel premium de las construcciones de la empresa.

#### Acceptance Criteria

1. WHEN el Visitante carga la página principal, THE Hero_Section SHALL mostrar una imagen de fondo a pantalla completa con una altura mínima del 100% del viewport
2. THE Hero_Section SHALL incluir el nombre "Constructora Jireh" como título principal con tipografía elegante y de gran tamaño
3. THE Hero_Section SHALL incluir un subtítulo descriptivo que comunique la propuesta de valor de la empresa
4. THE Hero_Section SHALL incluir un botón de llamada a la acción visible que dirija a la Seccion_Contacto
5. THE Hero_Section SHALL aplicar un efecto de overlay oscuro sobre la imagen de fondo para garantizar legibilidad del texto
6. WHEN el Visitante hace scroll, THE Hero_Section SHALL aplicar un efecto parallax suave a la imagen de fondo

### Requirement 2: Navegación Principal Responsiva

**User Story:** Como Visitante, quiero una navegación clara y accesible en cualquier dispositivo, para poder explorar todas las secciones del sitio sin dificultad.

#### Acceptance Criteria

1. THE Navegacion_Principal SHALL mostrarse como barra fija (sticky) en la parte superior del Sitio_Web
2. THE Navegacion_Principal SHALL incluir enlaces a las secciones: Inicio, Servicios, Portafolio, Nosotros y Contacto
3. WHILE el Visitante usa un dispositivo con ancho de pantalla menor a 768px, THE Navegacion_Principal SHALL colapsar en un menú tipo hamburguesa
4. WHEN el Visitante hace click en un enlace de la Navegacion_Principal, THE Sitio_Web SHALL realizar un scroll suave hacia la sección correspondiente
5. WHILE el Visitante ha scrolleado más allá de la Hero_Section, THE Navegacion_Principal SHALL mostrar un fondo sólido oscuro con efecto de transparencia
6. THE Navegacion_Principal SHALL incluir el logotipo de Constructora Jireh en el extremo izquierdo

### Requirement 3: Sección de Servicios

**User Story:** Como Visitante, quiero conocer los servicios que ofrece la constructora, para evaluar si cubren mis necesidades de construcción.

#### Acceptance Criteria

1. THE Seccion_Servicios SHALL presentar los servicios en formato de tarjetas (cards) con icono, título y descripción breve
2. THE Seccion_Servicios SHALL incluir los siguientes servicios: Construcción de Casas, Obra Gruesa, Terminaciones Finas, Piscinas y Áreas Exteriores, Remodelaciones, y Diseño Arquitectónico
3. WHEN el Visitante pasa el cursor sobre una tarjeta de servicio, THE Seccion_Servicios SHALL aplicar una animación sutil de elevación y cambio de color de borde
4. THE Seccion_Servicios SHALL usar un diseño de grilla responsiva que muestre 3 columnas en desktop, 2 en tablet y 1 en mobile
5. THE Seccion_Servicios SHALL incluir un título de sección con línea decorativa dorada como acento visual

### Requirement 4: Portafolio de Proyectos

**User Story:** Como Visitante, quiero ver fotos de proyectos realizados por la constructora, para evaluar la calidad y estilo de sus construcciones.

#### Acceptance Criteria

1. THE Portafolio SHALL mostrar las imágenes de proyectos en un layout de grilla tipo masonry (albañilería)
2. THE Portafolio SHALL soportar la visualización de al menos 30 fotografías de proyectos
3. WHEN el Visitante hace click en una imagen del Portafolio, THE Lightbox SHALL abrir mostrando la imagen a tamaño completo con fondo oscuro
4. WHILE el Lightbox está abierto, THE Lightbox SHALL permitir navegar entre imágenes usando flechas laterales o gestos swipe en mobile
5. WHILE el Lightbox está abierto, THE Lightbox SHALL cerrarse al presionar la tecla Escape o al hacer click fuera de la imagen
6. THE Portafolio SHALL incluir un efecto de hover que muestre un overlay con el nombre o categoría del proyecto
7. THE Portafolio SHALL implementar carga diferida (lazy loading) para las imágenes para optimizar el rendimiento
8. THE Portafolio SHALL permitir filtrar proyectos por categoría: Casas Completas, Piscinas, Terminaciones, Exteriores

### Requirement 5: Sección Sobre Nosotros

**User Story:** Como Visitante, quiero conocer la historia y valores de la constructora, para generar confianza antes de contactarlos.

#### Acceptance Criteria

1. THE Seccion_Nosotros SHALL presentar una descripción de la empresa, su experiencia y filosofía de trabajo
2. THE Seccion_Nosotros SHALL incluir el nombre del responsable: Marcial Delgadillo Ruiz
3. THE Seccion_Nosotros SHALL destacar valores diferenciadores como calidad premium, acabados de alto estándar y compromiso con el cliente
4. THE Seccion_Nosotros SHALL incluir una imagen o composición visual representativa
5. THE Seccion_Nosotros SHALL presentar cifras o indicadores de experiencia (proyectos realizados, años de experiencia)

### Requirement 6: Sección de Contacto

**User Story:** Como Visitante, quiero poder contactar a la constructora fácilmente, para solicitar cotizaciones o información sobre sus servicios.

#### Acceptance Criteria

1. THE Seccion_Contacto SHALL mostrar la dirección: Bolivia 9, Alto Hospicio
2. THE Seccion_Contacto SHALL incluir un formulario de contacto con campos: Nombre, Teléfono, Email y Mensaje
3. WHEN el Visitante envía el formulario con todos los campos requeridos completos, THE Seccion_Contacto SHALL mostrar un mensaje de confirmación de envío exitoso
4. IF el Visitante envía el formulario con campos requeridos vacíos, THEN THE Seccion_Contacto SHALL mostrar mensajes de validación específicos para cada campo incompleto
5. THE Seccion_Contacto SHALL incluir un mapa embebido (Google Maps) mostrando la ubicación de la empresa
6. THE Seccion_Contacto SHALL mostrar los datos de contacto: teléfono y email de la empresa

### Requirement 7: Botón Flotante de WhatsApp

**User Story:** Como Visitante, quiero poder contactar a la constructora por WhatsApp de forma inmediata, para hacer consultas rápidas sin llenar formularios.

#### Acceptance Criteria

1. THE Boton_WhatsApp SHALL estar visible de forma permanente en la esquina inferior derecha del Sitio_Web
2. THE Boton_WhatsApp SHALL mostrarse sobre todos los demás elementos de la página (z-index superior)
3. WHEN el Visitante hace click en el Boton_WhatsApp, THE Sitio_Web SHALL abrir una conversación de WhatsApp con el número de la empresa y un mensaje predefinido de saludo
4. THE Boton_WhatsApp SHALL tener un tamaño mínimo de 56px para facilitar la interacción en dispositivos táctiles
5. WHEN el Visitante pasa el cursor sobre el Boton_WhatsApp, THE Boton_WhatsApp SHALL mostrar un tooltip con el texto "Escríbenos por WhatsApp"
6. THE Boton_WhatsApp SHALL incluir una animación de pulso sutil para atraer la atención del Visitante

### Requirement 8: Diseño Visual Premium y Responsivo

**User Story:** Como propietario del sitio, quiero que el diseño transmita exclusividad y profesionalismo, para reflejar fielmente la calidad de las construcciones que realizo.

#### Acceptance Criteria

1. THE Sitio_Web SHALL usar una paleta de colores oscura con acentos dorados o cobrizos que transmita lujo y elegancia
2. THE Sitio_Web SHALL usar tipografías premium (serif para títulos, sans-serif para cuerpo) cargadas desde Google Fonts
3. THE Sitio_Web SHALL ser completamente responsivo, adaptándose correctamente a dispositivos con ancho desde 320px hasta 2560px
4. THE Sitio_Web SHALL incluir animaciones de aparición (fade-in, slide-up) al hacer scroll por las secciones
5. THE Sitio_Web SHALL mantener un tiempo de carga inicial menor a 3 segundos en una conexión 4G estándar
6. THE Sitio_Web SHALL usar espaciado generoso entre secciones para transmitir aire y sofisticación
7. THE Sitio_Web SHALL incluir un footer con datos de la empresa, RUT 78.410.833-3, enlaces rápidos y redes sociales

### Requirement 9: Optimización SEO y Rendimiento

**User Story:** Como propietario del sitio, quiero que mi página aparezca en los resultados de búsqueda de Google, para que potenciales clientes me encuentren al buscar constructoras en Alto Hospicio.

#### Acceptance Criteria

1. THE Sitio_Web SHALL incluir meta tags optimizados: title, description y keywords relevantes para construcción premium en Alto Hospicio
2. THE Sitio_Web SHALL usar estructura semántica HTML5 con etiquetas header, nav, main, section, article y footer
3. THE Sitio_Web SHALL incluir atributos alt descriptivos en todas las imágenes del Portafolio
4. THE Sitio_Web SHALL generar un archivo sitemap.xml válido
5. THE Sitio_Web SHALL incluir marcado de datos estructurados (JSON-LD) para negocio local (LocalBusiness)
6. THE Sitio_Web SHALL obtener una puntuación mínima de 90 en Google Lighthouse para las categorías Performance y Accessibility

### Requirement 10: Tecnología y Despliegue

**User Story:** Como propietario del sitio, quiero una web fácil de mantener y actualizar, para poder agregar nuevas fotos de proyectos sin depender de un desarrollador.

#### Acceptance Criteria

1. THE Sitio_Web SHALL estar construido con HTML5, CSS3 y JavaScript vanilla para máxima compatibilidad y simplicidad de mantenimiento
2. THE Sitio_Web SHALL organizar las imágenes del Portafolio en una carpeta dedicada con nomenclatura clara para facilitar la adición de nuevas fotos
3. THE Sitio_Web SHALL incluir un archivo README con instrucciones claras para agregar nuevas imágenes al Portafolio
4. THE Sitio_Web SHALL estar preparado para despliegue en hosting estático (GitHub Pages, Netlify o similar)
5. THE Sitio_Web SHALL incluir un favicon personalizado acorde a la identidad visual de la empresa
