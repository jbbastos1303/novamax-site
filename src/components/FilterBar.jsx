import React, { useRef, useState } from "react";
import styles from "../pages/galeria.module.css";

export default function FilterBar({
  filters = [],
  active,
  onChange,
  count = 0,
  onSearch = () => {},
  onSort = () => {},
  searchValue = "",
  sortValue = "recent"
}) {
  const chipsRef = useRef([]);
  const [collapsed, setCollapsed] = useState(false);

  function handleKeyDown(e, index) {
    if (e.key === "ArrowRight") {
      const next = (index + 1) % filters.length;
      chipsRef.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = (index - 1 + filters.length) % filters.length;
      chipsRef.current[prev]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(filters[index].key);
    }
  }

  return (
    <div className={styles.filterBar} role="region" aria-label="Barra de filtros da galeria">
      <div className={styles.chips} role="tablist" aria-label="Categorias">
        {filters.map((f, i) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              ref={(el) => (chipsRef.current[i] = el)}
              className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
              onClick={() => onChange(f.key)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Filtrar por ${f.label}`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className={styles.controls} style={{ display: collapsed ? "none" : "flex" }}>
        <label className={styles.searchWrap}>
          <input
            type="search"
            className={styles.search}
            placeholder="Buscar na galeria"
            aria-label="Buscar na galeria"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
        </label>

        <label className={styles.sortWrap}>
          <select
            className={styles.sort}
            aria-label="Ordenar"
            value={sortValue}
            onChange={(e) => onSort(e.target.value)}
          >
            <option value="recent">Mais recentes</option>
            <option value="popular">Mais populares</option>
            <option value="az">A → Z</option>
          </select>
        </label>

        <div className={styles.counter} aria-live="polite" aria-atomic="true">
          <span className={styles.counterNumber}>{count}</span>
          <span className={styles.counterLabel}> itens</span>
        </div>
      </div>

      <button
        className={styles.filterToggle}
        onClick={() => setCollapsed((s) => !s)}
        aria-expanded={!collapsed}
        aria-controls="gallery-filters-controls"
        title={collapsed ? "Mostrar filtros" : "Ocultar filtros"}
      >
        {collapsed ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ marginLeft: 8 }}>Mostrar filtros</span>
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ marginLeft: 8 }}>Ocultar filtros</span>
          </>
        )}
      </button>
    </div>
  );
}
