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

        <p className={styles.closingText}>
          Cada obra executada pela Nova Max é conduzida com planejamento, disciplina operacional e foco em resultados. Nossa experiência em campo garante soluções técnicas eficientes, seguras e alinhadas às exigências de projetos de infraestrutura.
        </p>
      </main>      
    </>
  );
}
