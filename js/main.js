/* ==========================================================================
   STREET ART TATTOO — comportamento da home
   Colapso "ver mais" no mobile, render dos dados (data.js), grid de
   artistas, destaque de piercing/Thales, eventos, vídeo do hero e
   lazy-load do vídeo de bastidores. Nav, menu, cursor, reveal e lightbox
   ficam em common.js (compartilhado com as páginas de artista). O
   portfólio geral de tatuagens não existe mais aqui: cada artista mostra
   seus próprios trabalhos na página dele (ver js/artist.js).
   ========================================================================== */
(function () {
  "use strict";

  const { el, placeholderImage, observeReveal, openLightbox, buildWhatsappUrl } = window.STA;

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
     em qualquer tamanho de tela. A altura do degradê (--fade-h, mesmo valor
     do CSS) entra somada por cima, então o corte só desfoca o item
     SEGUINTE aos minItems garantidos — os minItems ficam sempre 100%
     nítidos, nunca com o rodapé cortado pelo blur. Uma vez expandido pelo
     usuário, fica expandido (não recolhe de novo sozinho). */
  const collapseMQ = window.matchMedia("(max-width: 640px)");
  const FADE_H = 190; // precisa bater com a altura de .grid-fade no CSS
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
      const limit = nth.offsetTop + nth.offsetHeight + FADE_H;
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

  /* ---------------- piercing spotlight (Thales) ---------------- */
  function renderPiercingSpotlight() {
    const photoEl = document.getElementById("piercingSpotlightPhoto");
    const nameEl = document.getElementById("piercingSpotlightName");
    const whatsappEl = document.getElementById("piercingSpotlightWhatsapp");
    if (!photoEl && !nameEl && !whatsappEl) return;
    const thales = ARTISTS.find((a) => a.slug === "thales");
    if (!thales) return;
    if (photoEl) {
      photoEl.appendChild(
        el("img", {
          src: thales.photo || placeholderImage(thales.name, 640, 760),
          alt: thales.name,
          loading: "lazy",
          decoding: "async",
        })
      );
    }
    if (nameEl) nameEl.textContent = thales.name;
    if (whatsappEl) {
      whatsappEl.href = buildWhatsappUrl(`Olá! Vim pelo site e gostaria de saber sobre piercing com o ${thales.name}.`);
    }
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

  /* ---------------- eventos realizados ---------------- */
  const eventsGrid = document.getElementById("eventsGrid");
  function renderEvents() {
    if (!eventsGrid) return;
    EVENTS.forEach((item) => {
      const img = el("img", {
        src: item.image || placeholderImage(item.title, 640, 640),
        alt: item.title,
        loading: "lazy",
        decoding: "async",
      });
      const body = el("div", { class: "event-body" }, [
        el("span", { class: "event-type", text: item.type }),
        el("span", { class: "event-title", text: item.title }),
        el("span", { class: "provisional-tag", text: "Conteúdo provisório" }),
      ]);
      const frame = el(
        "div",
        {
          class: "event-frame",
          tabindex: "0",
          role: "button",
          "aria-label": `Ver ${item.title}`,
          "data-cursor": "View",
        },
        [img, el("div", { class: "event-shade" })]
      );
      const card = el("article", { class: "event-card reveal" }, [frame, body]);
      const open = () => openLightbox(EVENTS, EVENTS.indexOf(item));
      frame.addEventListener("click", open);
      frame.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
      eventsGrid.appendChild(card);
    });
    observeReveal(eventsGrid.querySelectorAll(".event-card"));
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
  renderPiercingSpotlight();
  renderPiercing();
  renderArtists();
  renderGallery();
  renderEvents();
  renderInstagram();
  setupGridCollapse("piercingGridWrap", "piercingMoreBtn", 3);
  setupGridCollapse("eventsGridWrap", "eventsMoreBtn", 3);
})();
