import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        history.push("/");
      }
    });
  };
  return (
    <div className="divContainer">
      <div className="container">
        <h1 className="tituloLogin">Login</h1>
        <input
          type="text"
          className="form-field"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-field"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="div-bottom">
          <button className="button" onClick={login}> Login </button>
          <Link className="linkcria" to="/cadastro">Não tem uma conta? Crie aqui</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;