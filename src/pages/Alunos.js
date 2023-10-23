import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    // Fazer uma solicitação GET para buscar todos os alunos
    axios.get("http://localhost:3001/aluno/alunos")
      .then((response) => {
        setAlunos(response.data.alunos);
      })
      .catch((error) => {
        console.error("Erro ao buscar todos os alunos:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Lista de Alunos</h1>  
      <ul style={{ listStyle: "none", padding: 0 }}>
        {alunos.map((aluno) => (
          <li key={aluno.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", backgroundColor: "#f9f9f9" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>Nome do Aluno: {aluno.name}</p>
            <p style={{ fontSize: "16px", color: "#666" }}>Restrição: {aluno.restriction}</p>
            <p style={{ fontSize: "16px", color: "#666" }}>Série: {aluno.series}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
