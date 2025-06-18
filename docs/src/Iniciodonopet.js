import React, { useEffect, useState } from 'react';
import styles from './iniciodonopet.module.css';

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
    setFormData({ ...formData, neighborhoods: [e.target.value] });
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

        <label className={styles.formLabel}>Tipo de Usuário:</label>
        <input
          className={styles.formInput}
          type="text"
          name="userType"
          value="Tutor"
          readOnly
          disabled
        />

        <label className={styles.formLabel}>Bairro:</label>
        <select
          className={styles.formInput}
          name="neighborhoods"
          value={formData.neighborhoods[0] || ''}
          onChange={handleNeighborhoodChange}
          required
        >
          <option value="" disabled>
            Selecione um bairro...
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

function InicioDonoPet() {
  const [tutorUser, setTutorUser] = useState(null);
  const [error, setError] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showWalkers, setShowWalkers] = useState(false);
  const [walkers, setWalkers] = useState([]);
  const [loadingWalkers, setLoadingWalkers] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [walkForm, setWalkForm] = useState({
    startTime: '',
    endTime: '',
  });
  const [walkError, setWalkError] = useState('');
  const [walkSuccess, setWalkSuccess] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notifError, setNotifError] = useState('');

  useEffect(() => {
    fetch(`${baseUrl}/user`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar usuários');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const lastTutor = [...data].reverse().find(u => u.userType === 'Tutor');
          if (lastTutor) setTutorUser(lastTutor);
        }
      })
      .catch(err => setError(err.message));
  }, [showEdit]);

  const handleShowWalkers = async () => {
    if (!tutorUser || !tutorUser.neighborhoods || !tutorUser.neighborhoods[0]) {
      setError('Selecione um bairro no seu perfil.');
      return;
    }
    setLoadingWalkers(true);
    setError('');
    setShowWalkers(true);
    try {
      const res = await fetch(
        `${baseUrl}/user/dog-walkers-by-neighborhood?neighborhood=${encodeURIComponent(tutorUser.neighborhoods[0])}`
      );
      if (!res.ok) throw new Error('Erro ao buscar Pet Walkers');
      const data = await res.json();
      setWalkers(data);
    } catch (err) {
      setError(err.message);
      setWalkers([]);
    } finally {
      setLoadingWalkers(false);
    }
  };

  const handleShowNotifications = async () => {
    if (!tutorUser || !tutorUser._id) return;
    setShowNotifications(true);
    setShowEdit(false);
    setShowWalkers(false);
    setNotifError('');
    setLoadingNotifications(true);
    try {
      const res = await fetch(`${baseUrl}/dog-walk/by-tutor?tutorId=${tutorUser._id}`);
      if (!res.ok) throw new Error('Erro ao buscar notificações');
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      setNotifError(err.message);
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.location}>
          <span role="img" aria-label="location">📍</span> Florianópolis - SC
        </div>
        <div className={styles.profileIcon}>
          <span role="img" aria-label="profile">👤</span>
        </div>
      </header>

      <main>
        <h1 className={styles.appTitle}>Tutor</h1>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {tutorUser && (
          <div className={styles.userCard}>
            <div>Nome: {tutorUser.name}</div>
            <div>Email: {tutorUser.email}</div>
            <div>CPF: {tutorUser.cpf}</div>
            <div>Bairro: {(tutorUser.neighborhoods || []).join(', ')}</div>
          </div>
        )}
        <div className={styles.dogImage}>
          <img src={`${process.env.PUBLIC_URL}/dog.png`} alt="Seu cachorro" />
        </div>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.appButton}
            onClick={() => {
              setShowEdit(!showEdit);
              setShowWalkers(false); // Hide walkers section when editing
              setShowNotifications(false); // Hide notifications section when editing
            }}
          >
            Editar Perfil
          </button>
          <button
            className={styles.appButton}
            onClick={async () => {
              setShowEdit(false); // Hide edit section when showing walkers
              setShowNotifications(false); // Hide notifications section when showing walkers
              await handleShowWalkers();
            }}
          >
            Contratar Pet Walker
          </button>
          <button className={styles.appButton}>Histórico</button>
          <button className={styles.appButton} onClick={handleShowNotifications}>
            Notificações
          </button>
        </div>
        {/* Move walkers list here, below the buttons */}
        {showEdit && tutorUser && (
          <EditUserForm
            user={tutorUser}
            onClose={() => setShowEdit(false)}
            onSuccess={() => setShowEdit(false)}
          />
        )}
        {showWalkers && (
          <div className={styles.userCard}>
            <strong>Pet Walkers no seu bairro:</strong>
            {loadingWalkers && <div>Carregando...</div>}
            {!loadingWalkers && walkers.length === 0 && (
              <div>Nenhum Pet Walker encontrado.</div>
            )}
            {!loadingWalkers && walkers.map(walker => (
              <div
                key={walker._id || walker.id}
                style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8, cursor: 'pointer' }}
                onClick={() => {
                  setSelectedWalker(walker);
                  setWalkForm({ startTime: '', endTime: '' });
                  setWalkError('');
                  setWalkSuccess('');
                }}
              >
                <div><b>Nome:</b> {walker.name}</div>
                <div><b>Email:</b> {walker.email}</div>
                <div><b>Bairros:</b> {(walker.neighborhoods || []).join(', ')}</div>
              </div>
            ))}
          </div>
        )}
        {selectedWalker && (
          <div className={styles.formContainer}>
            <h3>Solicitar Dog Walk para {selectedWalker.name}</h3>
            <form
              onSubmit={async e => {
                e.preventDefault();
                setWalkError('');
                setWalkSuccess('');
                try {
                  // Parse startTime and add 50 minutes for endTime
                  const start = new Date(walkForm.startTime);
                  const end = new Date(start.getTime() + 50 * 60000); // 50 min in ms

                  const payload = {
                    startTime: start.toISOString(),
                    endTime: end.toISOString(),
                    tutorId: tutorUser._id || tutorUser.id,
                    dogWalkerId: selectedWalker._id || selectedWalker.id,
                    status: 'Pending'
                  };
                  const res = await fetch(`${baseUrl}/dog-walk`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                  });
                  if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.message || 'Erro ao criar passeio');
                  }
                  setWalkSuccess('Passeio criado com sucesso!');
                  setSelectedWalker(null);
                } catch (err) {
                  setWalkError(err.message);
                }
              }}
            >
              <label className={styles.formLabel}>Início:</label>
              <input
                className={styles.formInput}
                type="datetime-local"
                value={walkForm.startTime}
                onChange={e => setWalkForm({ ...walkForm, startTime: e.target.value })}
                required
              />
              {/* Remove the Fim input */}
              <button className={styles.formButton} type="submit">Solicitar Passeio</button>
              <button
                type="button"
                className={styles.formButton}
                style={{ marginLeft: 8 }}
                onClick={() => setSelectedWalker(null)}
              >
                Cancelar
              </button>
              {walkError && <div style={{ color: 'red', marginTop: 8 }}>{walkError}</div>}
              {walkSuccess && <div style={{ color: 'green', marginTop: 8 }}>{walkSuccess}</div>}
            </form>
          </div>
        )}
        {showNotifications && (
          <div className={styles.userCard}>
            <strong>Notificações de Passeios Aceitos:</strong>
            {loadingNotifications && <div>Carregando...</div>}
            {notifError && <div style={{ color: 'red' }}>{notifError}</div>}
            {!loadingNotifications && notifications.length === 0 && (
              <div>Nenhuma notificação encontrada.</div>
            )}
            {!loadingNotifications && notifications.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                {msg}
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.AppFooter}>
        <span role="img" aria-label="paw" className={styles.mainButton}>🐾</span>
      </footer>
    </div>
  );
}

export default InicioDonoPet;
