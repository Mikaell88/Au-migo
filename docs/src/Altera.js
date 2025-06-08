import React from 'react';
import styles from './Altera.module.css';

const Altera = ({ usuarios, onEditar, onExcluir }) => (
  <div className={styles.listContainer}>
    <h2>Usuários Cadastrados</h2>
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>ID</th><th>Nome</th><th>E-mail</th><th>CPF</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u, i) => (
          <tr key={i}>
            <td>{u.id || i + 1}</td>
            <td>{u.nome}</td>
            <td>{u.email}</td>
            <td>{u.cpf}</td>
            <td>
              <button
                className={styles.actionButton}
                onClick={() => onEditar(i)}
              >
                Editar
              </button>
              <button
                className={styles.actionButton}
                onClick={() => onExcluir(i)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Altera;
