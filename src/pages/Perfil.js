import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AlunosPerfil() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    axios
      .get("https://api-inclued.onrender.com/aluno/cadastrados", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setAlunos(response.data.alunos);
      })
      .catch((error) => {
        console.error("Erro ao buscar alunos cadastrados pelo usuário:", error);
      });
  }, []);

  const handleExcluirAluno = (alunoId) => {
    axios
      .delete(`https://api-inclued.onrender.com/aluno/excluir/${alunoId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setAlunos(alunos.filter((aluno) => aluno.id !== alunoId));
      })
      .catch((error) => {
        console.error("Erro ao excluir aluno:", error);
      });
  };

  return (
    <div>
      <h1 style={{ color: "#333333", marginLeft: "3rem" }}>Seus Alunos cadastrados</h1>
      <ul className="aluno-list">
        {alunos && alunos.length > 0 ? (
          alunos.map((aluno) => (
            <li key={aluno.id} className="aluno-item">
              <p className="name">{aluno.name}</p>
              <p>Restrição: {aluno.restriction}</p>
              <p>Série: {aluno.series}</p>
              <Link to={`/editar-aluno/${aluno.id}`} className="button">
                Editar
              </Link>
              <button
                onClick={() => handleExcluirAluno(aluno.id)}
                className="button button_2"
              >
                Excluir
              </button>
            </li>
          ))
        ) : (
          <div style={{ marginLeft: "1rem" }}>
            <p>Você ainda não cadastrou nenhum aluno.</p>
            <Link className="button" to="/Restriction">
              Cadastre aqui
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
}

export default AlunosPerfil;
