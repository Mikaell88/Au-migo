import React, { useState } from 'react';
import styles from './Cadastro.module.css';  // nome exato do arquivo

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

const Cadastro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
    userType: '',
    neighborhoods: [], // New field for neighborhoods
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNeighborhoodChange = e => {
    const { options } = e.target;
    if (formData.userType === 'PetWalker') {
      // Multi-select for PetWalker
      const selected = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selected.push(options[i].value);
        }
      }
      setFormData({ ...formData, neighborhoods: selected });
    } else {
      // Single select for Tutor
      setFormData({ ...formData, neighborhoods: [e.target.value] });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = { ...formData };

      const response = await fetch(`${baseUrl}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao cadastrar usuário');
      }
      setSuccess('Usuário cadastrado com sucesso!');
      setFormData({ name: '', email: '', cpf: '', password: '', userType: '', neighborhoods: [] });
      onSubmit?.(formData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Cadastro de Usuário</h2>
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

        <label className={styles.formLabel}>Senha:</label>
        <input
          className={styles.formInput}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={4}
        />

        <label className={styles.formLabel}>Tipo de Usuário:</label>
        <select
          className={styles.formInput}
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          <option value="PetWalker">PetWalker</option>
          <option value="Tutor">Tutor</option>
        </select>

        {/* Show neighborhoods select only if userType is chosen */}
        {formData.userType && (
          <>
            <label className={styles.formLabel}>Bairro{formData.userType === 'PetWalker' ? 's' : ''}:</label>
            <select
              className={styles.formInput}
              name="neighborhoods"
              value={formData.neighborhoods}
              onChange={handleNeighborhoodChange}
              required
              multiple={formData.userType === 'PetWalker'}
            >
              <option value="" disabled>
                {formData.userType === 'PetWalker'
                  ? 'Selecione um ou mais bairros...'
                  : 'Selecione um bairro...'}
              </option>
              {neighborhoods.map(bairro => (
                <option key={bairro} value={bairro}>
                  {bairro}
                </option>
              ))}
            </select>
          </>
        )}

        <button className={styles.formButton} type="submit">
          Cadastrar
        </button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      </form>
    </div>
  );
};

export default Cadastro;
