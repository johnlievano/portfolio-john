# Código entre viñetas

Copia independiente. Entrada activa: `index.html`, estilos `public/comic.css`, interacciones `public/comic.js`. `src/` conserva el código de origen como referencia; no se carga en esta versión estática.

Desde esta carpeta: `npm run dev -- --port 5175`. Compilar: `npm run build`. Publicar `dist/` en un hosting estático. No se ha publicado. La compilación usa Vite directamente porque la entrada activa es HTML estático; el React archivado en `src/` no participa.

Ilustración: `public/john-comic.webp`, creada con Imagegen integrado usando la foto facilitada. Prompt: retrato editorial de cómic de John con gafas, cabello rizado y camiseta negra, usando portátil; tinta negra, tramas de impresión, rojo, azul, amarillo y crema, viñetas urbanas, sin texto. El original generado se conserva en Codex.

Las esferas se eliminaron por petición del usuario. `public/scroll-comic.css` y `public/comic.js` implementan una escena sticky en perspectiva, capas ligadas al desplazamiento, telarañas SVG que se dibujan, entradas laterales y profundidad con puntero. Movimiento reducido y botón de pausa disponibles. Stickers con ratón, tacto y teclado. Contenidos y enlaces presentes en HTML desde la carga inicial.

Nuevas ilustraciones Imagegen: `public/art/laptop.png` y `public/art/city.png`, originales transparentes. Se sirven sus variantes WebP con alfa para reducir transferencia. Prompts: portátil rojo isométrico con líneas de código abstractas y hojas flotantes; conjunto de azoteas de ladrillo con torre de agua en perspectiva. Ambos con tinta de cómic, tramas, rojo/azul/crema/amarillo, sin texto y fondo transparente. El estado previo al cambio de scroll está en `before-scroll/`.

Agentic Browsing: llms.txt, .well-known/ard.json, árbol accesible y estabilidad visual. WebMCP no aplica: no hay formularios ni herramientas WebMCP registradas.

## Capítulos interactivos completados

`public/chapters.css` y `public/chapters.js` completan los elementos que ya estaban presentes en el HTML:

- Explosiones POW/BOOM al cargar, sin ocultar el contenido. Descripción fullstack sobre papel claro y experiencia de +1 año conservada del contenido existente.
- Selector ES/EN con persistencia local, traducción de las secciones y controles, y descarga del CV correspondiente al idioma.
- Siete portadas CSS 3D que abren un lector nativo `dialog`. Datos en `public/books.json`, certificados locales, navegación anterior/siguiente y con flechas, Escape para cerrar y devolución del foco a la portada.
- Cabina británica roja con puerta animada en perspectiva. Email, WhatsApp, LinkedIn y GitHub se habilitan al abrir; Escape cierra la cabina. El enlace directo de correo permanece disponible.
- Footer ilustrado con `public/art/john-secret.webp` (original: `public/art/john-secret.png`). Se reutilizó la ilustración ya existente, coincidente con la referencia adjunta: John con gafas y cabello rizado, chaqueta sobre traje arácnido, portátil y máscara en la mano. No fue necesario generar otra imagen en esta revisión.
- Corrección de las referencias de scroll al antiguo elemento `contact-city`, que ya no existe. Estilos cargados desde el `head` para evitar mostrar las nuevas secciones sin formato.

Verificación: build de producción y pruebas Playwright en 320, 390, 768 y 1440 px. Se comprobaron las siete ediciones, certificados, teclado/foco, cabina, traducciones, persistencia, pausa y preferencia de movimiento reducido; sin errores de consola, recursos HTTP fallidos, imágenes rotas ni desbordamiento horizontal. Desde la raíz del repositorio: `node .preview-tools/check-chapters.cjs` contra `http://127.0.0.1:5175/` (configurable con `COMIC_URL`).

## Revisión de objetos y contacto

`public/physical.css` y `public/physical.js` añaden la revisión visual e interactiva:

- Encabezado compacto «Mis proyectos» y seis casetes con carcasa, tornillos, carretes y estuches translúcidos. Clic, Enter/Espacio o arrastre de la pestaña para sacar/guardar. Flecha arriba saca; flecha abajo o Escape guarda. Solo se abre un proyecto a la vez.
- Ficha compartida debajo de la colección en escritorio; en móviles estrechos aparece justo debajo del casete seleccionado. Conserva las imágenes, descripciones y enlaces reales. El idioma también actualiza la etiqueta del casete y su nombre accesible.
- Cómics con ilustraciones existentes, cantos de papel, lomo, contraportada, reflejos y perspectiva reactiva al puntero. El lector conserva la navegación y los certificados.
- Contacto «¿Tienes una idea? Contáctame», con botón directo de correo. Fondo de cielo con dos imágenes de nubes generadas, usadas en tres capas animadas.
- La cabina CSS plana se reemplaza por dos renders realistas (abierta/cerrada) con transparencia, perspectiva y reacción al puntero. Es una representación visual de volumen con imágenes y CSS, no un modelo WebGL. El panel de enlaces aparece al abrir y se devuelve el foco al cerrar con Escape.
- Las nubes, los carretes y el movimiento de los objetos respetan la pausa y la preferencia de movimiento reducido.

Imágenes, originales y prompts exactos: [ASSETS.md](ASSETS.md). Pruebas adicionales: `node .preview-tools/check-physical.cjs`; verifican casetes, arrastre, teclado, cambios de idioma, nubes, apertura/cierre y desbordamiento en móvil, tableta y escritorio.
