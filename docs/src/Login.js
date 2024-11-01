import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';

axios.defaults.baseURL = 'http://localhost:8080';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      error: '', // Para armazenar mensagens de erro
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, senha } = this.state;

    try {
      const response = await axios.post('/login', { email, senha }); // Altere a rota conforme necessário
      // Aqui você pode redirecionar o usuário para a página inicial ou realizar alguma ação com a resposta
      console.log('Login bem-sucedido:', response.data);
      // Por exemplo, salvar o token em localStorage
      localStorage.setItem('token', response.data.token);
      // Redirecionar para a página inicial (use o método de roteamento que você preferir)
      this.props.history.push('/'); // Altere para a rota que deseja redirecionar
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      this.setState({ error: 'E-mail ou senha inválidos!' });
    }
  };

  render() {
    const { email, senha, error } = this.state;

    return (
      <div>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>} {/* Exibe mensagem de erro */}
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              E-mail:
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </label>
          </p>
          <p>
            <label>
              Senha:
              <input
                type="password"
                name="senha"
                value={senha}
                onChange={this.handleChange}
                required
              />
            </label>
          </p>
          <p>
            <button type="submit">Entrar</button>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
