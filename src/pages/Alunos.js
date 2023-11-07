import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [serie, setSerie] = useState("");
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);

  const handleSearch = () => {
    const alunosFiltrados = alunos.filter((aluno) => aluno.series === serie);
    setAlunosFiltrados(alunosFiltrados);
  }

  useEffect(() => {
    axios.get("https://api-inclued.onrender.com/aluno/alunos")
      .then((response) => {
        setAlunos(response.data.alunos);
      })
      .catch((error) => {
        console.error("Erro ao buscar todos os alunos:", error);
      });
  }, []);

  return (
    <div className="Alunos">
      <div className="input-container">
        <select
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
        >
          <option value="">Selecione a série</option>
          <option value="1 Termo">1 Termo</option>
          <option value="2 Termo">2 Termo</option>
          <option value="3 Termo">3 Termo</option>
          <option value="4 Termo">4 Termo</option>
          <option value="5 Termo">5 Termo</option>
          <option value="6 Termo">6 Termo</option>
          
        </select>
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {serie ? (
          alunosFiltrados.map((aluno) => (
            <li key={aluno.id} className="aluno-item">
              <p className="name">Nome do Aluno: {aluno.name}</p>
              <p>Restrição: {aluno.restriction}</p>
              <p>Série: {aluno.series}</p>
            </li>
          ))
        ) : (
          alunos.map((aluno) => (
            <li key={aluno.id} className="aluno-item">
              <p className="name">Nome do Aluno: {aluno.name}</p>
              <p>Restrição: {aluno.restriction}</p>
              <p>Série: {aluno.series}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
