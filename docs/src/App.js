import React from 'react';
import styles from './App.module.css'; // CSS Module corretamente importado
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Cadastro from './cadastro'; 
import Login from './login';
import MainPage from './mainPage';
import Altera from './altera';
import Iniciopetwalker from './iniciopetwalker';
import Iniciodonopet from './iniciodonopet';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <button className={styles['nav-button']}>
        <Link to="/main">Página Principal</Link>
      </button>
      <button className={styles['nav-button']}>
        <Link to="/login">Conecte-se</Link>
      </button>
      <button className={styles['nav-button']}>
        <Link to="/cadastro">Cadastro</Link>
      </button>
      <button className={styles['nav-button']}>
        <Link to="/altera">Alterar e Excluir</Link>
      </button>
      <button className={styles['nav-button']}>
        <Link to="/iniciopetwalker">Inicio PetWalker</Link>
      </button>
      <button className={styles['nav-button']}>
        <Link to="/iniciodonopet">Inicio Tutor</Link>
      </button>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>Au-migo</h1>
          <p>Conectando você a passeadores de cães confiáveis.</p>
          <img
            src={`${process.env.PUBLIC_URL}/Pet1.png`}
            alt="Descrição da Imagem"
            className={styles['main-image']}
          />
        </header>

        <Navbar />

        <main className={styles['main-content']}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/altera" element={<Altera />} />
            <Route path="/iniciopetwalker" element={<Iniciopetwalker />} />
            <Route path="/iniciodonopet" element={<Iniciodonopet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
