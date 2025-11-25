// src/pages/galeria.js
import React, { useMemo, useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import MediaGallery from "../components/MediaGallery";
import styles from "./galeria.module.css";

/* 10 cópias de gallery1.jpg em frota para teste */
const ITEMS = [
  { id: 1, src: "/images/frota1.jpg", thumb: "/images/frota1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 1" },
  { id: 2, src: "/images/gallery2.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 2" },
  { id: 3, src: "/images/gallery3.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 3" },
  { id: 4, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 4" },
  { id: 5, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 5" },
  { id: 6, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 6" },
  { id: 7, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 7" },
  { id: 8, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 8" },
  { id: 9, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 9" },
  { id: 10, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 10" },
  { id: 11, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 11" },
  { id: 12, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 12" },
  { id: 13, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 13" },
  { id: 14, src: "/images/gallery1.jpg", thumb: "/images/gallery1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 14" },

  // exemplos para outras seções
  { id: 15, src: "/images/gallery2.jpg", thumb: "/images/gallery2.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 16, src: "/images/gallery3.jpg", thumb: "/images/gallery3.jpg", type: "image", tag: "equipe", alt: "Equipe em campo" },
  { id: 17, src: "/images/video-obra.mp4", thumb: "/images/video-obra.jpg", type: "video", tag: "video", alt: "Vídeo institucional" }
];

const FILTERS = [
  { key: "all", label: "Todos" },
  { key: "frota", label: "Frota" },
  { key: "obra", label: "Obras" },
  { key: "equipe", label: "Equipe" },
  { key: "video", label: "Vídeos" }
];

export default function GaleriaPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");

  useEffect(() => { document.title = "Fotos e vídeos | Nova Max"; }, []);

  const filtered = useMemo(() => {
    let list = ITEMS.slice();
    if (filter !== "all") list = list.filter(i => i.tag === filter);
    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      list = list.filter(i => (i.alt || "").toLowerCase().includes(q));
    }
    if (sort === "az") list.sort((a, b) => (a.alt || "").localeCompare(b.alt || ""));
    return list;
  }, [filter, search, sort]);

  // dentro do return de GaleriaPage, substitua a renderização direta por este wrapper
  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.title}>Fotos e vídeos</h1>
        <p className={styles.description}>
          Galeria otimizada com fotos e vídeos da frota, operações e equipe. Use os filtros para encontrar rapidamente o que precisa.
        </p>
      </header>

      {/* Painel que agrupa filtro + galeria */}
      <div className={styles.galleryPanel} role="region" aria-label="Painel de filtros e galeria">
        <div className={styles.panelTop}>
          <FilterBar
            filters={FILTERS}
            active={filter}
            onChange={setFilter}
            count={filtered.length}
            onSearch={setSearch}
            onSort={setSort}
            searchValue={search}
            sortValue={sort}
          />
        </div>

        <div className={styles.panelBody}>
          <MediaGallery
            items={ITEMS}
            filter={filter}
            search={search}
            sort={sort}
            onClearFilter={() => setFilter("all")}
          />
        </div>
      </div>
    </main>
  );

}
