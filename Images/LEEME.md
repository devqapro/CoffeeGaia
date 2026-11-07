# Imágenes de CoffeeGaia

Esta carpeta centraliza todas las fotografías del proyecto. La web **solo lee** los archivos que están en `imagenes publicas/`; el banco sirve para guardar opciones y material de respaldo.

```
Images/
├── Banco de imagenes/     ← fotos de apoyo, candidatas y versiones grandes (la web NO las usa)
└── imagenes publicas/     ← únicas imágenes que se ven en la landing
```

## Cómo cambiar una imagen

1. Elige la foto nueva (idealmente en formato `.jpg`).
2. Publica con el script, indicando el nombre del espacio **sin extensión**:

```bash
./scripts/publicar-imagen.sh "Images/Banco de imagenes/alt-pan-artesanal.jpg" "galeria-croissant" 900
```

   El script genera automáticamente la versión `.jpg` y la `.webp` optimizada; la web usa WebP cuando el navegador lo soporta y JPG como respaldo.
3. Recarga la página con `Ctrl + Shift + R` (o `Cmd + Shift + R` en Mac) para limpiar la caché.

Si prefieres hacerlo a mano, debes crear **dos archivos** con el mismo nombre: `nombre.jpg` y `nombre.webp`. Solo cambia la extensión en `index.html` si el espacio todavía no usa el par JPG/WebP (el hero ya está configurado así).

## Archivos publicados y su ubicación

| Archivo en `imagenes publicas/` | Dónde aparece | Tamaño sugerido |
| --- | --- | --- |
| `hero.jpg` + `hero.webp` | Fondo de la portada | 2000 px de ancho |
| `historia.jpg` | Sección “Nuestra historia” (vertical) | 1000 × 1250 px |
| `galeria-granos.jpg` | Galería, imagen grande | 1200 × 1200 px |
| `galeria-barra.jpg` | Galería, franja ancha | 1200 × 800 px |
| `galeria-croissant.jpg` | Galería, cuadro | 900 × 900 px |
| `galeria-esquina.jpg` | Galería, cuadro | 900 × 900 px |
| `galeria-latte.jpg` | Galería, franja ancha | 1200 × 800 px |
| `galeria-fachada.jpg` | Galería, franja ancha | 1200 × 800 px |
| `visita.jpg` | Sección “Visítanos” | 1200 × 1000 px |
| `favicon.svg` | Icono de la pestaña del navegador | Vectorial (SVG) |

La web recorta las fotos automáticamente con `object-fit: cover`, así que no necesitan tener exactamente esas medidas: lo importante es que la foto se vea bien en el encuadre central.

## Recomendaciones

- Mantén los nombres de archivo tal cual. La web carga `nombre.webp` y usa `nombre.jpg` como respaldo.
- Usa fotos horizontales para el hero, la galería ancha y “Visítanos”; verticales para “Historia”.
- Intenta que cada imagen pese menos de 400 KB para que la página cargue rápido (el script optimiza solo).
- Formatos publicados: `.jpg` + `.webp`. El SVG solo para el favicon.
- El banco no se publica ni se enlaza desde la web: es tu biblioteca personal para elegir y guardar versiones en alta resolución.
- Las fotos actuales provienen de Unsplash y son de uso libre. Cuando tengas fotos reales del café, reemplázalas manteniendo los mismos nombres.

## Añadir una imagen nueva a la web

1. Guarda la foto en `Images/imagenes publicas/` con un nombre descriptivo, por ejemplo `nueva-foto.jpg`.
2. Abre `index.html` y añade o modifica la etiqueta `<img>` correspondiente:

```html
<img src="Images/imagenes%20publicas/nueva-foto.jpg" alt="Descripción de la foto">
```

3. Si quieres conservar una copia en alta resolución, guárdala también en `Images/Banco de imagenes/`.
