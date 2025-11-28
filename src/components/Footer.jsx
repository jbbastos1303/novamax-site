// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-dark-green">
      <div className="container footer-content">
        <p>© {new Date().getFullYear()} Nova Max Transportes. Todos os direitos reservados.</p>

        <p className="site-credit">
          Desenvolvido por{" "}
          <a
            href="https://www.jmcodestudio.com.br"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir site da JM Code Studio em nova aba"
          >
            JM Code Studio
          </a>
          
        </p>
      </div>
    </footer>
  );
}
