// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash";
import "./App.css"; // CSS global importado apenas aqui

import Header from "./components/Header";
import Footer from "./components/Footer";
import heroVideo from "./assets/hero-video.mp4"; // ajuste caminho se necessário

// Lazy load das páginas (import dinâmico dentro do lazy é OK)
const ObrasPage = lazy(() => import("./pages/obras"));
const GaleriaPage = lazy(() => import("./pages/galeria"));

/* --- Seções da Home (mantive a estrutura e textos principais) --- */

function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <video autoPlay loop muted playsInline className="hero-video" poster="/images/hero-poster.jpg">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-content container">
        <h1 className="hero-title">Estrutura própria. Engenharia em movimento. Resultado garantido.</h1>
        <p className="hero-subtitle">
          Frota própria, pronta para atender empresas de construção, concessionárias de infraestrutura e obras públicas em todo o Brasil.
        </p>
        <div className="hero-ctas">
          <a href="#frota" className="btn btn-primary btn-large">Locar Equipamentos Agora</a>
          <a href="#servicos" className="btn btn-secondary btn-large">Conheça Nossos Serviços</a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section bg-light-gray">
      <div className="container">
        <h2 className="section-title">Sobre a Nova Max Transportes</h2>
        <p className="section-description large-text">
          A Nova Max Transportes, Locação e Construções é sua parceira estratégica em infraestrutura, movimentação de terras e obras civis.
        </p>
        <p className="section-description">
          Com uma frota robusta e própria, e uma equipe técnica altamente qualificada, garantimos autonomia, agilidade e os melhores resultados.
        </p>
        <div className="text-center">
          <a href="#contato" className="btn btn-primary btn-large">Fale Conosco</a>
        </div>
      </div>
    </section>
  );
}

