// src/pages/galeria.js
import React, { useMemo, useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import MediaGallery from "../components/MediaGallery";
import { getWhatsAppHref } from "../components/Header";
import styles from "./galeria.module.css";

/* frota */
const ITEMS = [
  { id: 1, src: "/images/frota1.jpg", thumb: "/images/frota1.jpg", type: "image", tag: "frota", alt: "Caminhões basculantes da frota Nova Max em operação de terraplenagem." },
  { id: 2, src: "/images/frota2.jpg", thumb: "/images/frota2.jpg", type: "image", tag: "frota", alt: "Motoniveladora atuando no nivelamento de solo para pavimentação." },
  { id: 3, src: "/images/frota3.jpg", thumb: "/images/frota3.jpg", type: "image", tag: "frota", alt: "Escavadeira hidráulica em serviço de escavação e movimentação de terra." },
  { id: 4, src: "/images/frota4.jpg", thumb: "/images/frota4.jpg", type: "image", tag: "frota", alt: "Frota própria preparada para atender obras de infraestrutura." },
  { id: 5, src: "/images/frota5.jpg", thumb: "/images/frota5.jpg", type: "image", tag: "frota", alt: "Equipamentos pesados revisados e prontos para operação contínua." },
  { id: 6, src: "/images/frota6.jpg", thumb: "/images/frota6.jpg", type: "image", tag: "frota", alt: "Operação de equipamentos pesados com foco em produtividade e segurança." },
  { id: 7, src: "/images/frota7.jpg", thumb: "/images/frota7.jpg", type: "image", tag: "frota", alt: "Frota Nova Max mobilizada para obras de grande porte." },
  { id: 8, src: "/images/frota8.jpg", thumb: "/images/frota8.jpg", type: "image", tag: "frota", alt: "Máquinas pesadas operadas por profissionais qualificados em campo." },


  // exemplos para outras seções
  { id: 9, src: "/images/obra1.jpg", thumb: "/images/obra1.jpg", type: "image", tag: "obra", alt: "Execução de pavimentação em área urbana." },
  { id: 10, src: "/images/obra2.jpg", thumb: "/images/obra2.jpg", type: "image", tag: "obra", alt: "Obra de terraplenagem em andamento para implantação de infraestrutura." },
  { id: 11, src: "/images/obra3.jpg", thumb: "/images/obra3.jpg", type: "image", tag: "obra", alt: "Serviço de drenagem com instalação de tubulação pluvial." },
  { id: 12, src: "/images/obra4.jpg", thumb: "/images/obra4.jpg", type: "image", tag: "obra", alt: "Movimentação de solo em obra viária." },
  { id: 13, src: "/images/obra5.jpg", thumb: "/images/obra5.jpg", type: "image", tag: "obra", alt: "Obra concluída com foco em durabilidade e segurança." },
  { id: 14, src: "/images/obra6.jpg", thumb: "/images/obra6.jpg", type: "image", tag: "obra", alt: "Atuação integrada entre frota e equipe técnica em campo." },
  { id: 15, src: "/images/obra7.jpg", thumb: "/images/obra7.jpg", type: "image", tag: "obra", alt: "Execução de pavimentação em área urbana." },
  { id: 16, src: "/images/obra8.jpg", thumb: "/images/obra8.jpg", type: "image", tag: "obra", alt: "Obra de terraplenagem em andamento para implantação de infraestrutura." },
  { id: 17, src: "/images/obra9.jpg", thumb: "/images/obra9.jpg", type: "image", tag: "obra", alt: "Serviço de drenagem com instalação de tubulação pluvial." },
  { id: 18, src: "/images/obra10.jpg", thumb: "/images/obra10.jpg", type: "image", tag: "obra", alt: "Movimentação de solo em obra viária." },
  { id: 19, src: "/images/obra11.jpg", thumb: "/images/obra11.jpg", type: "image", tag: "obra", alt: "Obra concluída com foco em durabilidade e segurança." },


  { id: 20, src: "/images/equipe1.jpg", thumb: "/images/equipe1.jpg", type: "image", tag: "equipe", alt: "Equipe Nova Max em operação de campo." },
  { id: 21, src: "/images/equipe2.jpg", thumb: "/images/equipe2.jpg", type: "image", tag: "equipe", alt: "Profissionais qualificados atuando em obra de infraestrutura." },
  { id: 22, src: "/images/equipe3.jpg", thumb: "/images/equipe3.jpg", type: "image", tag: "equipe", alt: "Trabalho em equipe com foco em segurança e eficiência." },
  { id: 23, src: "/images/equipe4.jpg", thumb: "/images/equipe4.jpg", type: "image", tag: "equipe", alt: "Colaboradores equipados e treinados para operação pesada." },
  { id: 24, src: "/images/equipe5.jpg", thumb: "/images/equipe5.jpg", type: "image", tag: "equipe", alt: "Equipe técnica da Nova Max atuando diretamente em campo." },
  { id: 25, src: "/images/equipe6.jpg", thumb: "/images/equipe6.jpg", type: "image", tag: "equipe", alt: "Profissionais em obra com foco em qualidade e cumprimento de prazos." },

  { id: 26, src: "/images/video-book.mp4", thumb: "/images/video-book.jpg", type: "video", tag: "video", alt: "Conheça a Nova Max em operação. Neste vídeo institucional, apresentamos nossa frota própria, a atuação da equipe em campo e a execução de obras de terraplenagem, drenagem, pavimentação e logística pesada." }
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

      <section className={styles.galleryCta} aria-label="Chamada para contato">
        <h2 className={styles.galleryCtaTitle}>Pronto para levar sua obra ao próximo nível?</h2>
        <p className={styles.galleryCtaText}>
          Fale com a Nova Max e solicite disponibilidade imediata de frota e equipe para seu projeto.
        </p>
        <div className={styles.galleryCtaActions}>
          <a
            href={getWhatsAppHref()}
            className={styles.galleryCtaButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com a Nova Max
          </a>
        </div>
      </section>
    </main>
  );

}
