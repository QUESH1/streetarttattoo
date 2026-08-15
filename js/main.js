/* ==========================================================================
   STREET ART TATTOO — comportamento
   Nav, menu mobile, cursor customizado, scroll reveal, filtros de portfólio,
   lightbox, render dos dados (data.js) e lazy-load de vídeo.
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- nav scroll state ---------------- */
  const nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  if (nav) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- mobile fullscreen menu ---------------- */
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuClose = document.getElementById("mobileMenuClose");

  function openMenu() {
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    menuClose && menuClose.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) closeMenu();
    });
  }

  /* ---------------- scroll reveal ---------------- */
  function observeReveal(nodeList) {
    const nodes = Array.from(nodeList);
    if (!("IntersectionObserver" in window) || reduceMotion) {
      nodes.forEach((n) => n.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
  }
  observeReveal(document.querySelectorAll(".reveal"));

  /* ---------------- custom cursor (desktop, fine pointer only) ---------------- */
  const cursor = document.getElementById("cursorLabel");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (cursor && canHover && !reduceMotion) {
    let raf = null;
    let x = 0;
    let y = 0;
    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          raf = null;
        });
      }
    });
    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        cursor.textContent = target.getAttribute("data-cursor");
        cursor.classList.add("is-visible");
      } else {
        cursor.classList.remove("is-visible");
      }
    });
    document.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));
  }

  /* ---------------- hero video subtle parallax ---------------- */
  const heroVideo = document.querySelector(".hero-video");
  const hero = document.querySelector(".hero");
  if (heroVideo && hero && !reduceMotion) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
          heroVideo.style.transform = `translateY(${progress * 44}px) scale(1.03)`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* ---------------- placeholder art (used until real photos are added) ---------------- */
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
  function escapeXML(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function placeholderImage(label, w, h) {
    w = w || 800;
    h = h || 1000;
    const rotations = [-6, -3, 2, 4, -8, 6, -2, 5];
    const rot = rotations[Math.abs(hashCode(label)) % rotations.length];
    const safeLabel = escapeXML(String(label).toUpperCase());
    const fontSize = Math.round(w * 0.095);
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2825"/><stop offset="1" stop-color="#171615"/></linearGradient>` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"/></filter></defs>` +
      `<rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" filter="url(#n)"/>` +
      `<g transform="translate(${w / 2} ${h / 2}) rotate(${rot})"><text text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${fontSize}" fill="#3a3733" letter-spacing="2">${safeLabel}</text></g>` +
      `<rect x="${w - 132}" y="${h - 58}" width="112" height="32" rx="16" fill="#e0a93c"/>` +
      `<text x="${w - 76}" y="${h - 42}" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="12" fill="#171104" letter-spacing="1">EM BREVE</text>` +
      `</svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  /* ---------------- tiny DOM helper ---------------- */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach((k) => {
      if (k === "class") node.className = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }

  /* ---------------- filter bar + portfolio grid ---------------- */
  const filterBar = document.getElementById("filterBar");
  const portfolioGrid = document.getElementById("portfolioGrid");

  function renderFilters() {
    if (!filterBar) return;
    CATEGORIES.forEach((cat) => {
      const btn = el("button", {
        class: "filter-btn" + (cat.id === "todos" ? " is-active" : ""),
        type: "button",
        "aria-pressed": cat.id === "todos" ? "true" : "false",
        "data-filter": cat.id,
        text: cat.label,
      });
      btn.addEventListener("click", () => applyFilter(cat.id));
      filterBar.appendChild(btn);
    });
  }

  function applyFilter(id) {
    filterBar.querySelectorAll(".filter-btn").forEach((b) => {
      const match = b.dataset.filter === id;
      b.classList.toggle("is-active", match);
      b.setAttribute("aria-pressed", match ? "true" : "false");
    });
    portfolioGrid.querySelectorAll(".tile").forEach((tile) => {
      const show = id === "todos" || tile.dataset.category === id;
      tile.classList.toggle("is-hidden", !show);
      if (show) tile.classList.add("is-shown");
    });
  }

  function renderPortfolio() {
    if (!portfolioGrid) return;
    TATTOOS.forEach((item) => {
      const catLabel = (CATEGORIES.find((c) => c.id === item.category) || {}).label || item.category;
      const img = el("img", {
        src: item.image || placeholderImage(item.title, 640, 800),
        alt: `${item.title} — ${catLabel}`,
        loading: "lazy",
        decoding: "async",
      });
      const info = el(
        "div",
        { class: "tile-info" },
        [el("span", { class: "tile-cat", text: catLabel }), el("span", { class: "tile-title", text: item.title })]
      );
      const frame = el(
        "div",
        {
          class: "tile-frame",
          tabindex: "0",
          role: "button",
          "aria-label": `Ver ${item.title}`,
          "data-cursor": "View",
        },
        [img, el("div", { class: "tile-shade" }), info]
      );
      const tile = el("article", { class: "tile is-shown", "data-category": item.category }, [frame]);
      const open = () => openLightbox(TATTOOS, TATTOOS.indexOf(item));
      frame.addEventListener("click", open);
      frame.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
      portfolioGrid.appendChild(tile);
    });
  }

  /* ---------------- piercing grid ---------------- */
  const piercingGrid = document.getElementById("piercingGrid");
  function renderPiercing() {
    if (!piercingGrid) return;
    PIERCINGS.forEach((item) => {
      const frame = el("div", { class: "p-frame" }, [
        el("img", {
          src: item.image || placeholderImage(item.title, 700, 700),
          alt: item.title,
          loading: "lazy",
          decoding: "async",
        }),
      ]);
      const body = el("div", { class: "p-body" }, [
        el("span", { class: "p-title", text: item.title }),
        el("span", { class: "p-type", text: item.type }),
        el("p", { class: "p-desc", text: item.description }),
      ]);
      piercingGrid.appendChild(el("article", { class: "p-card reveal" }, [frame, body]));
    });
    observeReveal(piercingGrid.querySelectorAll(".p-card"));
  }

  /* ---------------- studio gallery ---------------- */
  const galleryGrid = document.getElementById("galleryGrid");
  function renderGallery() {
    if (!galleryGrid) return;
    const photos = GALLERY.filter((g) => g.type === "photo");
    GALLERY.forEach((item, i) => {
      const wide = i % 5 === 0;
      const img = el("img", {
        src: item.image || placeholderImage(item.title, 800, wide ? 500 : 1000),
        alt: item.title,
        loading: "lazy",
        decoding: "async",
      });
      const wrap = el(
        "div",
        {
          class: "g-item reveal" + (wide ? " is-wide" : ""),
          "data-cursor": "View",
          tabindex: "0",
          role: "button",
          "aria-label": `Ver ${item.title}`,
        },
        [img]
      );
      const open = () => openLightbox(photos, photos.indexOf(item));
      wrap.addEventListener("click", open);
      wrap.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
      galleryGrid.appendChild(wrap);
    });
    observeReveal(galleryGrid.querySelectorAll(".g-item"));
  }

  /* ---------------- instagram grid ---------------- */
  const instagramGrid = document.getElementById("instagramGrid");
  function renderInstagram() {
    if (!instagramGrid) return;
    INSTAGRAM_POSTS.forEach((post) => {
      const a = el("a", {
        class: "ig-item reveal",
        href: SITE.instagramUrl,
        target: "_blank",
        rel: "noopener",
        "aria-label": post.caption,
      });
      a.appendChild(
        el("img", {
          src: post.image || placeholderImage("Instagram", 600, 600),
          alt: post.caption,
          loading: "lazy",
          decoding: "async",
        })
      );
      instagramGrid.appendChild(a);
    });
    observeReveal(instagramGrid.querySelectorAll(".ig-item"));
  }

  /* ---------------- lightbox ---------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lastFocused = null;

  function openLightbox(items, index) {
    if (!lightbox || !items.length) return;
    lightboxItems = items;
    lightboxIndex = index;
    lastFocused = document.activeElement;
    showLightboxItem();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
    document.addEventListener("keydown", onLightboxKey);
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onLightboxKey);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }
  function showLightboxItem() {
    const item = lightboxItems[lightboxIndex];
    if (!item) return;
    lightboxImg.src = item.image || placeholderImage(item.title, 900, 1125);
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description || "";
    const multi = lightboxItems.length > 1;
    lightboxPrev.style.display = multi ? "" : "none";
    lightboxNext.style.display = multi ? "" : "none";
  }
  function onLightboxKey(e) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") {
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      showLightboxItem();
    }
    if (e.key === "ArrowLeft") {
      lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      showLightboxItem();
    }
  }
  if (lightbox) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", () => {
      lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      showLightboxItem();
    });
    lightboxNext.addEventListener("click", () => {
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      showLightboxItem();
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ---------------- lazy-load + play the bastidores video ----------------
     Um único observer: na primeira vez que o vídeo entra em tela, troca a
     fonte e só chama play() quando o vídeo sinaliza que já tem dados pra
     reproduzir (evento loadeddata) — chamar play() antes disso falha
     silenciosamente e só "resolve" numa rolagem seguinte. */
  const experienceVideo = document.getElementById("experienceVideo");
  if (experienceVideo) {
    const sources = experienceVideo.querySelectorAll("source[data-src]");
    let sourceLoaded = false;

    const tryPlay = () => experienceVideo.play().catch(() => {});

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            experienceVideo.pause();
            return;
          }
          if (sourceLoaded) {
            tryPlay();
            return;
          }
          sourceLoaded = true;
          sources.forEach((s) => {
            s.src = s.getAttribute("data-src");
          });
          experienceVideo.addEventListener("loadeddata", tryPlay, { once: true });
          experienceVideo.load();
        });
      },
      { threshold: 0.15 }
    );
    io.observe(experienceVideo);
  }

  /* ---------------- whatsapp / instagram link wiring ---------------- */
  function buildWhatsappUrl() {
    const text = encodeURIComponent(SITE.whatsappMessage);
    return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
  }
  document.querySelectorAll("[data-whatsapp]").forEach((a) => {
    a.href = buildWhatsappUrl();
  });
  document.querySelectorAll("[data-instagram]").forEach((a) => {
    a.href = SITE.instagramUrl;
  });
  document.querySelectorAll("[data-address-link]").forEach((a) => {
    a.href = SITE.address.mapsUrl;
    a.textContent = SITE.address.full;
  });

  /* ---------------- init ---------------- */
  renderFilters();
  renderPortfolio();
  renderPiercing();
  renderGallery();
  renderInstagram();
})();
