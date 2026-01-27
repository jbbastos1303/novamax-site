// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToHash from "./components/ScrollToHash";
import "./App.css"; // CSS global importado apenas aqui
import { FaWhatsapp } from "react-icons/fa";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import heroVideo from "./assets/hero-video.mp4"; // ajuste caminho se necessário

// Lazy load das páginas (import dinâmico dentro do lazy é OK)
const ObrasPage = lazy(() => import("./pages/obras"));
const GaleriaPage = lazy(() => import("./pages/galeria"));

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
          <a href="#locar" className="btn btn-primary btn-large">Nossos Equipamentos</a>
          <a href="#servicos" className="btn btn-secondary btn-large">Conheça os Serviços</a>
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
          A Nova Max Transportes, Locação e Construções consolidou sua atuação no setor de <span className="about-highlight">infraestrutura</span> por meio de experiência prática, participação em grandes obras e excelência na entrega de resultados. Ao longo de sua trajetória, a empresa construiu um histórico sólido em projetos de terraplenagem, drenagem, pavimentação e <span className="about-highlight">logística pesada</span>, atendendo demandas complexas com seriedade e responsabilidade.
        </p>
        <p className="section-description">
          Nossa experiência em campo é sustentada por uma <span className="about-highlight">frota própria</span> robusta, <span className="about-highlight">equipe técnica qualificada</span> e processos bem definidos. Cada obra é conduzida com planejamento, <span className="about-highlight">controle técnico</span> e acompanhamento permanente, garantindo segurança, eficiência operacional e cumprimento rigoroso dos <span className="about-highlight">prazos</span> estabelecidos.
        </p>
        <p className="section-description">
          A Nova Max entende que grandes obras exigem comprometimento absoluto, capacidade de execução e confiança. Por isso, atuamos com foco em <span className="about-highlight">qualidade</span>, transparência e excelência operacional em todas as etapas do projeto, do início à entrega final. Nosso compromisso é gerar valor real para cada cliente, contribuir para o desenvolvimento da infraestrutura e manter relações duradouras baseadas em resultados consistentes e confiáveis.
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
    <section id="frota" className="fleet-highlight-section bg-light-green">
      <div className="container text-center">
        <h2 className="fleet-highlight-title">Frota própria e equipamentos disponíveis para obras de infraestrutura</h2>
        <p className="fleet-highlight-lead">A Nova Max opera com frota própria de equipamentos pesados e caminhões, dimensionada para atender obras de infraestrutura, construtoras e concessionárias. Nossa estrutura garante disponibilidade imediata, mobilização ágil e continuidade operacional, assegurando produtividade e cumprimento rigoroso de prazos em todas as frentes de obra.</p>
        <a href="#contato" className="btn btn-outline btn-large">Consultar disponibilidade imediata</a>
      </div>
    </section>
  );
}

function FleetSection() {
  return (
    <section id="locar" className="fleet-section">
      <div className="container">
        <h2 className="section-title">Locação de Equipamentos e Caminhões para Empresas e Concessionárias</h2>
        <p className="section-description">
          A Nova Max disponibiliza sua frota completa de equipamentos pesados e caminhões para locação, com foco em obras civis, viárias e de infraestrutura. Todos os equipamentos passam por manutenção constante e são operados por profissionais qualificados, garantindo segurança, desempenho e confiabilidade durante toda a execução dos serviços.
        </p>
        <div className="equipment-grid">
          <div className="equipment-list">
            <h4>Equipamentos Pesados</h4>
            <p>Nossa frota de equipamentos pesados é preparada para atender demandas contínuas de obras de infraestrutura, oferecendo robustez, precisão operacional e alto desempenho em diferentes condições de solo, terreno e carga de trabalho.</p>
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
            <p>A frota de caminhões e acessórios da Nova Max assegura eficiência logística e suporte completo às frentes de obra, viabilizando transporte de materiais, equipamentos e apoio operacional com disponibilidade imediata e integração total às operações em campo.</p>
            <ul>
              <li>Caminhões basculantes e truck</li>
              <li>Caminhões munck</li>
              <li>Perfuratrizes e rompedores</li>
              <li>Carretas prancha</li>
              <li>Compactadores de solo e placas vibratórias</li>
            </ul>
          </div>
        </div>

        <p className="impact-callout">A potência da Nova Max está à disposição da sua obra. Mais do que locação de equipamentos, entregamos estrutura, confiabilidade e capacidade operacional para projetos que exigem desempenho contínuo e compromisso com resultados.</p>
            <div className="contact-actions" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".75rem", marginTop: ".75rem" }}>
                 <a
          href={getWhatsAppHref()}
          className="btn btn-primary btn-large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Locar Equipamentos
        </a>
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
          A Nova Max atua de forma integrada na execução de serviços de infraestrutura, unindo planejamento, frota própria, equipe técnica qualificada e gestão de campo. Cada serviço é executado com rigor técnico, disciplina operacional e foco em segurança, qualidade e cumprimento de prazos, atendendo obras de diferentes portes e níveis de complexidade.
        </p>

        <div className="service-cards-grid">
          <div className="service-card">
            <div className="service-icon">🧨</div>
            <h3>Demolição Controlada</h3>
            <p>Execução de demolições estruturais e seletivas com planejamento técnico, controle ambiental e foco em segurança. Atuamos em áreas urbanas e industriais, garantindo precisão na operação, mitigação de riscos e destinação adequada de resíduos, conforme normas técnicas e ambientais.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🚜</div>
            <h3>Terraplenagem e Movimentação de Terras</h3>
            <p>Serviços completos de corte, aterro, nivelamento e conformação de terrenos para obras de infraestrutura. A Nova Max opera com frota própria e controle técnico rigoroso, assegurando estabilidade do solo, produtividade e preparação adequada para as etapas seguintes da obra.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">💧</div>
            <h3>Drenagem</h3>
            <p>Implantação de sistemas de drenagem superficial e profunda, voltados à preservação da estabilidade do solo e durabilidade da obra. Executamos redes pluviais, valas, canalizações e soluções técnicas adequadas às condições geotécnicas de cada projeto.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🛣️</div>
            <h3>Pavimentação e Base de Subleito</h3>
            <p>Execução de subleitos, bases e pavimentação, incluindo aplicação de CBUQ, com controle técnico e acompanhamento permanente. Trabalhamos para garantir resistência, durabilidade e desempenho adequado ao tráfego previsto, respeitando normas e especificações técnicas.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">🧱</div>
            <h3>Solo-Cimento</h3>
            <p>Estabilização de solos por meio da técnica de solo-cimento, promovendo melhoria das características mecânicas e aumento da capacidade de suporte do terreno. Solução eficiente para bases e sub-bases, com controle técnico e execução precisa.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">⛰️</div>
            <h3>Recomposição e Estabilização de Taludes</h3>
            <p>Serviços de conformação, contenção e estabilização de taludes, com foco em segurança geotécnica e preservação da integridade da obra. Atuamos na recomposição de áreas degradadas e contenções necessárias para obras viárias e de infraestrutura.</p>
          </div>
        </div>

        <p className="commitment-text">
          A Nova Max integra planejamento, execução e gestão de campo com rigor técnico e disciplina operacional, entregando soluções completas em infraestrutura, da preparação do terreno à finalização da obra.
        </p>
        <p className="slogan-final">Nova Max – Soluções completas em infraestrutura com rigor técnico e compromisso com resultados.</p>
      </div>
    </section>
  );
}

