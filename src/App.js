import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import fundoHome from "./imagens/icons8-casa.svg"
import icone from "./imagens/icon.png"
import logoNav from "./imagens/logoNav.svg"
import PageNotFound from "./pages/PagNotFound";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Restriction from "./pages/Restriction";
import Home from "./pages/Home"
import AlunosList from "./pages/Alunos";
import EditarAluno from "./pages/EditarAluno";
import AlunosPerfil from "./pages/Perfil";

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("https://api-inclued.onrender.com/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            tipo: response.data.tipo,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.reload();

  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="navbar">
            <div className="loggedInContainer">
              <Link to="/"> 
                <img style={{ width: "5vw", height: "5vh" }}
                  src={fundoHome} />
              </Link>
              <Link to="/">
                <img style={{ width: "10vw", height: "10vh", margin: "3vw" }}
                  src={logoNav} />
              </Link>
              <div className="icons">
                {authState.status ? (
                  <>
                    <Link to="/perfil">
                      <img className="icon" src={icone} />
                    </Link>
                    <button className="button_1" onClick={logout}>Logout</button>
                  </>
                ) : (
                  <Link to="/login">
                    <button className="button_1">Login</button>
                  </Link>
                )}
              </div>
            </div>
          </nav>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/restriction" exact component={Restriction} />
            <Route path="/login" exact component={Login} />
            <Route path="/cadastro" exact component={Registro} />
            <Route path="/alunos" component={AlunosList} />
            <Route path="/perfil" component={AlunosPerfil} />
            <Route path="/editar-aluno/:id" component={EditarAluno} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;