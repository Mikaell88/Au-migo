import React from 'react';
import './Iniciopetwalker.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="location">
          <span role="img" aria-label="location">📍</span> Florianópolis - SC
        </div>
        <div className="profile-icon">
          <span role="img" aria-label="profile">👤</span>
        </div>
      </header>
      <main>
        <h1 className="app-title">Tutor</h1>
        <div className="buttons-container">
          <button className="app-button">Editar Perfil</button>
          <button className="app-button">Localização</button>
          <button className="app-button">Histórico</button>
          <button className="app-button">Notificações</button>
        </div>
        <div className="dog-image">
          
        </div>
      </main>
      <footer className="App-footer">
        
        <span role="img" aria-label="paw" className="main-button">🐾</span>
        
      </footer>
    </div>
  );
}

export default App;