import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('https://sua-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

     
      if (response.ok) {
        const data = await response.json();
        // Utilize a resposta da API para algo, como exibir uma mensagem
        setSuccessMessage(data.message || 'Login realizado com sucesso!');
        setErrorMessage('');
      
        

        // Aqui você poderia armazenar um token no localStorage, se for o caso:
        localStorage.setItem('token', data.token);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao realizar login.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Erro de conexão com a API.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>

      {/* Exibe mensagens de sucesso ou erro */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;
