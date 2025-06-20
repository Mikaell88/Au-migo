// src/App.js
import React, { useState } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Cadastro from "./Cadastro";
import Login from "./Login";
import MainPage from "./MainPage";
import Iniciopetwalker from "./Iniciopetwalker";
import Iniciodonopet from "./Iniciodonopet";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/main" className={({ isActive }) => `${styles["nav-button"]} ${isActive ? styles.active : ""}`}>
        Página Principal
      </NavLink>
      <NavLink to="/login" className={({ isActive }) => `${styles["nav-button"]} ${isActive ? styles.active : ""}`}>
        Conecte-se
      </NavLink>
      <NavLink to="/cadastro" className={({ isActive }) => `${styles["nav-button"]} ${isActive ? styles.active : ""}`}>
        Cadastro
      </NavLink>

      <NavLink
        to="/iniciopetwalker"
        className={({ isActive }) => `${styles["nav-button"]} ${isActive ? styles.active : ""}`}
      >
        Início PetWalker
      </NavLink>
      <NavLink
        to="/iniciodonopet"
        className={({ isActive }) => `${styles["nav-button"]} ${isActive ? styles.active : ""}`}
      >
        Início Tutor
      </NavLink>
    </nav>
  );
}

function App() {
  // Estado para a lista de usuários
  const [setUsuarios] = useState([]);

  // Handler para adicionar novo usuário (vindo de Cadastro)
  const handleCadastro = (novoUsuario) => {
    setUsuarios((prev) => [...prev, novoUsuario]);
  };

  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>Au-migo</h1>
          <p>Conectando você a passeadores de cães confiáveis.</p>
          <img src={`${process.env.PUBLIC_URL}/Pet1.png`} alt="Pet" className={styles["main-image"]} />
        </header>

        <Navbar />

        <main className={styles["main-content"]}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/cadastro" element={<Cadastro onSubmit={handleCadastro} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/iniciopetwalker" element={<Iniciopetwalker />} />
            <Route path="/iniciodonopet" element={<Iniciodonopet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
