import React from 'react';
import styles from './iniciodonopet.module.css';

function InicioDonoPet() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.location}>
          <span role="img" aria-label="location">📍</span> Florianópolis - SC
        </div>
        <div className={styles.profileIcon}>
          <span role="img" aria-label="profile">👤</span>
        </div>
      </header>

      <main>
        <h1 className={styles.appTitle}>Tutor</h1>
        <div className={styles.buttonsContainer}>
          <button className={styles.appButton}>Editar Perfil</button>
          <button className={styles.appButton}>Localização</button>
          <button className={styles.appButton}>Histórico</button>
          <button className={styles.appButton}>Notificações</button>
        </div>

        <div className={styles.dogImage}>
          <img src={`${process.env.PUBLIC_URL}/dog.png`} alt="Seu cachorro" />
        </div>
      </main>

      <footer className={styles.AppFooter}>
        <span role="img" aria-label="paw" className={styles.mainButton}>🐾</span>
      </footer>
    </div>
  );
}

export default InicioDonoPet;
