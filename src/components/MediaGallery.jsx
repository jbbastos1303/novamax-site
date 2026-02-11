// src/components/MediaGallery.jsx
import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import styles from "../pages/galeria.module.css";

/* Seções e ordem */
const SECTIONS = [
  {
    key: "frota",
    title: "Frota",
    subtitle:
      "A Nova Max opera com frota própria de caminhões e equipamentos pesados, preparada para atender obras de infraestrutura de diferentes portes e complexidades. Os equipamentos passam por manutenção constante e são operados por profissionais qualificados, garantindo produtividade, segurança e confiabilidade em todas as etapas do projeto."
  },
  {
    key: "obra",
    title: "Obras",
    subtitle:
      "Cada obra executada pela Nova Max reflete planejamento, capacidade operacional e compromisso com resultados. Atuamos em projetos de terraplenagem, drenagem, pavimentação e logística pesada, com controle técnico, equipe qualificada e frota própria."
  },
  {
    key: "equipe",
    title: "Equipe",
    subtitle:
      "A força da Nova Max está nas pessoas. A equipe técnica e operacional atua diretamente em campo, com experiência, qualificação e foco em segurança, qualidade e cumprimento de prazos."
  },
  {
    key: "video",
    title: "Vídeos",
    subtitle:
      "Conheça a Nova Max em operação. Neste vídeo institucional, apresentamos nossa frota própria, a atuação da equipe em campo e a execução de obras de terraplenagem, drenagem, pavimentação e logística pesada. Um retrato real da nossa capacidade operacional, do compromisso com prazos e da seriedade com que conduzimos cada projeto de infraestrutura, do planejamento à entrega final."
  }
];

