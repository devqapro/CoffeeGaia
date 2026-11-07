/* CoffeeGaia — Google Analytics 4 (opcional)
 *
 * Para activar la analítica:
 *   1. Crea una cuenta en https://analytics.google.com y un servicio tipo "Web".
 *   2. Copia tu ID de medición (empieza con "G-", por ejemplo "G-ABCD1234EF").
 *   3. Pégalo abajo entre las comillas, guarda y vuelve a publicar.
 *
 * Mientras el ID esté vacío, la página no envía datos a ningún servidor.
 */
const GA_MEASUREMENT_ID = "";

if (GA_MEASUREMENT_ID) {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}
