/* ==========================================================================
   STREET ART TATTOO — página de artista
   Lê o slug em <body data-artist-slug>, busca em ARTISTS (data.js) e
   preenche o perfil + os trabalhos (TATTOOS/PIERCINGS filtrados por
   "artist"). Nav, menu, cursor, reveal e lightbox vêm de common.js.
   ========================================================================== */
(function () {
  "use strict";

  const { el, placeholderImage, openLightbox, buildWhatsappUrl } = window.STA;

  const slug = document.body.getAttribute("data-artist-slug");
  const artist = ARTISTS.find((a) => a.slug === slug);

  const nameEl = document.getElementById("artistName");
  const roleEl = document.getElementById("artistRole");
  const specialtiesEl = document.getElementById("artistSpecialties");
  const bioEl = document.getElementById("artistBio");
  const photoEl = document.getElementById("artistPhoto");
  const whatsappEl = document.getElementById("artistWhatsapp");
  const instagramEl = document.getElementById("artistInstagram");
  const ctaEl = document.getElementById("artistCta");
  const worksSection = document.getElementById("trabalhos");
  const worksGrid = document.getElementById("artistWorksGrid");
  const worksEmpty = document.getElementById("artistWorksEmpty");

  if (!artist) {
    document.title = "Artista não encontrado — Street Art Tattoo";
    if (roleEl) roleEl.textContent = "/ Ops";
    if (nameEl) nameEl.textContent = "Artista não encontrado";
    if (bioEl) bioEl.textContent = "Não encontramos esse perfil. Volte para a página de artistas e escolha outro.";
    if (photoEl) photoEl.appendChild(el("img", { src: placeholderImage("Street Art Tattoo", 640, 760), alt: "" }));
    if (ctaEl) ctaEl.hidden = true;
    if (worksSection) worksSection.hidden = true;
    return;
  }

  document.title = `${artist.name} — Street Art Tattoo`;
  const specialtiesSuffix = artist.specialties.length ? ` — ${artist.specialties.join(", ")}` : "";
  const desc = `${artist.name}, ${artist.role} no Street Art Tattoo${specialtiesSuffix}.`;
  const canonicalUrl = `https://quesh1.github.io/streetarttattoo/artista/${artist.slug}/`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", desc);
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) canonicalEl.setAttribute("href", canonicalUrl);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", `${artist.name} — Street Art Tattoo`);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", desc);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);

  if (nameEl) nameEl.textContent = artist.name;
  if (roleEl) roleEl.textContent = `/ ${artist.role}`;
  if (bioEl) bioEl.textContent = artist.bio || "Biografia em breve — em atualização.";
  if (photoEl) {
    photoEl.appendChild(
      el("img", {
        src: artist.photo || placeholderImage(artist.name, 640, 760),
        alt: artist.name,
        loading: "eager",
        decoding: "async",
      })
    );
  }
  if (specialtiesEl) {
    artist.specialties.forEach((s) => specialtiesEl.appendChild(el("span", { class: "artist-tag-pill", text: s })));
  }
  if (whatsappEl) {
    whatsappEl.href = buildWhatsappUrl(`Olá! Vim pelo site e quero agendar com ${artist.name} (${artist.role}).`);
  }
  if (instagramEl) {
    if (artist.instagram) {
      instagramEl.href = artist.instagram;
      instagramEl.hidden = false;
    } else {
      instagramEl.hidden = true;
    }
  }

  const works = TATTOOS.filter((t) => t.artist === artist.slug).concat(
    PIERCINGS.filter((p) => p.artist === artist.slug)
  );

  if (worksGrid) {
    if (!works.length) {
      if (worksEmpty) worksEmpty.hidden = false;
    } else {
      works.forEach((item) => {
        const label = item.category
          ? (CATEGORIES.find((c) => c.id === item.category) || {}).label || item.category
          : item.type;
        const img = el("img", {
          src: item.image || placeholderImage(item.title, 640, 800),
          alt: `${item.title} — ${label}`,
          loading: "lazy",
          decoding: "async",
        });
        const info = el("div", { class: "tile-info" }, [
          el("span", { class: "tile-cat", text: label }),
          el("span", { class: "tile-title", text: item.title }),
        ]);
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
        const tile = el("article", { class: "tile is-shown" }, [frame]);
        const open = () => openLightbox(works, works.indexOf(item));
        frame.addEventListener("click", open);
        frame.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        });
        worksGrid.appendChild(tile);
      });
    }
  }

  /* ---------------- cardápio de perfurações (só existe na página do Thales) ---------------- */
  const menuList = document.getElementById("piercingMenuList");
  if (menuList) {
    PIERCING_MENU.forEach((item) => {
      const price = el(
        "span",
        { class: "menu-price" },
        item.price ? [document.createTextNode(item.price)] : [el("span", { class: "provisional-tag", text: "Valor a confirmar" })]
      );
      const row = el("li", { class: "menu-item" }, [
        el("div", { class: "menu-item-head" }, [
          el("span", { class: "menu-name", text: item.name }),
          el("span", { class: "menu-region", text: item.region }),
        ]),
        price,
      ]);
      const whatsapp = el("a", {
        class: "menu-whatsapp",
        href: buildWhatsappUrl(`Olá! Vim pelo site e quero saber sobre o piercing ${item.name} com o Thales.`),
        target: "_blank",
        rel: "noopener",
        text: "Perguntar no WhatsApp",
      });
      row.appendChild(whatsapp);
      menuList.appendChild(row);
    });
  }

  /* ---------------- catálogo de joias/produtos (só existe na página do Thales) ---------------- */
  const productsGrid = document.getElementById("productsGrid");
  if (productsGrid) {
    PRODUCTS.forEach((product) => {
      const img = el("img", {
        src: product.image || placeholderImage(product.name, 640, 640),
        alt: product.name,
        loading: "lazy",
        decoding: "async",
      });
      const body = el("div", { class: "product-body" }, [
        el("span", { class: "product-name", text: product.name }),
        el("span", { class: "provisional-tag", text: "Informações em atualização" }),
        el("a", {
          class: "btn btn-outline product-whatsapp",
          href: buildWhatsappUrl(`Olá! Vim pelo site e tenho interesse no produto ${product.name}.`),
          target: "_blank",
          rel: "noopener",
          text: "Tenho interesse",
        }),
      ]);
      productsGrid.appendChild(el("article", { class: "product-card" }, [
        el("div", { class: "product-frame" }, [img]),
        body,
      ]));
    });
  }
})();
