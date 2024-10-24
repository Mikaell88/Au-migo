import React, { useState } from 'react';
import './Home.css';

function Cadastro() {
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para exibir erros

  // Função para capturar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      cpf: document.getElementById('cpf').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      role: role
    };

    try {
      // Enviar os dados para a API usando fetch
      const response = await fetch('https://sua-api.com/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        const data = await response.json();
        // Atualizar a mensagem de sucesso
        setSuccessMessage('Cadastro realizado com sucesso!');
        setErrorMessage('');

        // Limpar os campos do formulário
        document.getElementById('name').value = '';
        document.getElementById('cpf').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        setRole('');
      } else {
        // Caso ocorra algum erro na resposta da API
        setErrorMessage('Erro ao realizar o cadastro. Tente novamente.');
        setSuccessMessage('');
      }
    } catch (error) {
      // Caso ocorra um erro na requisição
      setErrorMessage('Erro de conexão com a API.');
      setSuccessMessage('');
    }
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
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro se existir */}
      </div>
    </div>
  );
}

export default Cadastro;
