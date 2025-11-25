// src/components/ProjectsGrid.jsx
import React, { useState } from "react";
import Lightbox from "./Lightbox";

/* Exemplo de dados */
const projects = [
  {
    id: "obra-01",
    title: "Terraplenagem Industrial - Plataforma A",
    location: "Região Sudeste",
    year: 2023,
    scope: "Cortes, aterros, compactação e preparação de plataforma industrial.",
    equipment: "Escavadeiras, pás carregadeiras, rolos compactadores, caminhões basculantes.",
    thumb: "/images/obra1.jpg",
    gallery: ["/images/obra1.jpg", "/images/obra1-2.jpg"]
  },
  {
    id: "obra-02",
    title: "Drenagem e Pavimentação - Acesso Logístico",
    location: "Região Sul",
    year: 2022,
    scope: "Sistema de drenagem, subleito e aplicação de CBUQ em acesso logístico.",
    equipment: "Motoniveladoras, compactadores, caminhões truck.",
    thumb: "/images/obra2.jpg",
    gallery: ["/images/obra2.jpg", "/images/obra2-2.jpg"]
  },
  {
    id: "obra-03",
    title: "Recomposição de Talude e Contenção",
    location: "Região Norte",
    year: 2024,
    scope: "Recomposição e estabilização de taludes com drenagem e revegetação.",
    equipment: "Tratores de esteira, escavadeiras, equipamentos de drenagem.",
    thumb: "/images/obra3.jpg",
    gallery: ["/images/obra3.jpg"]
  }
];

export default function ProjectsGrid({ className }) {
  const [active, setActive] = useState(null);
  const [lightbox, setLightbox] = useState({ open: false, src: null, type: "image" });

  function openProject(project) {
    setActive(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openLightbox(src, type = "image") {
    setLightbox({ open: true, src, type });
  }

  function closeLightbox() {
    setLightbox({ open: false, src: null, type: "image" });
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
              <p style={{ margin: 0, color: "#666", fontSize: ".95rem" }}>{p.location} • {p.year}</p>
              <p style={{ marginTop: ".75rem", color: "#444" }}>{p.scope}</p>
              <p style={{ marginTop: ".5rem", fontSize: ".95rem", color: "#333" }}><strong>Equipamentos:</strong> {p.equipment}</p>

              <div style={{ display: "flex", gap: ".5rem", marginTop: ".75rem", flexWrap: "wrap" }}>
                <button className="btn btn-primary btn-sm" onClick={() => openProject(p)}>Ver detalhes</button>
                <button className="btn btn-ghost btn-sm" onClick={() => openLightbox(p.thumb, "image")}>Ampliar foto</button>
                {p.gallery && p.gallery.length > 1 && (
                  <button className="btn btn-outline btn-sm" onClick={() => openLightbox(p.gallery[1], "image")}>Ver galeria</button>
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
          <div style={{ width: "100%", maxWidth: 980, background: "#fff", borderRadius: 10, overflow: "auto", maxHeight: "90vh" }}>
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
                  <button className="btn btn-ghost" onClick={() => { setActive(null); }}>Fechar</button>
                </div>
              </div>
            </div>

            {active.gallery && active.gallery.length > 0 && (
              <div style={{ padding: "1rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: ".5rem" }}>
                {active.gallery.map((src, i) => (
                  <div key={i} style={{ height: 120, cursor: "pointer" }} onClick={() => openLightbox(src, "image")}>
                    <img src={src} alt={`${active.title} ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Lightbox open={lightbox.open} src={lightbox.src} type={lightbox.type} onClose={closeLightbox} />
    </>
  );
}
