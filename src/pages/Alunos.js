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
    axios.get("http://localhost:6202/aluno/alunos")
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
        <input
          type="text"
          placeholder="Digite a série"
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {serie ? (
          alunosFiltrados.map((aluno) => (
            <li key={aluno.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", backgroundColor: "#f9f9f9" }}>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>Nome do Aluno: {aluno.name}</p>
              <p style={{ fontSize: "16px", color: "#666" }}>Restrição: {aluno.restriction}</p>
              <p style={{ fontSize: "16px", color: "#666" }}>Série: {aluno.series}</p>
            </li>
          ))
        ) : (
          alunos.map((aluno) => (
            <li key={aluno.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", backgroundColor: "#f9f9f9" }}>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>Nome do Aluno: {aluno.name}</p>
              <p style={{ fontSize: "16px", color: "#666" }}>Restrição: {aluno.restriction}</p>
              <p style={{ fontSize: "16px", color: "#666" }}>Série: {aluno.series}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
