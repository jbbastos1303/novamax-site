// src/components/ProjectsGrid.jsx
import React, { useEffect, useState } from "react";
import Lightbox from "./Lightbox";

/* Exemplo de dados */
const projects = [
  {
    id: "obra-01",
    title: "Terraplenagem Industrial",
    subtitle: "Plataforma A",
    location: "Região Sudeste",
    year: 2023,
    scope: "Cortes, aterros, compactação e preparação de plataforma industrial.",
    equipment: "Escavadeiras, pás carregadeiras, rolos compactadores, caminhões basculantes.",
    thumb: "/images/obras/terraplanagem1.jpg",
    gallery: ["/images/obras/terraplanagem1.jpg", "/images/obras/terraplanagem2.jpg"]
  },
  {
    id: "obra-02",
    title: "Drenagem e Pavimentação",
    subtitle: "Acesso Logístico",
    location: "Região Sul",
    year: 2022,
    scope: "Sistema de drenagem, subleito e aplicação de CBUQ em acesso logístico.",
    equipment: "Motoniveladoras, compactadores, caminhões truck.",
    thumb: "/images/obras/drenagem1.jpg",
    gallery: ["/images/obras/drenagem1.jpg", "/images/obras/drenagem2.jpg"]
  },
  {
    id: "obra-03",
    title: "Recomposição de Talude",
    subtitle: "Contenção",
    location: "Região Norte",
    year: 2024,
    scope: "Recomposição e estabilização de taludes com drenagem e revegetação.",
    equipment: "Tratores de esteira, escavadeiras, equipamentos de drenagem.",
    thumb: "/images/obras/talude1.jpg",
    gallery: ["/images/obras/talude1.jpg", "/images/obras/talude2.jpg"]
  }
];

export default function ProjectsGrid({ className }) {
  const [active, setActive] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, list: [], index: 0 });

  useEffect(() => {
    if (!active) return;
    function onKey(e) {
      if (e.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  function openProject(project) {
    setActive(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openLightboxList(list = [], startIndex = 0) {
    if (!Array.isArray(list) || list.length === 0) return;
    setLightbox({ open: true, list, index: Math.max(0, Math.min(startIndex, list.length - 1)) });
  }

  function closeLightbox() {
    setLightbox({ open: false, list: [], index: 0 });
  }

  return (
    <>
      <div className={className || "projects-grid"} style={{ marginTop: "2rem", display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {projects.map((p) => (
          <article key={p.id} className="project-card" style={{ background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
            <div style={{ width: "100%", height: 180, overflow: "hidden" }}>
              <img src={p.thumb} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "1rem" }}>
              <h3 style={{ margin: "0 0 .5rem" }}>{p.title}</h3>
              <h4 style={{ margin: "0 0 .5rem" }}>{p.subtitle}</h4>
              <p style={{ margin: 0, color: "#666", fontSize: ".95rem" }}>{p.location} • {p.year}</p>
              <p style={{ marginTop: ".75rem", color: "#444" }}>{p.scope}</p>
              <p style={{ marginTop: ".5rem", fontSize: ".95rem", color: "#333" }}><strong>Equipamentos:</strong> {p.equipment}</p>

              <div style={{ display: "flex", gap: ".5rem", marginTop: ".75rem", flexWrap: "wrap" }}>
                <button className="btn btn-primary btn-sm" onClick={() => openProject(p)}>Detalhes</button>
                {p.gallery && p.gallery.length > 1 && (
                  <button className="btn btn-outline btn-sm" onClick={() => openLightboxList(p.gallery, 0)}>Galeria</button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div className="project-drawer" role="dialog" aria-modal="true" style={{
          position: "fixed", inset: 0, background: "rgba(11,18,32,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1200, padding: "1rem"
        }}>
          <div style={{ width: "100%", maxWidth: 980, background: "#fff", borderRadius: 10, overflow: "auto", maxHeight: "90vh", position: "relative" }}>
            <button
              aria-label="Fechar detalhes do projeto"
              title="Fechar"
              onClick={() => { setActive(null); }}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 36,
                height: 36,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                border: "1px solid rgba(11,18,32,0.12)",
                background: "rgba(11,18,32,0.04)",
                color: "#0b1220",
                fontSize: 18,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                backdropFilter: "saturate(180%) blur(2px)"
              }}
            >
              ×
            </button>
            <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ width: "100%", height: 320, overflow: "hidden" }}>
                  <img src={active.thumb} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
              <div style={{ width: 360, padding: "1rem" }}>
                <h3>{active.title}</h3>
                <p style={{ color: "#666" }}>{active.location} • {active.year}</p>
                <p style={{ marginTop: ".5rem" }}>{active.scope}</p>
                <p style={{ marginTop: ".5rem" }}><strong>Equipamentos:</strong> {active.equipment}</p>

                <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                  <a className="btn btn-primary" href="#contato">Solicitar informações</a>
                </div>
              </div>
            </div>

            {active.gallery && active.gallery.length > 0 && (
              <div style={{ padding: "1rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".5rem" }}>
                {active.gallery.map((src, i) => (
                  <div key={i} style={{ height: 120, cursor: "pointer" }} onClick={() => openLightboxList(active.gallery, i)}>
                    <img src={src} alt={`${active.title} ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Lightbox open={lightbox.open} list={lightbox.list} index={lightbox.index} onClose={closeLightbox} />
    </>
  );
}
