// src/components/Lightbox.jsx
import React, { useEffect } from "react";

export default function Lightbox({ open, src, type = "image", onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="lightbox-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,18,32,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1400,
        padding: "1rem"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 1100, borderRadius: 8, overflow: "hidden", background: "#000" }}
      >
        {type === "image" ? (
          <div style={{ width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={src} alt="Visualização" style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }} />
          </div>
        ) : (
          <div style={{ width: "100%", height: "70vh", background: "#000" }}>
            <video src={src} controls autoPlay style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        )}

        <div style={{ padding: ".75rem", display: "flex", justifyContent: "flex-end", gap: ".5rem", background: "#000" }}>
          <button className="btn btn-ghost" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
