import React from 'react';
import './cadastro.module.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cadastro from './cadastro'; 
import Login from './login';
import MainPage from './mainPage'; // Importando a página principal
import Altera from './altera';
import Iniciopetwalker from './iniciopetwalker';
import Iniciodonopet from './iniciodonopet';




// Definindo o componente Navbar dentro do App.js
function Navbar() {
  return (
    <nav className="navbar">
      <button className="nav-button">
        <Link to="/main">Página Principal</Link>
      </button>
      <button className="nav-button">
        <Link to="/Login">Conecte-se</Link>
      </button>
      <button className="nav-button">
        <Link to="/Cadastro">Cadastro</Link>
      </button>
      <button className="nav-button">
        <Link to="/Altera">Alterar e Excluir</Link>
      </button>
      <button className="nav-button">
        <Link to="/Iniciopetwalker">Inicio PetWalker</Link>
      </button>
      <button className="nav-button">
        <Link to="/Iniciodonopet">Inicio Tutor</Link>
      </button>
      
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Au-migo</h1>
          <p>Conectando você a passeadores de cães confiáveis.</p>
          <img src={`${process.env.PUBLIC_URL}/Pet1.png`} alt="Descrição da Imagem" className="main-image" />
        </header>

        {/* Adicionando o Navbar aqui */}
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} /> {/* Usando MainPage em vez de HomePage */}
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/altera" element={<Altera />} />
            <Route path="/main" element={<MainPage />} /> {/* Usando MainPage também para /main */}
            <Route path="/iniciopetwalker" element={<Iniciopetwalker />} /> {}
            <Route path="/iniciodonopet" element={<Iniciodonopet />} /> {}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;