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
            Portfólio de obras concluídas pela Nova Max, demonstrando nossa expertise em terraplenagem, drenagem, pavimentação e infraestrutura.
          </p>
        </header>

        <div className={styles.projectsGrid}>
          <ProjectsGrid />
        </div>
      </main>      
    </>
  );
}
