// src/pages/galeria.js
import React, { useMemo, useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import MediaGallery from "../components/MediaGallery";
import styles from "./galeria.module.css";

/* frota */
const ITEMS = [
  { id: 1, src: "/images/frota1.jpg", thumb: "/images/frota1.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 1" },
  { id: 2, src: "/images/frota2.jpg", thumb: "/images/frota2.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 2" },
  { id: 3, src: "/images/frota3.jpg", thumb: "/images/frota3.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 3" },
  { id: 4, src: "/images/frota4.jpg", thumb: "/images/frota4.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 4" },
  { id: 5, src: "/images/frota5.jpg", thumb: "/images/frota5.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 5" },
  { id: 6, src: "/images/frota6.jpg", thumb: "/images/frota6.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 6" },
  { id: 7, src: "/images/frota7.jpg", thumb: "/images/frota7.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 7" },
  { id: 8, src: "/images/frota8.jpg", thumb: "/images/frota8.jpg", type: "image", tag: "frota", alt: "Escavadeira em operação 8" },


  // exemplos para outras seções
  { id: 9, src: "/images/obra1.jpg", thumb: "/images/obra1.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 10, src: "/images/obra2.jpg", thumb: "/images/obra2.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 11, src: "/images/obra3.jpg", thumb: "/images/obra3.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 12, src: "/images/obra4.jpg", thumb: "/images/obra4.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 13, src: "/images/obra5.jpg", thumb: "/images/obra5.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 14, src: "/images/obra6.jpg", thumb: "/images/obra6.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 15, src: "/images/obra7.jpg", thumb: "/images/obra7.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 16, src: "/images/obra8.jpg", thumb: "/images/obra8.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 17, src: "/images/obra9.jpg", thumb: "/images/obra9.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 18, src: "/images/obra10.jpg", thumb: "/images/obra10.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },
  { id: 19, src: "/images/obra11.jpg", thumb: "/images/obra11.jpg", type: "image", tag: "obra", alt: "Terraplenagem" },


  { id: 20, src: "/images/equipe1.jpg", thumb: "/images/equipe1.jpg", type: "image", tag: "equipe", alt: "Equipe em campo" },
  { id: 21, src: "/images/equipe2.jpg", thumb: "/images/equipe2.jpg", type: "image", tag: "equipe", alt: "Equipe em campo" },
  { id: 22, src: "/images/equipe3.jpg", thumb: "/images/equipe3.jpg", type: "image", tag: "equipe", alt: "Equipe em campo" },
  { id: 23, src: "/images/equipe4.jpg", thumb: "/images/equipe4.jpg", type: "image", tag: "equipe", alt: "Equipe em campo" },
  { id: 24, src: "/images/equipe5.jpg", thumb: "/images/equipe5.jpg", type: "image", tag: "equipe", alt: "Equipe em campo" },
  { id: 25, src: "/images/equipe6.jpg", thumb: "/images/equipe6.jpg", type: "image", tag: "equipe", alt: "Equipe em campo" },

  { id: 26, src: "/images/video-book.mp4", thumb: "/images/video-book.jpg", type: "video", tag: "video", alt: "Vídeo institucional" }
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
