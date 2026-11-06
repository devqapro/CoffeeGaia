/* CoffeeGaia — interacciones de la landing */
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /* Año actual                                                          */
  /* ------------------------------------------------------------------ */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /* Header con fondo al hacer scroll                                    */
  /* ------------------------------------------------------------------ */
  const header = $("#header");
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ------------------------------------------------------------------ */
  /* Menú móvil                                                          */
  /* ------------------------------------------------------------------ */
  const navToggle = $(".nav-toggle");
  const mobileNav = $("#mobile-nav");
  const body = document.body;
  let isMenuOpen = false;

  const setMenu = (open) => {
    if (!navToggle || !mobileNav) return;
    isMenuOpen = open;

    mobileNav.classList.toggle("is-open", open);
    body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => setMenu(!isMenuOpen));
  }

  if (mobileNav) {
    $$("a", mobileNav).forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen) setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980 && isMenuOpen) setMenu(false);
  });

  /* ------------------------------------------------------------------ */
  /* Pestañas del menú                                                   */
  /* ------------------------------------------------------------------ */
  const tabs = $$(".tab");
  const panels = $$(".menu-panel");

  const activateTab = (tab) => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));

    tab.addEventListener("keydown", (event) => {
      let next = null;
      if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === "Home") next = tabs[0];
      if (event.key === "End") next = tabs[tabs.length - 1];

      if (next) {
        event.preventDefault();
        next.focus();
        activateTab(next);
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /* Aparición de elementos al hacer scroll                              */
  /* ------------------------------------------------------------------ */
  const revealEls = $$(".reveal");
  const heroReveals = $$(".hero .reveal");
  const revealRest = revealEls.filter((el) => !heroReveals.includes(el));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    // El hero siempre entra al cargar, sin depender del observer.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroReveals.forEach((el) => el.classList.add("is-visible"));
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -50px 0px" }
    );

    revealRest.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /* Scrollspy: resalta la sección visible en la navegación              */
  /* ------------------------------------------------------------------ */
  const navLinks = $$(".main-nav a");
  const sections = navLinks
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const match = link.getAttribute("href") === `#${entry.target.id}`;
            if (match) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => spy.observe(section));
  }

  /* ------------------------------------------------------------------ */
  /* Formularios (demo, sin backend)                                     */
  /* ------------------------------------------------------------------ */
  const showMessage = (form, text) => {
    const message = $(".form-msg", form);
    if (!message) return;
    message.textContent = text;
    message.classList.add("is-visible");

    window.clearTimeout(form._messageTimer);
    form._messageTimer = window.setTimeout(() => {
      message.classList.remove("is-visible");
    }, 7000);
  };

  const localISODate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().split("T")[0];
  };

  const bookingForm = $("#booking-form");
  if (bookingForm) {
    const dateInput = $("#fecha", bookingForm);
    if (dateInput) dateInput.min = localISODate();

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const name = $("#nombre", bookingForm).value.trim();
      showMessage(
        bookingForm,
        `¡Listo, ${name || "gracias"}! Te escribiremos para confirmar tu mesa.`
      );
      bookingForm.reset();
      if (dateInput) dateInput.min = localISODate();
      $("#hora", bookingForm).value = "10:00";
    });
  }

  const newsletterForm = $("#newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!newsletterForm.checkValidity()) {
        newsletterForm.reportValidity();
        return;
      }

      const wrapper = newsletterForm.closest(".news-letter");
      const message = wrapper ? $(".form-msg", wrapper) : null;
      if (message) {
        message.textContent = "¡Bienvenido a la mesa! Revisa tu correo para confirmar.";
        message.classList.add("is-visible");
        window.setTimeout(() => message.classList.remove("is-visible"), 7000);
      }
      newsletterForm.reset();
    });
  }
})();
