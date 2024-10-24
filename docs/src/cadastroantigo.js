import React, { useState } from 'react';
import './Home.css';

function Cadastro() {
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Função para capturar os dados do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      cpf: document.getElementById('cpf').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      role: role
    };

    // Aqui você poderia enviar os dados para uma API
    console.log(formData);
    
    // Atualizar a mensagem de sucesso
    setSuccessMessage('Cadastro realizado com sucesso!');

    // Limpar os campos do formulário e o estado do papel
    document.getElementById('name').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    setRole('');
  };

  // Função para alterar o estado da função (Pet Walker ou Tutor)
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="Cadastro">
      <div className="form-container">
        <h2>Cadastro</h2>

        {/* Adicione o evento onSubmit ao formulário */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="form-group">
            <label>Eu sou:</label>
            <div className="role-buttons">
              <button type="button" onClick={() => handleRoleChange('Pet Walker')} className={role === 'Pet Walker' ? 'active' : ''}>
                Pet Walker
              </button>
              <button type="button" onClick={() => handleRoleChange('Tutor')} className={role === 'Tutor' ? 'active' : ''}>
                Tutor
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button">Cadastrar</button>
        </form>

        {/* Exibe a mensagem de sucesso se existir */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default Cadastro;