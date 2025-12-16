// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoNovaMax from "../assets/logoVerdeEscuro.png"; // ajuste caminho se necessário

// ===== Configurações globais (WhatsApp) =====
const WHATSAPP_NUMBER = "+55 21 96475-8679";
const WHATSAPP_DIGITS = WHATSAPP_NUMBER.replace(/\D/g, "");
const WHATSAPP_TEXT = encodeURIComponent("Olá, gostaria de mais informações sobre locação de equipamentos.");
export function getWhatsAppHref() {
  const ua = navigator.userAgent || "";
  const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
  // Mobile: esquema nativo tem maior chance de pré-preencher
  if (isMobile) return `whatsapp://send?phone=${WHATSAPP_DIGITS}&text=${WHATSAPP_TEXT}`;
  // Web: tentar web.whatsapp.com e api.whatsapp.com
  // Alguns ambientes de desktop preferem web.whatsapp.com
  return `https://web.whatsapp.com/send?phone=${WHATSAPP_DIGITS}&text=${WHATSAPP_TEXT}`;
}


export default function Header() {
  return (
    <header className="header">
      <div className="header-content container">
        <Link to="/#home" className="logo-link" aria-label="Página inicial Nova Max">
          <img src={logoNovaMax} alt="Nova Max Transportes Logo" className="logo" />
        </Link>

        <nav className="nav" aria-label="Navegação Principal">
          {/* <Link to="/#home">Home</Link>*/}
          <Link to="/#about">Sobre Nós</Link>
          <Link to="/#frota">Frota</Link>
          <Link to="/#servicos">Serviços</Link>
          <Link to="/obras">Obras</Link>
          <Link to="/galeria">Galeria</Link>
        </nav>
                <a
                  href={getWhatsAppHref()}
                  className="btn btn-primary btn-large"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Locar Equipamentos Agora
                </a>

        {/* <a href="#frota" className="btn btn-primary nav-cta">Locar Equipamentos</a> */}
      </div>
    </header>
  );
}
