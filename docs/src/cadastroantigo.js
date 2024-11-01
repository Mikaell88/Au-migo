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





axios.defaults.baseURL = 'http://localhost:8080';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userData: { id: '', name: '', email: '', cpf: '', senha: '' },
      isEditMode: false,
      role: '', // Adicionado o role aqui
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
    this.setState({ role });
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
      isEditMode: false,
    });
  };

  render() {
    const { users, userData, isEditMode, role } = this.state;

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
                className={role === 'Pet Walker' ? 'active' : ''}
              >
                Pet Walker
              </button>
              <button
                type="button"
                onClick={() => this.handleRoleChange('Tutor')}
                className={role === 'Tutor' ? 'active' : ''}
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

export default ;
