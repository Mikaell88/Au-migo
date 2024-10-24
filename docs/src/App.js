import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cadastro from './Cadastro'; 
import Login from './Login';
import MainPage from './MainPage'; // Importando a página principal
import Iniciopetwalker from './Iniciopetwalker';
import Iniciodonopet from './Iniciodonopet';


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
        <Link to="/Iniciopetwalker">Inicio PetWalker</Link>
      </button>
      <button className="nav-button">
        <Link to="/Iniciodonopet">Inicio Dono do Pet</Link>
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
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/main" element={<MainPage />} /> {/* Usando MainPage também para /main */}
            <Route path="/Iniciopetwalker" element={<Iniciopetwalker />} /> {}
            <Route path="/Iniciodonopet" element={<Iniciodonopet />} /> {}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;