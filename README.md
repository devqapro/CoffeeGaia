# CoffeeGaia — Landing page

Landing page de una cafetería de especialidad. Sitio estático, sin dependencias ni paso de build: HTML, CSS y JavaScript puro.

## Estructura

```
landing page/
├── index.html                  # Contenido y secciones de la página
├── styles.css                  # Sistema visual, layout y responsive
├── script.js                   # Menú móvil, pestañas, animaciones y formularios
├── Images/
│   ├── Banco de imagenes/      # Biblioteca de fotos (la web NO las usa)
│   ├── imagenes publicas/      # Únicas imágenes que se ven en la web
│   └── LEEME.md                # Guía del banco de imágenes
├── scripts/
│   └── publicar-imagen.sh      # Publica una foto del banco en la web
├── .gitignore
└── README.md
```

## Imágenes

Todas las fotos viven en la carpeta `Images/`, separadas en dos zonas:

- **`Images/Banco de imagenes/`**: biblioteca personal con fotos candidatas y versiones en alta resolución. La web nunca lee esta carpeta.
- **`Images/imagenes publicas/`**: las únicas imágenes que carga la landing. Cada archivo tiene un nombre fijo (`hero.jpg`, `historia.jpg`, etc.).

Para cambiar una foto, reemplaza el archivo dentro de `imagenes publicas/` por otro con el mismo nombre y recarga con `Ctrl/Cmd + Shift + R`. También puedes publicar una imagen del banco con:

```bash
./scripts/publicar-imagen.sh "Images/Banco de imagenes/alt-pan-artesanal.jpg" "galeria-croissant.jpg"
```

La guía completa, con nombres, tamaños recomendados y cómo añadir nuevos espacios, está en [`Images/LEEME.md`](Images/LEEME.md).

## Cómo verla

Abre `index.html` directamente en el navegador o levanta un servidor local:

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node
npx serve .
```

Luego visita `http://localhost:8000`.

## Secciones

- **Hero** con imagen a pantalla completa y llamados a la acción.
- **Historia** con estadísticas de la marca.
- **Menú** con pestañas (cafés, fríos y repostería).
- **Proceso** de origen a taza.
- **Galería** del espacio.
- **Testimonios** de clientes.
- **Visítanos** con dirección, horarios y formulario de reserva.
- **Newsletter** y footer.

## Detalles de implementación

- Tipografías: Fraunces (display) e Inter (texto) desde Google Fonts.
- Imágenes locales servidas desde `Images/imagenes publicas/` (sin dependencias externas).
- Animaciones con `IntersectionObserver` y respeto a `prefers-reduced-motion`.
- Formularios demostrativos: validan y muestran confirmación, pero no envían datos a ningún backend.
- Navegación accesible: skip link, foco visible, `aria-*` en pestañas, menú móvil y formularios.

## Personalizar

- **Marca:** busca `CoffeeGaia` en `index.html` y en el logo SVG.
- **Colores:** variables en `:root` al inicio de `styles.css`.
- **Contenido del menú:** edita los `li.menu-item` de cada panel en `index.html`.
- **Dirección, horarios y teléfono:** sección `#visitanos` y footer.
- **Imágenes:** consulta [`Images/LEEME.md`](Images/LEEME.md) antes de reemplazarlas.
