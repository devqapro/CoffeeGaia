# CoffeeGaia — Landing page

Landing page de una cafetería de especialidad. Sitio estático, sin dependencias ni paso de build: HTML, CSS y JavaScript puro.

## Estructura

```
landing page/
├── index.html                  # Portada con todas las secciones
├── menu.html                   # Carta completa (cafés, fríos, repostería, grano)
├── styles.css                  # Sistema visual, layout y responsive
├── script.js                   # Menú móvil, pestañas, animaciones y formularios
├── analytics.js                # Google Analytics (se activa con tu ID)
├── sitemap.xml / robots.txt    # SEO
├── .github/workflows/deploy.yml # Publica automáticamente en GitHub Pages
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
- Formularios preparados para Web3Forms/Formspree (ver abajo): validan y confirman sin backend.
- Navegación accesible: skip link, foco visible, `aria-*` en pestañas, menú móvil y formularios.
- Mapa de Google integrado en "Visítanos" y botón flotante de WhatsApp.

## Publicar en internet (GitHub Pages)

El repo incluye un flujo de despliegue automático (`.github/workflows/deploy.yml`).
Cada vez que hagas `git push` a `main`, el sitio se publica en:

```
https://devqapro.github.io/CoffeeGaia/
```

Para activarlo la primera vez:

1. Crea el repositorio en GitHub (privado u público) y súbelo:

   ```bash
   cd "landing page"
   git remote add origin https://github.com/devqapro/CoffeeGaia.git
   git push -u origin main
   ```

2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Espera a que termine el workflow (pestaña **Actions**) y abre la URL.

Tras publicar, revisa que la URL de arriba sea correcta y actualízala en
`sitemap.xml`, `robots.txt` y en las etiquetas `canonical` de los HTML si cambia.

## Recibir reservas en tu correo

Los formularios ya validan y confirman, pero no envían nada hasta que conectes
un servicio. Con Web3Forms (gratis):

1. Entra a [web3forms.com](https://web3forms.com), escribe tu correo y recibe la **access key**.
2. Abre `script.js`, busca `FORM_ENDPOINTS` (está al inicio de la sección de formularios) y déjalo así:

   ```js
   const FORM_ENDPOINTS = {
     reserva: "https://api.web3forms.com/submit",
     newsletter: "https://api.web3forms.com/submit",
   };
   ```

3. Añade tu clave como campo oculto en los dos formularios (`index.html` y `menu.html`):

   ```html
   <input type="hidden" name="access_key" value="TU-CLAVE-DE-WEB3FORMS">
   ```

4. Haz commit y push: el despliegue se publica solo.

## Analítica (Google Analytics 4)

El sitio no mide nada hasta que lo actives:

1. Crea una cuenta en [analytics.google.com](https://analytics.google.com) y un servicio "Web".
2. Copia tu ID de medición (empieza con `G-`).
3. Pégalo en `analytics.js`, en la constante `GA_MEASUREMENT_ID`, y publica.

## Personalizar más

- **WhatsApp:** cambia el número en el enlace `wa.me` de `index.html` y `menu.html`.
- **Marca:** busca `CoffeeGaia` en los HTML y en el logo SVG.
- **Colores:** variables en `:root` al inicio de `styles.css`.
- **Contenido del menú:** edita los `li.menu-item` en `menu.html` (carta completa) y en `index.html` (resumen).
- **Dirección, horarios y teléfono:** sección `#visitanos`, footer y el dato estructurado JSON-LD en `index.html`.
- **Imágenes:** consulta [`Images/LEEME.md`](Images/LEEME.md) antes de reemplazarlas.