function ContactSection() {
  const addressLine1 = "Avenida Marechal Deodoro, 354 sala 104";
  const addressLine2 = "Centro, Duque de Caxias - RJ";
  const phone = WHATSAPP_NUMBER;
  const email = "comercial@novamaxtransportes.com.br";
  const email2 = "novamaxtransportes@outlook.com";

  // link global de WhatsApp
  const waHref = getWhatsAppHref();

  // mailto com subject e body padrão (codificados)
  const mailSubject = "Orçamento de Locação";
  const mailBody = `Olá,\n\nGostaria de solicitar um orçamento para locação de equipamentos.\n\nPeríodo desejado:\nEquipamentos:\nLocal da obra:\n\nObrigado.`;
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  const mailtoHref2 = `mailto:${email2}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  return (
    <section id="contato" className="contact-section">
      <div className="container contact-container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title text-light">Fale Conosco</h2>            
            <div className="contact-actions">
              <a
                href={waHref}
                className="contact-icon-btn contact-whatsapp"
                aria-label={`Abrir WhatsApp para ${phone}`}
                title={`Abrir WhatsApp para ${phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Ícone WhatsApp monocromático branco */}
                <FaWhatsapp size={18} color="#fff" aria-hidden="true" />

                <span className="sr-only">Abrir WhatsApp para {phone}</span>
                <span className="icon-tooltip" role="tooltip">Abrir WhatsApp</span>
              </a>
              <a
                href={mailtoHref}
                className="contact-icon-btn"
                aria-label={`Enviar email para ${email}`}
                title={`Enviar email para ${email}`}
                onClick={() => { window.location.href = mailtoHref; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v11A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 17.5v-11z" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 6.5l-9 6-9-6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <span className="sr-only">Enviar email para {email}</span>
                <span className="icon-tooltip" role="tooltip">Enviar email</span>
              </a>

            </div>
            <p className="section-description text-light">Pronto para transformar seu projeto? Entre em contato.</p>

            <address className="company-address">
              <strong className="company-name">Nova Max Transportes</strong>
              <div className="company-street">{addressLine1}</div>
              <div className="company-city">{addressLine2}</div>
              <div className="company-city">Telefones: (21) 3845-1506 / (21) 2759-5098</div>
              <div className="company-city">
                WhatsApp: <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>+55 21 96475-8679</a>
              </div>
              <div className="company-city" ><a
                href={mailtoHref} style={{ color: "#fff" }}>comercial@novamaxtransportes.com.br</a></div>
              <div className="company-city" ><a
                href={mailtoHref2} style={{ color: "#fff" }}>novamaxtransportes@outlook.com</a></div>
            </address>
            <p className="contact-note text-light">
              Horário de atendimento: Segunda a Sexta, 08:00–18:00.
            </p>
          </div>

          <div className="contact-map" aria-hidden="false">
            <div className="map-wrapper">
              <iframe
                title="Localização Nova Max Transportes"
                src="https://www.google.com/maps?q=Avenida%20Marechal%20Deodoro%2C%20354%20sala%20104%20-%20Centro%2C%20Duque%20de%20Caxias%20-%20RJ&output=embed"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <p className="map-link">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Avenida%20Marechal%20Deodoro%2C%20354%20sala%20104%20-%20Centro%2C%20Duque%20de%20Caxias%20-%20RJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir no Google Maps
              </a>
            </p>
          </div>
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
      <ScrollToTop />
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
