// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoNovaMax from "../assets/logo.png"; // ajuste caminho se necessário

export default function Header() {
  return (
    <header className="header">
      <div className="header-content container">
        <Link to="/" className="logo-link" aria-label="Página inicial Nova Max">
          <img src={logoNovaMax} alt="Nova Max Transportes Logo" className="logo" />
        </Link>

        <nav className="nav" aria-label="Navegação Principal">
          <Link to="/">Home</Link>
          <Link to="/#about">Sobre Nós</Link>
          <Link to="/#frota">Frota</Link>
          <Link to="/#servicos">Serviços</Link>
          <Link to="/obras">Obras</Link>
          <Link to="/galeria">Galeria</Link>
        </nav>

        <a href="#frota" className="btn btn-primary nav-cta">Locar Equipamentos</a>
      </div>
    </header>
  );
}
