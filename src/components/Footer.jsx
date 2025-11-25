// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-dark-green">
      <div className="container footer-content">
        <p>© {new Date().getFullYear()} Nova Max Transportes. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
