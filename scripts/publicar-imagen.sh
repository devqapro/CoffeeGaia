#!/usr/bin/env bash
#
# Publica una imagen del banco en la carpeta que usa la web.
#
# Uso:
#   ./scripts/publicar-imagen.sh "Images/Banco de imagenes/foto.jpg" "hero.jpg"
#   ./scripts/publicar-imagen.sh "Images/Banco de imagenes/foto.jpg" "hero.jpg" 2200
#
# El tercer argumento es el ancho máximo en píxeles (opcional, 1800 por defecto).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [ "$#" -lt 2 ]; then
  echo "Uso: $0 \"ruta/de/origen.jpg\" \"nombre-en-la-web.jpg\" [ancho-maximo]"
  echo "Ejemplo: $0 \"Images/Banco de imagenes/alt-pan-artesanal.jpg\" \"galeria-croissant.jpg\""
  exit 1
fi

ORIGEN="$1"
SLOT="$2"
ANCHO="${3:-1800}"
DESTINO="Images/imagenes publicas/$SLOT"

if [ ! -f "$ORIGEN" ]; then
  echo "Error: no existe el archivo de origen: $ORIGEN"
  exit 1
fi

mkdir -p "Images/imagenes publicas"

if command -v convert >/dev/null 2>&1; then
  convert "$ORIGEN" -auto-orient -resize "${ANCHO}x${ANCHO}>" -strip -quality 82 "$DESTINO"
  echo "Imagen publicada y optimizada: $DESTINO"
else
  cp "$ORIGEN" "$DESTINO"
  echo "Imagen publicada (sin optimizar; ImageMagick no está instalado): $DESTINO"
fi

echo "Recarga la landing con Ctrl/Cmd + Shift + R para ver el cambio."
