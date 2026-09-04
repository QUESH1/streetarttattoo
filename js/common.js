/* ==========================================================================
   STREET ART TATTOO — comportamento compartilhado
   Nav, menu mobile, cursor customizado, scroll reveal, lightbox e helpers
   de placeholder/DOM. Usado pela home (index.html) e pelas páginas de
   artista (artista/<slug>/index.html) — exposto em window.STA para os
   scripts específicos de cada página (main.js / artist.js).
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

  /* ---------------- whatsapp / instagram / address link wiring ---------------- */
  function buildWhatsappUrl(message) {
    const text = encodeURIComponent(message || SITE.whatsappMessage);
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

  window.STA = {
    reduceMotion,
    el,
    placeholderImage,
    observeReveal,
    openLightbox,
    buildWhatsappUrl,
  };
})();
