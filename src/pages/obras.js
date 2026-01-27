// src/pages/obras.js
import React, { useEffect } from "react";
import ProjectsGrid from "../components/ProjectsGrid";
import styles from "./obras.module.css";

export default function ObrasPage() {
  useEffect(() => {
    document.title = "Obras realizadas | Nova Max";
  }, []);

  return (
    <>      
      <main className={styles.container}>
        <header>
          <h1 className={styles.title}>Obras realizadas</h1>
          <p className={styles.description}>
            Portfólio de obras executadas pela Nova Max, demonstrando nossa experiência em projetos de infraestrutura, terraplenagem, drenagem, pavimentação e estabilização geotécnica. Cada obra reflete planejamento técnico, frota própria, equipe qualificada e compromisso com prazos e qualidade na entrega.
          </p>
        </header>

        <div className={styles.projectsGrid}>
          <ProjectsGrid />
        </div>

        <div style={{ 
          textAlign: "center", 
          padding: "2rem 1rem",
          margin: "2rem 0"
        }}>
          <p style={{ 
            fontSize: "1.1rem", 
            marginBottom: "1rem",
            color: "#444",
            maxWidth: "800px",
            margin: "0 auto 1.5rem"
          }}>
            Cada obra executada pela Nova Max é conduzida com planejamento, disciplina operacional e foco em resultados. Nossa experiência em campo garante soluções técnicas eficientes, seguras e alinhadas às exigências de projetos de infraestrutura.
          </p>
          <a 
            href="#contato" 
            className="btn btn-primary btn-large"
            style={{
              display: "inline-block",
              padding: "0.875rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            Solicitar Informações
          </a>
        </div>
      </main>      
    </>
  );
}
