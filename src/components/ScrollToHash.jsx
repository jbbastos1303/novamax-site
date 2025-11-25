// src/components/ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // roda apenas quando houver hash
    if (!location.hash) return;

    // pequena espera para garantir que o DOM da rota foi montado
    const id = location.hash.replace("#", "");
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // opcional: ajustar offset se você tiver header fixo
        // window.scrollBy(0, -80);
      } else {
        // se o elemento não existir ainda, tentar novamente em 200ms (máx 3 tentativas)
        let attempts = 0;
        const retry = setInterval(() => {
          attempts += 1;
          const retryEl = document.getElementById(id);
          if (retryEl) {
            retryEl.scrollIntoView({ behavior: "smooth", block: "start" });
            clearInterval(retry);
          }
          if (attempts >= 6) clearInterval(retry);
        }, 200);
      }
    }, 60); // 60ms é suficiente na maioria dos casos

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}
