# Imágenes de la revisión física

Herramienta: Imagegen integrado. Se generaron imágenes PNG con alfa; se guardaron en el proyecto y se convirtieron con Sharp a WebP de 900 px de ancho, calidad 86, conservando transparencia. El sitio sirve WebP. No se utilizó la API/CLI de generación.

## Archivos finales

- `public/art/cloud-cumulus.png` y `public/art/cloud-cumulus.webp`
- `public/art/cloud-wisps.png` y `public/art/cloud-wisps.webp`
- `public/art/telephone-kiosk.png` y `public/art/telephone-kiosk.webp`
- `public/art/telephone-kiosk-open.png` y `public/art/telephone-kiosk-open.webp`

Las portadas reutilizan `public/john-comic.webp`, `public/art/city.webp` y `public/art/laptop.webp`. El footer conserva `public/art/john-secret.webp`.

## Prompts finales

### Cumulus

Use case: stylized-concept. Asset type: transparent floating cloud for a portfolio website. Primary request: one beautiful broad cumulus cloud cluster, soft sculptural three-dimensional volume, realistic softly sunlit cream-white cloud tops with subtle pale blue shadows underneath. Airy organic irregular silhouette, soft wisps at edges, natural atmospheric texture. Composition: wide horizontal cluster fully contained in frame with generous transparent margin on all sides, no ground, no sky rectangle, no objects, no letters, no border, no watermark. It will drift across a pale blue background behind a realistic red British phone booth. Genuine transparent alpha background, not a checkerboard painted into the image.

### Wisps

Use case: stylized-concept. Asset type: transparent cloud for an animated website sky. Create one long low wispy cloud with two softly rounded cumulus lobes at the left transitioning into delicate windblown wisps to the right. Realistic dimensional natural white and warm ivory vapor, gentle cool blue-gray undersides, diffused sunlight. Horizontal composition with complete silhouette and generous empty transparent margins, no sky, no horizon, no ground, no objects, no text, no border or watermark. Genuine transparent alpha background. Refined tactile photographic cloud texture, airy, not cartoon line art.

### Cabina cerrada

Use case: product-mockup. Asset type: transparent cutout for a 3D interactive contact section on a portfolio. A single beautiful photorealistic miniature classic British K6 red telephone kiosk, full height, three-quarter front view with RIGHT side visible, closed front door, centered and entirely in frame with generous transparent padding. Rich glossy slightly weathered scarlet cast iron, authentic domed crown roof, small gold crown emblem, ivory sign with exact word 'TELEPHONE', finely detailed rectangular glass panes with pale blue sky reflections, subtle metal door handle, realistic pedestal, tiny visible interior vintage black telephone, tactile physical materials. Premium architectural scale model photography, soft warm studio light from upper left, ambient occlusion, realistic depth and dimensional shadows ON THE OBJECT, sharp elegant detail, no cartoon outlines. No ground plane, no environment, no people, no other objects, no watermark. True transparent alpha background. Vertical portrait composition.

### Cabina abierta

Referencia: `public/art/telephone-kiosk.png`.

Use case: precise-object-edit. This is the OPEN state of the same British telephone kiosk for an interactive website. Preserve the identical booth, camera view, size, red paint, roof, signs, right side, lighting and framing. Change ONLY the FRONT DOOR: swing the hinged front door outward to the left by about 70 degrees, visibly revealing the dark interior and vintage telephone inside. Entire opened door must remain in frame. Nothing else changes. True fully transparent background outside the physical booth and open door, no background, no glow, no ground, no people, no added text.

