import React, { useState } from 'react';
import styles from './cadastro.module.css';  // nome exato do arquivo

const Cadastro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData({ nome: '', email: '', cpf: '', senha: '' });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>Nome:</label>
        <input
          className={styles.formInput}
          type="text"
          name="nome"
          value={formData.nome}
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
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <button className={styles.formButton} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
