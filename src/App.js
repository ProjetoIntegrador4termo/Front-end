import "./App.css";
import logo from "./imagens/logoNav.svg"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Restriction from "./pages/Restriction";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
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
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="navbar">
            <div className="loggedInContainer">
              <img src={logo} /> 
              {authState.status && <button className="button_1" onClick={logout}> Logout</button>}
            </div>
          </nav>
          <Switch>
            <Route path="/restriction" exact component={Restriction} />
            <Route path="/login" exact component={Login} />
            <Route path="/cadastro" exact component={Registro} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;