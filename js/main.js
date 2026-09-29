/* ============================================================
   Servicios Ópticos Falcón — demo
   ============================================================ */
(function () {
  "use strict";

  const CONFIG = window.FALCON_CONFIG;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  /* ---------- WhatsApp ---------- */
  function waLink(msg) {
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg || "");
  }

  function wireWhatsApp(root) {
    root.querySelectorAll("[data-wa]").forEach(function (el) {
      el.href = waLink(el.dataset.waMsg);
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  /* ---------- Menú móvil ---------- */
  function initNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  /* ---------- Scroll suave de los enlaces internos (#seccion) ----------
     Se hace aquí y no con scroll-behavior en CSS, que desajusta el hero fijo. */
  function initAnchors() {
    document.addEventListener("click", function (e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const target = id.length > 1 && document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.querySelector("[data-nav]").offsetHeight;
      const y = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
      history.pushState(null, "", id);
    });
  }

  /* ---------- Catálogo ---------- */
  const SHAPES = {
    round: '<circle cx="55" cy="40" r="27"/><circle cx="145" cy="40" r="27"/><path d="M82 36 Q100 26 118 36M28 34 L8 30M172 34 L192 30"/>',
    rect: '<rect x="22" y="20" width="62" height="40" rx="7"/><rect x="116" y="20" width="62" height="40" rx="7"/><path d="M84 34 Q100 26 116 34M22 30 L6 27M178 30 L194 27"/>',
    cateye: '<path d="M22 28 Q20 16 40 17 L80 20 Q88 22 86 36 Q84 60 56 60 Q28 60 22 28Z"/><path d="M178 28 Q180 16 160 17 L120 20 Q112 22 114 36 Q116 60 144 60 Q172 60 178 28Z"/><path d="M86 34 Q100 26 114 34"/>',
    aviator: '<path d="M24 24 Q54 14 84 24 Q88 52 66 62 Q38 66 29 46 Q23 34 24 24Z"/><path d="M176 24 Q146 14 116 24 Q112 52 134 62 Q162 66 171 46 Q177 34 176 24Z"/><path d="M84 24 L116 24M84 32 Q100 28 116 32"/>',
    browline: '<path d="M24 30 Q24 60 55 60 Q86 60 86 30M114 30 Q114 60 145 60 Q176 60 176 30"/><path d="M20 27 L88 27M112 27 L180 27M88 30 Q100 24 112 30" stroke-width="7"/>',
    oval: '<ellipse cx="55" cy="40" rx="32" ry="21"/><ellipse cx="145" cy="40" rx="32" ry="21"/><path d="M87 38 Q100 30 113 38M23 36 L6 32M177 36 L194 32"/>',
    lens: '<circle cx="100" cy="40" r="32"/><path d="M80 26 Q88 16 102 14" stroke-width="3" opacity=".7"/>',
    contact: '<path d="M64 50 Q64 20 100 20 Q136 20 136 50 Q100 60 64 50Z"/><path d="M80 32 Q88 25 98 24" stroke-width="3" opacity=".7"/>',
  };

  function placeholderArt(shape) {
    return (
      '<svg viewBox="0 0 200 80" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">' +
      (SHAPES[shape] || SHAPES.round) +
      "</g></svg>"
    );
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function productCard(p, i) {
    const id = "prod-" + p.category + "-" + i;
    const media = p.image
      ? '<img src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.name) + '" loading="lazy">'
      : placeholderArt(p.shape);
    const features = (p.features || [])
      .map(function (f) { return "<li>" + escapeHtml(f) + "</li>"; })
      .join("");
    const msg = "¡Hola! Me interesa " + p.name + " (" + p.detail + "). ¿Está disponible?";

    return (
      '<article class="product' + (p.available ? "" : " is-soldout") + '">' +
        '<div class="product__media">' + media +
          '<span class="tag ' + (p.available ? "tag--ok" : "tag--off") + '">' + (p.available ? "Disponible" : "Agotado") + "</span>" +
        "</div>" +
        '<div class="product__body">' +
          '<p class="product__detail">' + escapeHtml(p.detail) + "</p>" +
          '<h3 class="product__name">' + escapeHtml(p.name) + "</h3>" +
          '<p class="product__price">$' + p.price + ' <span>ref.</span></p>' +
          (p.cashea ? '<p class="product__cashea">Cashea disponible</p>' : "") +
          '<button class="product__toggle" type="button" aria-expanded="false" aria-controls="' + id + '">Ver detalles</button>' +
          '<div class="product__details" id="' + id + '"><div>' +
            "<p>" + escapeHtml(p.benefit) + "</p>" +
            (features ? "<ul>" + features + "</ul>" : "") +
            '<a class="product__cta" data-wa data-wa-msg="' + escapeHtml(msg) + '" href="#">' +
              (p.available ? "Consultar por WhatsApp" : "Avísame cuando llegue") + "</a>" +
          "</div></div>" +
        "</div>" +
      "</article>"
    );
  }

  function initCatalog() {
    const tabsEl = document.querySelector("[data-tabs]");
    const grid = document.querySelector("[data-catalog]");
    const cats = window.CATEGORIES || [];
    const products = window.PRODUCTS || [];
    if (!tabsEl || !grid || !cats.length) return;

    tabsEl.innerHTML = cats
      .map(function (c, i) {
        const count = products.filter(function (p) { return p.category === c.id; }).length;
        return (
          '<button class="tab" role="tab" type="button" id="tab-' + c.id + '" data-cat="' + c.id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
          escapeHtml(c.label) + ' <span class="tab__count">' + count + "</span></button>"
        );
      })
      .join("");

    function render(catId) {
      const items = products.filter(function (p) { return p.category === catId; });
      grid.setAttribute("aria-labelledby", "tab-" + catId);
      grid.innerHTML = items.length
        ? items.map(productCard).join("")
        : '<p class="catalog__empty">Pronto tendremos productos en esta categoría.</p>';
      wireWhatsApp(grid);

      if (!reduceMotion && window.gsap) {
        gsap.fromTo(
          grid.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", clearProps: "transform" }
        );
      }
    }

    function select(btn) {
      tabsEl.querySelectorAll(".tab").forEach(function (t) {
        const on = t === btn;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      render(btn.dataset.cat);
    }

    tabsEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".tab");
      if (btn && btn.getAttribute("aria-selected") !== "true") select(btn);
    });

    // Flechas del teclado entre pestañas
    tabsEl.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const tabs = Array.from(tabsEl.querySelectorAll(".tab"));
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });

    // Fichas expandibles
    grid.addEventListener("click", function (e) {
      const btn = e.target.closest(".product__toggle");
      if (!btn) return;
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.textContent = open ? "Ver detalles" : "Ocultar detalles";
      btn.closest(".product").classList.toggle("is-open", !open);
    });

    render(cats[0].id);
  }

  /* ---------- Cuenta regresiva ---------- */
  function initCountdown() {
    const box = document.querySelector("[data-countdown]");
    if (!box) return;
    const target = new Date(CONFIG.inauguracion).getTime();
    const out = {
      d: box.querySelector('[data-cd="d"]'),
      h: box.querySelector('[data-cd="h"]'),
      m: box.querySelector('[data-cd="m"]'),
    };
    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        box.innerHTML = '<p class="countdown__done">¡Ya abrimos!</p>';
        return;
      }
      out.d.textContent = Math.floor(diff / 86400000);
      out.h.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, "0");
      out.m.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, "0");
      setTimeout(tick, 30000);
    }
    tick();
  }

  /* ---------- Hero: fondo según config ---------- */
  // Devuelve una función setProgress(0..1) para video/fotogramas, o null si es gradiente.
  function setupHeroMedia() {
    const media = document.querySelector("[data-hero-media]");
    const hero = CONFIG.hero || {};

    if (hero.mode === "video") {
      const video = document.createElement("video");
      video.src = (isMobile && hero.video.mobile) || hero.video.desktop;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.className = "hero__video";
      video.addEventListener("error", function () {
        // Si falta el vertical, cae al de escritorio
        if (video.src.indexOf(hero.video.desktop) === -1) video.src = hero.video.desktop;
      });
      media.appendChild(video);
      media.classList.add("has-media");
      return function (p) {
        if (video.duration) video.currentTime = p * (video.duration - 0.05);
      };
    }

    if (hero.mode === "frames") {
      const f = hero.frames;
      const useMobileSet = isMobile && f.mobile.count;
      const set = useMobileSet ? f.mobile : f.desktop;
      if (!set.count) return null;
      // Video horizontal en pantalla vertical: se muestra a lo ancho, sin recortar los lentes.
      const fitWidth = isMobile && !useMobileSet;

      const canvas = document.createElement("canvas");
      canvas.className = "hero__video";
      media.appendChild(canvas);
      media.classList.add("has-media");
      document.querySelector("[data-hero]").classList.add("hero--media");
      const ctx = canvas.getContext("2d");

      const imgs = new Array(set.count);
      function load(i) {
        const img = new Image();
        img.decoding = "async";
        img.onload = function () { if (i === current || !drawn) draw(); };
        img.src = set.path + String(i + 1).padStart(f.pad, "0") + f.ext;
        imgs[i] = img;
      }
      // Primero el fotograma inicial y el final; luego el resto en orden.
      load(0);
      load(set.count - 1);
      for (let i = 1; i < set.count - 1; i++) load(i);

      let current = 0;
      let drawn = false;
      let w = 0, h = 0;

      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.width = Math.round(canvas.clientWidth * dpr);
        h = canvas.height = Math.round(canvas.clientHeight * dpr);
        draw();
      }

      function ready(img) { return img && img.complete && img.naturalWidth; }

      function draw() {
        if (!w) return;
        // Si el fotograma pedido aún no cargó, usa el más cercano anterior.
        let i = current;
        while (i > 0 && !ready(imgs[i])) i--;
        const img = imgs[i];
        if (!ready(img)) return;
        drawn = true;

        const iw = img.naturalWidth, ih = img.naturalHeight;
        let s, x, y;
        if (fitWidth) {
          const g = ctx.createLinearGradient(0, 0, 0, h);
          g.addColorStop(0, f.bgTop);
          g.addColorStop(1, f.bgBottom);
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
          s = (w * 1.2) / iw;              // un poco más ancho: las patillas pueden salir del borde
          x = (w - iw * s) / 2;
          y = h * 0.47 - (ih * s) / 2;
        } else {
          s = Math.max(w / iw, h / ih);
          x = (w - iw * s) / 2;
          y = (h - ih * s) / 2;
        }
        ctx.drawImage(img, x, y, iw * s, ih * s);
      }

      // Scroll → fotograma: el enfoque se reparte en la mayor parte del recorrido
      // y los fotogramas finales (casi quietos) pasan rápido.
      const last = set.count - 1;
      const focusFrame = Math.min(set.focusFrame || f.focusFrame || last, last);
      const focusAt = set.focusAt || f.focusAt || 1;
      function frameFor(p) {
        if (p <= focusAt) return (p / focusAt) * focusFrame;
        return focusFrame + ((p - focusAt) / (1 - focusAt)) * (last - focusFrame);
      }

      window.addEventListener("resize", resize);
      requestAnimationFrame(resize);

      return function (p) {
        const next = Math.round(frameFor(Math.max(0, Math.min(1, p))));
        if (next === current && drawn) return;
        current = next;
        draw();
      };
    }

    return null;
  }

  /* ---------- Animaciones ---------- */
  function initMotion() {
    const hasGsap = window.gsap && window.ScrollTrigger;
    const scrubMedia = setupHeroMedia();

    if (!hasGsap || reduceMotion) {
      document.documentElement.classList.add("no-motion");
      if (scrubMedia) scrubMedia(1);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero: de borroso y claro → nítido y azul rey
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "[data-hero]",
        // Se fija justo debajo del menú, que también queda fijo arriba
        start: function () { return "top " + document.querySelector("[data-nav]").offsetHeight + "px"; },
        end: "+=140%",
        pin: ".hero__stage",
        scrub: 0.6,
        onUpdate: scrubMedia ? function (self) { scrubMedia(self.progress); } : undefined,
      },
    });

    if (scrubMedia) {
      // Con video: el fondo lo pone el video; el texto acompaña con un leve movimiento.
      tl.to("[data-hero-hint]", { opacity: 0, duration: 0.15 }, 0)
        .fromTo(".hero__bottom", { transform: "translateY(12px)" }, { transform: "translateY(0px)" }, 0.5);
    } else {
      // Sin video: de borroso y claro → nítido y azul rey
      tl.to("[data-hero-blur]", { opacity: 0, scale: 1.25 }, 0)
        .fromTo("[data-hero-sharp]", { opacity: 0 }, { opacity: 1 }, 0.1)
        .fromTo(".ring", { scale: 0.7 }, { scale: 1, stagger: 0.05 }, 0.1)
        .fromTo(".hero__glasses path[pathLength]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.04 }, 0)
        .fromTo(".hero__glasses", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1 }, 0)
        .fromTo(".hero__lens-fill", { opacity: 0 }, { opacity: 1 }, 0.45)
        .to("[data-hero-content]", { color: "#FFFFFF" }, 0.25)
        .to(".hero__content .btn--ghost", { color: "#FFFFFF", borderColor: "rgba(255,255,255,.6)" }, 0.25)
        .to(".hero__content .btn--primary", { backgroundColor: "#FFFFFF", color: "#0B1293" }, 0.25)
        .to("[data-hero-glasses]", { color: "#FFFFFF" }, 0.25)
        .to("[data-hero-hint]", { opacity: 0 }, 0);
    }

    // Aparición suave de secciones
    gsap.utils.toArray(".section-head, .service, .steps li, .contact__list > div, .promo__inner > *").forEach(function (el) {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }

  /* ---------- Arranque ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
  wireWhatsApp(document);
  initNav();
  initAnchors();
  initCatalog();
  initCountdown();
  initMotion();
})();
