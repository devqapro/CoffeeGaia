#!/usr/bin/env bash
#
# Publica una imagen del banco en la carpeta que usa la web.
#
# Uso:
#   ./scripts/publicar-imagen.sh "Images/Banco de imagenes/foto.jpg" "hero"
#   ./scripts/publicar-imagen.sh "Images/Banco de imagenes/foto.jpg" "galeria-croissant" 900
#
# El tercer argumento es el ancho máximo en píxeles (opcional, 1800 por defecto).
#
# La web espera DOS archivos por imagen: "nombre.jpg" y "nombre.webp".
# Este script genera los dos. El hero además se publica a 2000 px de ancho
# para que se vea nítido en pantallas grandes.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [ "$#" -lt 2 ]; then
  echo "Uso: $0 \"ruta/de/origen.jpg\" \"nombre-sin-extension\" [ancho-maximo]"
  echo "Ejemplo: $0 \"Images/Banco de imagenes/alt-pan-artesanal.jpg\" \"galeria-croissant\" 900"
  exit 1
fi

ORIGEN="$1"
NOMBRE="$2"
ANCHO="${3:-1800}"
PUB="Images/imagenes publicas"
DEST_JPG="$PUB/$NOMBRE.jpg"
DEST_WEBP="$PUB/$NOMBRE.webp"

if [ ! -f "$ORIGEN" ]; then
  echo "Error: no existe el archivo de origen: $ORIGEN"
  exit 1
fi

if ! command -v convert >/dev/null 2>&1; then
  echo "Error: ImageMagick (convert) no está instalado."
  echo "Instálalo con: sudo apt install imagemagick"
  exit 1
fi

mkdir -p "$PUB"

# JPG de respaldo (para navegadores antiguos)
convert "$ORIGEN" -auto-orient -resize "${ANCHO}x${ANCHO}>" -strip -quality 82 "$DEST_JPG"

# WebP moderno (mucho más liviano); el ancho se respeta si la foto es más grande
convert "$ORIGEN" -auto-orient -resize "${ANCHO}x${ANCHO}>" -strip -quality 80 "$DEST_WEBP"

echo "Publicadas:"
echo "  $DEST_JPG   ($(du -h "$DEST_JPG" | cut -f1))"
echo "  $DEST_WEBP  ($(du -h "$DEST_WEBP" | cut -f1))"
echo "Recarga la landing con Ctrl/Cmd + Shift + R para ver el cambio."
