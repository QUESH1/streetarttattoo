/* ==========================================================================
   STREET ART TATTOO — comportamento da home
   Filtros de portfólio, colapso "ver mais" no mobile, render dos dados
   (data.js), grid de artistas, vídeo do hero e lazy-load do vídeo de
   bastidores. Nav, menu, cursor, reveal e lightbox ficam em common.js
   (compartilhado com as páginas de artista).
   ========================================================================== */
(function () {
  "use strict";

  const { el, placeholderImage, observeReveal, openLightbox } = window.STA;

  /* ---------------- hero video autoplay reforçado (mobile) ----------------
     O atributo autoplay+muted+playsinline já cobre a maioria dos navegadores,
     mas em vários browsers mobile (Safari iOS, WebViews Android) o autoplay
     nativo falha silenciosamente ou o vídeo é pausado pelo sistema ao trocar
     de app/aba e não retoma sozinho. Forçamos o play() via JS e reagimos a
     esses eventos para o vídeo nunca ficar "congelado" na primeira tela. */
  const heroVideoEl = document.querySelector(".hero-video");
  if (heroVideoEl) {
    const tryPlayHero = () => {
      heroVideoEl.muted = true;
      const p = heroVideoEl.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlayHero();
    heroVideoEl.addEventListener("loadeddata", tryPlayHero);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && heroVideoEl.paused) tryPlayHero();
    });
    window.addEventListener("pageshow", () => {
      if (heroVideoEl.paused) tryPlayHero();
    });
  }

  /* ---------------- hero video subtle parallax ---------------- */
  const heroVideo = document.querySelector(".hero-video");
  const hero = document.querySelector(".hero");
  if (heroVideo && hero && !window.STA.reduceMotion) {
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

  /* ---------------- mobile "ver mais" grid collapse ----------------
     No mobile, mostra sempre pelo menos minItems itens inteiros e corta o
     resto com blur + botão "Ver Mais" (ver CSS) — a altura de corte é
     calculada a partir da posição real do item minItems (não um valor fixo
     em px), então continua mostrando pelo menos minItems itens completos
     em qualquer tamanho de tela. Uma vez expandido pelo usuário, fica
     expandido (não recolhe de novo sozinho). */
  const collapseMQ = window.matchMedia("(max-width: 640px)");
  let portfolioCollapse = null;
  let piercingCollapse = null;
  function setupGridCollapse(wrapId, btnId, minItems) {
    const wrap = document.getElementById(wrapId);
    const btn = document.getElementById(btnId);
    const grid = wrap && wrap.firstElementChild;
    if (!wrap || !btn || !grid) return null;
    let expanded = false;
    function evaluate() {
      if (expanded || !collapseMQ.matches) {
        wrap.classList.remove("is-collapsed");
        return;
      }
      wrap.classList.remove("is-collapsed");
      const items = Array.from(grid.children).filter((c) => !c.classList.contains("is-hidden"));
      if (items.length <= minItems) return;
      const nth = items[minItems - 1];
      const limit = nth.offsetTop + nth.offsetHeight;
      wrap.style.setProperty("--collapse-h", limit + "px");
      wrap.classList.toggle("is-collapsed", grid.scrollHeight > limit + 40);
    }
    btn.addEventListener("click", () => {
      expanded = true;
      wrap.classList.remove("is-collapsed");
    });
    collapseMQ.addEventListener("change", () => {
      expanded = false;
      evaluate();
    });
    window.addEventListener("resize", evaluate, { passive: true });
    evaluate();
    return { evaluate };
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
    if (portfolioCollapse) portfolioCollapse.evaluate();
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

  /* ---------------- artistas grid ---------------- */
  const artistsGrid = document.getElementById("artistsGrid");
  function renderArtists() {
    if (!artistsGrid) return;
    ARTISTS.forEach((artist) => {
      const img = el("img", {
        src: artist.photo || placeholderImage(artist.name, 640, 760),
        alt: artist.name,
        loading: "lazy",
        decoding: "async",
      });
      const info = el("div", { class: "artist-body" }, [
        el("span", { class: "artist-role", text: artist.role }),
        el("span", { class: "artist-name", text: artist.name }),
      ]);
      const card = el(
        "a",
        {
          class: "artist-card reveal",
          href: `artista/${artist.slug}/`,
          "data-cursor": "Ver Perfil",
        },
        [el("div", { class: "artist-frame" }, [img, el("div", { class: "artist-shade" })]), info]
      );
      artistsGrid.appendChild(card);
    });
    observeReveal(artistsGrid.querySelectorAll(".artist-card"));
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

  /* ---------------- lazy-load + play the bastidores video ----------------
     Um único observer: na primeira vez que o vídeo entra em tela, troca a
     fonte e só chama play() quando o vídeo sinaliza que já tem dados pra
     reproduzir (evento loadeddata) — chamar play() antes disso falha
     silenciosamente e só "resolve" numa rolagem seguinte. */
  const experienceVideo = document.getElementById("experienceVideo");
  let experienceVisible = false;
  if (experienceVideo) {
    const sources = experienceVideo.querySelectorAll("source[data-src]");
    let sourceLoaded = false;

    const tryPlay = () => experienceVideo.play().catch(() => {});

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            experienceVisible = false;
            experienceVideo.pause();
            return;
          }
          experienceVisible = true;
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

  /* ---------------- destrava autoplay dos vídeos de fundo no iOS ----------------
     Com o Modo de Baixo Consumo ativo, o iOS bloqueia autoplay (mesmo mudo)
     até um gesto real do usuário — e cada vídeo pode precisar do seu próprio
     gesto, não só o primeiro da página inteira (o hero pode já ter "gasto"
     o primeiro toque antes do vídeo de bastidores sequer entrar em tela).
     Por isso o listener fica ativo a cada interação, não só uma vez. */
  function resumeBackgroundVideos() {
    if (heroVideoEl && heroVideoEl.paused) {
      heroVideoEl.muted = true;
      heroVideoEl.play().catch(() => {});
    }
    if (experienceVideo && experienceVisible && experienceVideo.paused) {
      experienceVideo.play().catch(() => {});
    }
  }
  ["touchstart", "touchend", "click", "scroll", "keydown"].forEach((evt) =>
    document.addEventListener(evt, resumeBackgroundVideos, { passive: true })
  );

  /* ---------------- init ---------------- */
  renderFilters();
  renderPortfolio();
  renderPiercing();
  renderArtists();
  renderGallery();
  renderInstagram();
  portfolioCollapse = setupGridCollapse("portfolioGridWrap", "portfolioMoreBtn", 3);
  piercingCollapse = setupGridCollapse("piercingGridWrap", "piercingMoreBtn", 3);
})();
