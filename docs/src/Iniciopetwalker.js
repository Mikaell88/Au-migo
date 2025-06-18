import React, { useEffect, useState } from 'react';
import styles from './iniciopetwalker.module.css';

const baseUrl = process.env.API_BASE_URL || 'http://localhost:3002';

const neighborhoods = [
  'Centro',
  'Trindade',
  'Ingleses',
  'Campeche',
  'Coqueiros',
  'Estreito',
  'Itacorubi',
  'Jurerê',
  'Lagoa da Conceição',
  'Saco dos Limões',
];

function EditUserForm({ user, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    cpf: user.cpf || '',
    neighborhoods: user.neighborhoods || [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNeighborhoodChange = e => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData({ ...formData, neighborhoods: selected });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = { ...formData };

      const response = await fetch(`${baseUrl}/user/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao alterar usuário');
      }
      setSuccess('Usuário alterado com sucesso!');
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>Nome:</label>
        <input
          className={styles.formInput}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className={styles.formLabel}>E-mail:</label>
        <input
          className={styles.formInput}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className={styles.formLabel}>CPF:</label>
        <input
          className={styles.formInput}
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />

        {/* Show userType as read-only */}
        <label className={styles.formLabel}>Tipo de Usuário:</label>
        <input
          className={styles.formInput}
          type="text"
          name="userType"
          value="PetWalker"
          readOnly
          disabled
        />

        <label className={styles.formLabel}>Bairros:</label>
        <select
          className={styles.formInput}
          name="neighborhoods"
          value={formData.neighborhoods}
          onChange={handleNeighborhoodChange}
          required
          multiple
        >
          <option value="" disabled>
            Selecione um ou mais bairros...
          </option>
          {neighborhoods.map(bairro => (
            <option key={bairro} value={bairro}>
              {bairro}
            </option>
          ))}
        </select>

        <button className={styles.formButton} type="submit">
          Alterar
        </button>
        <button type="button" className={styles.formButton} onClick={onClose} style={{marginLeft: 8}}>
          Cancelar
        </button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      </form>
    </div>
  );
}

function App() {
  const [petWalkerUser, setPetWalkerUser] = useState(null);
  const [error, setError] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [solicitations, setSolicitations] = useState([]);
  const [loadingSolicitations, setLoadingSolicitations] = useState(false);
  const [notifError, setNotifError] = useState('');
  const [notifSuccess, setNotifSuccess] = useState('');

  useEffect(() => {
    fetch(`${baseUrl}/user`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const lastPetWalker = [...data].reverse().find(u => u.userType === 'PetWalker');
          if (lastPetWalker) setPetWalkerUser(lastPetWalker);
        }
      })
      .catch(err => setError(err.message));
  }, [showEdit]);

  const handleShowNotifications = async () => {
    if (!petWalkerUser || !petWalkerUser._id) return;
    setShowNotifications(true);
    setShowEdit(false);
    setNotifError('');
    setNotifSuccess('');
    setLoadingSolicitations(true);
    try {
      const res = await fetch(`${baseUrl}/dog-walk/pending-by-dogwalker?dogWalkerId=${petWalkerUser._id}`);
      if (!res.ok) throw new Error('Erro ao buscar solicitações');
      const data = await res.json();
      setSolicitations(data);
    } catch (err) {
      setNotifError(err.message);
      setSolicitations([]);
    } finally {
      setLoadingSolicitations(false);
    }
  };

  const handleAccept = async (walkId) => {
    setNotifError('');
    setNotifSuccess('');
    try {
      const res = await fetch(`${baseUrl}/dog-walk/${walkId}/accept`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dogWalkerId: petWalkerUser._id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erro ao aceitar passeio');
      }
      setNotifSuccess('Passeio aceito!');
      // Refresh list
      handleShowNotifications();
    } catch (err) {
      setNotifError(err.message);
    }
  };

  const handleDecline = async (walkId) => {
    setNotifError('');
    setNotifSuccess('');
    try {
      const res = await fetch(`${baseUrl}/dog-walk/${walkId}/decline`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dogWalkerId: petWalkerUser._id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erro ao recusar passeio');
      }
      setNotifSuccess('Passeio recusado!');
      // Refresh list
      handleShowNotifications();
    } catch (err) {
      setNotifError(err.message);
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.location}>
          <span role="img" aria-label="location">📍</span> Florianópolis - SC
        </div>
        <div className={styles.profileIcon}>
          <span role="img" aria-label="profile">👤</span>
        </div>
      </header>
      <main>
        <h1 className={styles.appTitle}>PetWalker</h1>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {petWalkerUser && (
          <div className={styles.userCard}>
            <div>Nome: {petWalkerUser.name}</div>
            <div>Email: {petWalkerUser.email}</div>
            <div>CPF: {petWalkerUser.cpf}</div>
            <div>Bairros: {(petWalkerUser.neighborhoods || []).join(', ')}</div>
          </div>
        )}
        <div className={styles.buttonsContainer}>
          <button
            className={styles.appButton}
            onClick={() => {
              setShowEdit(!showEdit);
              setShowNotifications(false);
            }}
          >
            Editar Perfil
          </button>
          <button className={styles.appButton}>Localização</button>
          <button
            className={styles.appButton}
            onClick={handleShowNotifications}
          >
            Notificações
          </button>
          <button className={styles.appButton}>Histórico</button>
        </div>
        {showEdit && petWalkerUser && (
          <EditUserForm
            user={petWalkerUser}
            onClose={() => setShowEdit(false)}
            onSuccess={() => setShowEdit(false)}
          />
        )}
        {showNotifications && (
          <div className={styles.userCard}>
            <strong>Solicitações de Passeio:</strong>
            {loadingSolicitations && <div>Carregando...</div>}
            {notifError && <div style={{ color: 'red' }}>{notifError}</div>}
            {notifSuccess && <div style={{ color: 'green' }}>{notifSuccess}</div>}
            {!loadingSolicitations && solicitations.length === 0 && (
              <div>Nenhuma solicitação encontrada.</div>
            )}
            {!loadingSolicitations && solicitations.map(walk => (
              <div key={walk._id} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                <div><b>Tutor:</b> {walk.tutorId?.name || walk.tutorId}</div>
                <div><b>Início:</b> {new Date(walk.startTime).toLocaleString()}</div>
                <div><b>Status:</b> {walk.status}</div>
                <button
                  className={styles.formButton}
                  style={{ marginRight: 8 }}
                  onClick={() => handleAccept(walk._id)}
                >
                  Aceitar
                </button>
                <button
                  className={styles.formButton}
                  onClick={() => handleDecline(walk._id)}
                >
                  Recusar
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={styles.dogImage}>
          {/* Aqui pode colocar uma imagem, se desejar */}
        </div>
      </main>
      <footer className={styles.appFooter}>
        <span role="img" aria-label="paw" className={styles.mainButton}>🐾</span>
      </footer>
    </div>
  );
}

export default App;
