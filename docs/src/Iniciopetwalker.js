import React from 'react';
import styles from './iniciopetwalker.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.location}>
          <span role="img" aria-label="location">📍</span> Florianópolis - SC
        </div>
        <div className={styles.profileIcon}>
          <span role="img" aria-label="profile">👤</span>
        </div>
      </header>
      <main>
        <h1 className={styles.appTitle}>PetWalker</h1>
        <div className={styles.buttonsContainer}>
          <button className={styles.appButton}>Editar Perfil</button>
          <button className={styles.appButton}>Localização</button>
          <button className={styles.appButton}>Histórico</button>
          <button className={styles.appButton}>Notificações</button>
        </div>
        <div className={styles.dogImage}>
          {/* Aqui pode colocar uma imagem, se desejar */}
        </div>
      </main>
      <footer className={styles.appFooter}>
        <span role="img" aria-label="paw" className={styles.mainButton}>🐾</span>
      </footer>
    </div>
  );
}

export default App;
