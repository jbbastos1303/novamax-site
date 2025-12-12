// src/components/Lightbox.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";

export default function Lightbox({ open, src, type = "image", list = [], index = 0, onClose }) {
  const hasList = Array.isArray(list) && list.length > 0;
  const [currentIndex, setCurrentIndex] = useState(index || 0);

  useEffect(() => {
    if (open) setCurrentIndex(index || 0);
  }, [open, index]);

  const currentItem = useMemo(() => {
    if (hasList) {
      const item = list[currentIndex] ?? list[0];
      if (typeof item === "string") return { src: item, type: "image" };
      return { src: item?.src, type: item?.type || "image" };
    }
    return { src, type };
  }, [hasList, list, currentIndex, src, type]);

  const goPrev = useCallback(() => {
    if (!hasList) return;
    setCurrentIndex((i) => (i - 1 + list.length) % list.length);
  }, [hasList, list.length]);

  const goNext = useCallback(() => {
    if (!hasList) return;
    setCurrentIndex((i) => (i + 1) % list.length);
  }, [hasList, list.length]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (!hasList) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, hasList, goPrev, goNext]);

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
        style={{ position: "relative", width: "100%", maxWidth: 1100, borderRadius: 8, overflow: "hidden", background: "#000" }}
      >
        <button
          aria-label="Fechar visualização"
          title="Fechar"
          onClick={onClose}
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
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}
        >
          ×
        </button>
        {currentItem.type === "image" ? (
          <div style={{ width: "100%", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={currentItem.src} alt="Visualização" style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }} />
          </div>
        ) : (
          <div style={{ width: "100%", height: "70vh", background: "#000" }}>
            <video src={currentItem.src} controls autoPlay style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        )}

        {hasList && list.length > 1 && (
          <>
            <button
              aria-label="Anterior"
              onClick={goPrev}
              style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.08)", border: 0, color: "#fff", fontSize: 28, width: 44, height: 44, borderRadius: 22, cursor: "pointer" }}
            >
              ‹
            </button>
            <button
              aria-label="Próximo"
              onClick={goNext}
              style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,.08)", border: 0, color: "#fff", fontSize: 28, width: 44, height: 44, borderRadius: 22, cursor: "pointer" }}
            >
              ›
            </button>
            <div aria-hidden="true" style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", color: "#c9d3e3", fontSize: 13 }}>
              {currentIndex + 1} / {list.length}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