export default function MediaGallery({
  items = [],
  filter = "all",
  search = "",
  sort = "recent",
  previewLimit = 6,
  onClearFilter = () => {}
}) {
  const [modal, setModal] = useState({ open: false, sectionKey: null });
  const [lightbox, setLightbox] = useState({ open: false, src: null, type: "image", currentIndex: 0, list: [] });
  const lastFocused = useRef(null);

  /* Processamento global: filtro, busca, ordenação */
  const processed = useMemo(() => {
    let list = (items || []).slice();
    if (filter && filter !== "all") list = list.filter(i => i.tag === filter);
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(i => (((i.alt || "") + " " + (i.tag || "")).toLowerCase().includes(q)));
    }
    if (sort === "az") list.sort((a, b) => (a.alt || "").localeCompare(b.alt || ""));
    return list;
  }, [items, filter, search, sort]);

  /* Agrupar por seção */
  const grouped = useMemo(() => {
    const map = {};
    SECTIONS.forEach(s => (map[s.key] = []));
    processed.forEach(it => {
      if (map[it.tag]) map[it.tag].push(it);
      else map[it.tag] = [it];
    });
    return map;
  }, [processed]);

  /* Modal "Mostrar todos" com paginação/infinite scroll */
  function openModalForSection(sectionKey) {
    lastFocused.current = document.activeElement;
    setModal({ open: true, sectionKey });
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModal({ open: false, sectionKey: null });
    document.body.style.overflow = "";
    if (lastFocused.current && lastFocused.current.focus) lastFocused.current.focus();
  }

  /* Lightbox: abre a partir de um item e recebe a lista completa da seção para navegação */
  function openLightboxAt(listForSection, index) {
    const item = listForSection[index];
    if (!item) return;
    if (item.type === "video" && item.externalUrl) {
      if (typeof window !== "undefined") {
        window.open(item.externalUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }
    setLightbox({
      open: true,
      src: item.src,
      type: item.type,
      currentIndex: index,
      list: listForSection
    });
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    setLightbox({ open: false, src: null, type: "image", currentIndex: 0, list: [] });
    document.body.style.overflow = "";
    if (lastFocused.current && lastFocused.current.focus) lastFocused.current.focus();
  }

  /* Navegação anterior/próximo no lightbox */
  const goPrev = useCallback(() => {
    setLightbox(prev => {
      if (!prev.list || prev.list.length === 0) return prev;
      const len = prev.list.length;
      const nextIndex = (prev.currentIndex - 1 + len) % len;
      return {
        ...prev,
        currentIndex: nextIndex,
        src: prev.list[nextIndex].src,
        type: prev.list[nextIndex].type
      };
    });
  }, []);

  const goNext = useCallback(() => {
    setLightbox(prev => {
      if (!prev.list || prev.list.length === 0) return prev;
      const len = prev.list.length;
      const nextIndex = (prev.currentIndex + 1) % len;
      return {
        ...prev,
        currentIndex: nextIndex,
        src: prev.list[nextIndex].src,
        type: prev.list[nextIndex].type
      };
    });
  }, []);

  /* Teclado: ESC fecha, setas navegam */
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        if (lightbox.open) closeLightbox();
        else if (modal.open) closeModal();
      } else if (e.key === "ArrowLeft") {
        if (lightbox.open) goPrev();
      } else if (e.key === "ArrowRight") {
        if (lightbox.open) goNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, modal.open, goPrev, goNext]);

  /* Itens da modal (com paginação) */
  const modalItems = useMemo(() => {
    if (!modal.open) return [];
    return grouped[modal.sectionKey] || [];
  }, [modal.open, modal.sectionKey, grouped]);

  /* Paginação/infinite state por modal */
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (modal.open) setPage(1);
  }, [modal.open, modal.sectionKey]);

  const displayedModalItems = useMemo(() => {
    return modalItems.slice(0, page * PAGE_SIZE);
  }, [modalItems, page]);

  /* onScroll handler para carregar mais quando chegar perto do fim */
  const handleModalScroll = useCallback((e) => {
    const el = e.target;
    if (!el) return;
    const threshold = 300; // px antes do fim
    if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) {
      if (displayedModalItems.length < modalItems.length) {
        setPage(p => p + 1);
      }
    }
  }, [displayedModalItems.length, modalItems.length]);

  function loadMoreInModal() {
    if (displayedModalItems.length < modalItems.length) setPage(p => p + 1);
  }

  /* Label legível para o filtro ativo */
  const activeLabel = useMemo(() => {
    if (!filter || filter === "all") return null;
    const s = SECTIONS.find(sec => sec.key === filter);
    return s ? s.title : filter;
  }, [filter]);

  /* Focus trap helpers */
  const modalRef = useRef(null);
  const lightboxRef = useRef(null);

  useEffect(() => {
    function trapFocus(containerRef, isOpen) {
      if (!isOpen || !containerRef.current) return () => {};
      const container = containerRef.current;
      const focusableSelectors = [
        'a[href]',
        'area[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable]'
      ].join(',');
      const nodes = Array.from(container.querySelectorAll(focusableSelectors)).filter(n => n.offsetParent !== null);
      if (nodes.length === 0) return () => {};
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      // focus first element
      first.focus();

      function handleKey(e) {
        if (e.key !== "Tab") return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      container.addEventListener("keydown", handleKey);
      return () => container.removeEventListener("keydown", handleKey);
    }

    const cleanupModal = trapFocus(modalRef, modal.open);
    const cleanupLightbox = trapFocus(lightboxRef, lightbox.open);
    return () => {
      if (cleanupModal) cleanupModal();
      if (cleanupLightbox) cleanupLightbox();
    };
  }, [modal.open, lightbox.open]);

  const currentLightboxItem = useMemo(() => {
    if (!lightbox.list || lightbox.list.length === 0) return null;
    return lightbox.list[lightbox.currentIndex] || null;
  }, [lightbox.list, lightbox.currentIndex]);

  return (
    <div>
      {/* Badge do filtro ativo (se houver) */}
      {activeLabel && (
        <div className={styles.activeFilterBadge} role="status" aria-live="polite">
          <span className={styles.activeFilterLabel}>Mostrando: <strong>{activeLabel}</strong></span>
          <button className={styles.clearFilterBtn} onClick={onClearFilter} aria-label="Mostrar todas as seções">
            Mostrar todas
          </button>
        </div>
      )}

      {SECTIONS.map(section => {
        const list = grouped[section.key] || [];
        if (list.length === 0) return null;

        const preview = list.slice(0, previewLimit);
        const needsShowAll = list.length > previewLimit;

        return (
          <section key={section.key} id={section.key} className={styles.gallerySection} aria-labelledby={`section-${section.key}`}>
            <header className={styles.sectionHeader}>
              <div>
                <h2 id={`section-${section.key}`} className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionSubtitle}>{section.subtitle}</p>
              </div>

              <div className={styles.sectionMeta}>
                <span className={styles.sectionCount}>{list.length}</span>
                <span className={styles.sectionCountLabel}> itens</span>
              </div>
            </header>

            <div className={styles.gridWrap}>
              <div className={styles.grid} role="list" aria-live="polite">
                {preview.map((item, idx) => (
                  <div
                    key={item.id}
                    className={styles.item}
                    role="listitem"
                    tabIndex={0}
                    onClick={() => openLightboxAt(list, idx)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openLightboxAt(list, idx); }}
                    aria-label={item.alt}
                  >
                    <img src={item.thumb} alt={item.alt} className={styles.thumb} loading="lazy" />
                    {item.type === "video" && <span className={styles.videoBadge} aria-hidden="true">▶ Vídeo</span>}
                  </div>
                ))}
              </div>

              {/* Botão compacto posicionado no canto inferior direito da grade */}
              {needsShowAll && (
                <button
                  className={styles.showAllFloatingBtn}
                  onClick={() => openModalForSection(section.key)}
                  aria-haspopup="dialog"
                  aria-label={`Mostrar todos os ${list.length} itens de ${section.title}`}
                >
                  Mostrar todos ({list.length})
                </button>
              )}
            </div>

            <hr className={styles.sectionDivider} />
          </section>
        );
      })}

      {/* Modal com grid completo e infinite scroll */}
      {modal.open && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Galeria completa">
          <div className={styles.modalContent} ref={modalRef}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {modal.sectionKey ? SECTIONS.find(s => s.key === modal.sectionKey).title : "Galeria"}
              </h3>
              <button className={styles.modalClose} onClick={closeModal} aria-label="Fechar galeria">✕</button>
            </div>

            <div
              className={styles.modalGrid}
              role="list"
              onScroll={handleModalScroll}
            >
              {displayedModalItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={styles.modalItem}
                  role="listitem"
                  tabIndex={0}
                  onClick={() => {
                    const fullList = modalItems;
                    const indexInFull = fullList.findIndex(x => x.id === item.id);
                    openLightboxAt(fullList, indexInFull >= 0 ? indexInFull : idx);
                  }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") {
                    const fullList = modalItems;
                    const indexInFull = fullList.findIndex(x => x.id === item.id);
                    openLightboxAt(fullList, indexInFull >= 0 ? indexInFull : idx);
                  }}}
                  aria-label={item.alt}
                >
                  <img src={item.thumb} alt={item.alt} className={styles.thumb} loading="lazy" />
                  {item.type === "video" && <span className={styles.videoBadge} aria-hidden="true">▶ Vídeo</span>}
                </div>
              ))}
            </div>

            {/* fallback: botão carregar mais */}
            {displayedModalItems.length < modalItems.length && (
              <div className={styles.modalFooter}>
                <button className={styles.loadMoreBtn} onClick={loadMoreInModal}>Carregar mais</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox com navegação anterior/próximo e indicador de posição */}
      {lightbox.open && (
        <div className={styles.lightboxOverlay} role="dialog" aria-modal="true" aria-label="Visualizador">
          <div className={styles.lightboxContent} ref={lightboxRef}>
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Fechar visualizador">✕</button>

            {/* Navegação anterior */}
            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={goPrev} aria-label="Anterior">‹</button>

            {/* Conteúdo */}
            <div className={styles.lightboxInner}>
              {lightbox.type === "video" && currentLightboxItem?.alt && (
                <p className={styles.lightboxCaptionTop}>{currentLightboxItem.alt}</p>
              )}

              {lightbox.type === "image" ? (
                <img
                  src={lightbox.src}
                  alt={currentLightboxItem?.alt || ""}
                  className={styles.lightboxImage}
                />
              ) : (
                <video src={lightbox.src} controls className={styles.lightboxVideo} />
              )}

              {lightbox.type !== "video" && currentLightboxItem?.alt && (
                <p className={styles.lightboxCaption}>{currentLightboxItem.alt}</p>
              )}

              {/* Indicador de posição */}
              <div className={styles.lightboxCounter} aria-hidden="true">
                {lightbox.list && lightbox.list.length ? `${lightbox.currentIndex + 1} / ${lightbox.list.length}` : ""}
              </div>
            </div>

            {/* Navegação próximo */}
            <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={goNext} aria-label="Próximo">›</button>
          </div>
        </div>
      )}
    </div>
  );
}
