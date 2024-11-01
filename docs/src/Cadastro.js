import React, { Component } from 'react';
import axios from 'axios';
import './Cadastro.css';

axios.defaults.baseURL = 'http://localhost:8080';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userData: { id: '', name: '', email: '', cpf: '', senha: '' },
      isEditMode: false,
      role: '',
      clickedRole: '', // Adicionando um estado para o botão clicado
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      this.setState({ users: response.data });
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  handleRoleChange = (role) => {
    this.setState({ role, clickedRole: role }); // Armazena a função clicada
  };
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [name]: name === 'id' ? Number(value) : value,
      }
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userData, role, isEditMode } = this.state;
    const payload = { ...userData, role }; // Incluindo o role nos dados enviados

    try {
      if (isEditMode) {
        await axios.put(`/users/${userData.id}`, payload); // Mudei a URL para incluir o ID
      } else {
        await axios.post('/users', payload);
        this.setState({ successMessage: 'Cadastro realizado com sucesso!' }); // Mensagem de sucesso
      }
      this.resetForm();
      this.fetchUsers();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  loadUser = (user) => {
    this.setState({
      userData: { id: user.id, name: user.name, email: user.email, cpf: user.cpf, senha: user.senha },
      role: user.role,
      clickedRole: user.role, // Adicionando o role clicado ao editar
      isEditMode: true,
    });
  };

  deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      this.fetchUsers();
      this.resetForm();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  resetForm = () => {
    this.setState({
      userData: { id: '', name: '', email: '', cpf: '', senha: '' },
      role: '',
      clickedRole: '', // Resetando o botão clicado
      isEditMode: false,
    });
  };

  render() {
    const { users, userData, isEditMode, clickedRole } = this.state;

    return (
      <div>
        <h1>Usuários</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              ID:
              <input
                type="text"
                name="id"
                value={userData.id}
                onChange={this.handleChange}
                disabled={isEditMode}
              />
            </label>
          </p>
          <p>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              E-mail:
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              CPF:
              <input
                type="text"
                name="cpf"
                value={userData.cpf}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Senha:
              <input
                type="password"
                name="senha"
                value={userData.senha}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <div className="form-group">
            <label>Eu sou:</label>
            <div className="role-buttons">
              <button
                type="button"
                onClick={() => this.handleRoleChange('Pet Walker')}
                className={`role-button ${clickedRole === 'Pet Walker' ? 'clicked' : ''}`}
              >
                Pet Walker
              </button>
              <button
                type="button"
                onClick={() => this.handleRoleChange('Tutor')}
                className={`role-button ${clickedRole === 'Tutor' ? 'clicked' : ''}`}
              >
                Tutor
              </button>
            </div>
          </div>
          <p>
            <button type="submit">{isEditMode ? 'Salvar Alteração' : 'Cadastrar'}</button>
            <button type="button" onClick={this.resetForm}>Limpar</button>
          </p>
        </form>
        <table>
          <thead>
            <tr><th>ID</th><th>Nome</th><th>E-mail</th><th>CPF</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td onClick={() => this.loadUser(user)}>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  <button type="button" onClick={() => this.loadUser(user)}>Alterar</button>
                  <button type="button" onClick={() => this.deleteUser(user.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