function DifferentiatorsSection() {
  return (
    <section className="differentiators-section bg-primary-light">
      <div className="container">
        <h2 className="section-title text-light">Por que escolher a Nova Max?</h2>
        <div className="differentiator-grid">
          <div className="differentiator-item">
            <div className="differentiator-icon">🚚</div>
            <h3>Frota Própria e Completa</h3>
            <p>Equipamentos modernos e caminhões para todas as suas necessidades, garantindo disponibilidade.</p>
          </div>
          <div className="differentiator-item">
            <div className="differentiator-icon">🔧</div>
            <h3>Manutenção Rigorosa</h3>
            <p>Todos os equipamentos são revisados e prontos para operação, com suporte técnico e preventiva.</p>
          </div>
          <div className="differentiator-item">
            <div className="differentiator-icon">👷‍♂️</div>
            <h3>Gestão Técnica de Campo</h3>
            <p>Profissionais experientes garantem o planejamento e a execução eficiente de cada etapa da obra.</p>
          </div>
          <div className="differentiator-item">
            <div className="differentiator-icon">🛡️</div>
            <h3>Segurança e Conformidade</h3>
            <p>Operações realizadas em conformidade com as normas NR-18 e ABNT, com foco total na segurança.</p>
          </div>
          <div className="differentiator-item">
            <div className="differentiator-icon">⚡</div>
            <h3>Prontidão Operacional</h3>
            <p>Nossos maquinários estão sempre prontos para operação imediata.</p>
          </div>
          <div className="differentiator-item">
            <div className="differentiator-icon">🌐</div>
            <h3>Capacidade de Atuação Ampliada</h3>
            <p>Atuamos com excelência em ambientes urbanos, industriais e rodoviários.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetHighlightSection() {
  return (
    <section className="fleet-highlight-section bg-light-green">
      <div className="container text-center">
        <h2 className="fleet-highlight-title">Frota própria e equipamentos disponíveis para empresas de construção e concessionárias.</h2>
        <p className="fleet-highlight-lead">Operamos com segurança, disponibilidade e entrega garantida em todo o Brasil.</p>
        <a href="#frota" className="btn btn-primary btn-large">Locar Equipamentos Agora</a>
      </div>
    </section>
  );
}

function FleetSection() {
  return (
    <section id="frota" className="fleet-section">
      <div className="container">
        <h2 className="section-title">Locação de Equipamentos e Caminhões para Empresas e Concessionárias</h2>
        <p className="section-description">
          A Nova Max disponibiliza sua frota completa de equipamentos pesados e caminhões para construtoras, empreiteiras e concessionárias de infraestrutura.
        </p>
        <div className="equipment-grid">
          <div className="equipment-list">
            <h4>Equipamentos Pesados</h4>
            <ul>
              <li>Escavadeiras hidráulicas</li>
              <li>Retroescavadeiras</li>
              <li>Pás carregadeiras</li>
              <li>Motoniveladoras</li>
              <li>Tratores de esteira</li>
              <li>Rolo compactador (liso e pé de carneiro)</li>
            </ul>
          </div>
          <div className="equipment-list">
            <h4>Caminhões e Acessórios</h4>
            <ul>
              <li>Caminhões basculantes e truck</li>
              <li>Caminhões munck</li>
              <li>Perfuratrizes e rompedores</li>
              <li>Carretas prancha</li>
              <li>Compactadores de solo e placas vibratórias</li>
            </ul>
          </div>
        </div>

        <p className="impact-callout">A potência da Nova Max está à disposição da sua obra. <span className="slogan-commercial">Potência que constrói resultados.</span></p>
        <div className="cta-group">
          <a href="#contato" className="btn btn-primary btn-large">👉 Solicitar locação corporativa</a>
          <a href="#contato" className="btn btn-outline btn-large">Consultar disponibilidade imediata</a>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicos" className="services-section bg-gray">
      <div className="container">
        <h2 className="section-title">Serviços Técnicos e Especialidades</h2>
        <p className="section-description">
          A Nova Max Transportes é especializada em infraestrutura, movimentação de terras e obras civis, oferecendo soluções completas.
        </p>

        <div className="service-cards-grid">
          <div className="service-card">
            <div className="service-icon">🧨</div>
            <h3>Demolição Controlada</h3>
            <p>Execução de demolições estruturais e seletivas com segurança e controle ambiental.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🚜</div>
            <h3>Terraplenagem e Movimentação de Terras</h3>
            <p>Especialistas em cortes, aterros e regularização de terrenos.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">💧</div>
            <h3>Drenagem</h3>
            <p>Sistemas de drenagem superficial e profunda para preservação da estabilidade do solo.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🛣️</div>
            <h3>Pavimentação e Base de Subleito</h3>
            <p>Execução de subleitos e aplicação de CBUQ com supervisão técnica.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🧱</div>
            <h3>Solo-Cimento</h3>
            <p>Estabilização de solos conforme normas técnicas.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">⛰️</div>
            <h3>Recomposição e Estabilização de Taludes</h3>
            <p>Conformações e contenções com foco em estabilidade geotécnica.</p>
          </div>
        </div>

        <p className="commitment-text">
          A Nova Max integra planejamento, execução e gestão de campo com rigor técnico e disciplina operacional.
        </p>
        <p className="slogan-final">Nova Max – Engenharia, potência e técnica a serviço do progresso.</p>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="contact-section">
      <div className="container text-center">
        <h2 className="section-title text-light">Fale Conosco</h2>
        <p className="section-description text-light">Pronto para transformar seu projeto? Entre em contato.</p>
        <div className="cta-group">
          <a href="mailto:contato@novamax.com.br" className="btn btn-secondary btn-large">✉️ Enviar um E-mail</a>
          <a href="tel:+5511999999999" className="btn btn-outline-light btn-large">📞 Ligue Agora</a>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Header />
      <ScrollToHash />
      <main>
        <HeroSection />
        <AboutSection />
        <DifferentiatorsSection />
        <FleetHighlightSection />
        <FleetSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/obras"
            element={
              <>
                <Header />
                <ObrasPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/galeria"
            element={
              <>
                <Header />
                <GaleriaPage />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
