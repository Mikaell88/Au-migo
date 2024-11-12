import React, { Component } from 'react';
import axios from 'axios';
import './Cadastro.css';

axios.defaults.baseURL = "http://localhost:3001";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userData: { name: '', email: '', cpf: '', password: '' },
      isEditMode: false,
      role: '',
      clickedRole: '',
      successMessage: ''
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('/user');
      // Mapeia os usuários para garantir que o campo `_id` seja referenciado como `id`
      const users = response.data.map(user => ({ ...user, id: user._id }));
      this.setState({ users });
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };
  
  

  handleRoleChange = (role) => {
    this.setState({ role, clickedRole: role });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [name]: value,
      }
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userData, role, isEditMode } = this.state;
  
    // Criação do payload com os campos necessários
    const { id, name, email, password, cpf } = userData;
    const payload = {
      name,
      email,
      password: password ? password : undefined,  // Inclui password apenas se ele existir
      cpf,
      userType: role  // Ajuste do tipo de usuário
    };
  
    console.log("Payload para PUT:", payload);  // Loga o payload para verificação
  
    // Verifica se ID está presente no modo de edição
    if (isEditMode && !id) {
      console.error("ID do usuário ausente ao tentar atualizar.");
      return;
    }
  
    try {
      if (isEditMode) {
        // Realiza a requisição PUT com o ID
        await axios.put(`/user/${id}`, payload);
      } else {
        // Realiza a requisição POST para criar um novo usuário
        const response = await axios.post('/user', payload);
        this.setState({ 
          successMessage: 'Cadastro realizado com sucesso!',
          users: [...this.state.users, response.data],
        });
      }
      this.resetForm();
      this.fetchUsers();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };
  
  
  

  loadUser = (user) => {
    console.log("Carregando usuário:", user);  // Verifique que `user` agora contém `id` após o mapeamento
    this.setState({
      userData: { 
        name: user.name, 
        email: user.email, 
        cpf: user.cpf, 
        password: user.password,
        id: user.id  // Agora `id` estará disponível para edição
      },
      role: user.role,
      clickedRole: user.role,
      isEditMode: true,
    });
  };
  
  

  deleteUser = async (_id) => {
    try {
      await axios.delete(`/user/${_id}`);  // Deletando usando _id
      this.fetchUsers();  // Atualiza a lista de usuários
      this.resetForm();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  resetForm = () => {
    this.setState({
      userData: { name: '', email: '', cpf: '', password: '' },
      role: '',
      clickedRole: '',
      isEditMode: false,
      successMessage: ''
    });
  };

  render() {
    const { users, userData, isEditMode, clickedRole, successMessage } = this.state;

    return (
      <div>
        <h1>Usuários</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={this.handleSubmit}>
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
                name="password"
                value={userData.password}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <div className="form-group">
            <label>Eu sou:</label>
            <div className="role-buttons">
              <button
                type="button"
                onClick={() => this.handleRoleChange('PetWalker')}
                className={`role-button ${clickedRole === 'PetWalker' ? 'clicked' : ''}`}
              >
                PetWalker
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
            {users.map((user, index) => (
              <tr key={user._id || index}>
                <td>{user._id}</td>{/* Exibindo o _id */}
                <td onClick={() => this.loadUser(user)}>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>{user.cpf}</td><td>
                <button type="button" onClick={() => this.loadUser(user)}>Alterar</button>
                <button type="button" onClick={() => this.deleteUser(user._id)}>Excluir</button>
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
