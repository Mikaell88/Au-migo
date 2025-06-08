import React, { Component } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

axios.defaults.baseURL = 'http://localhost:3001';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      error: '',
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
      const response = await axios.post('/login', { email, senha });
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      this.setState({ error: 'E-mail ou senha inválidos!' });
    }
  };

  render() {
    const { email, senha, error } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">E-mail:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="senha">Senha:</label>
              <input
                id="senha"
                type="password"
                name="senha"
                value={senha}
                onChange={this.handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.button}>Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
