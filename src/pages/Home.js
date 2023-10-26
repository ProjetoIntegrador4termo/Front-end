import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";


function Home() {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios
            .get("http://localhost:6202/auth/auth", {
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

    return (
        <div className='homeColor'>
            <section className='home'>

                <AuthContext.Provider value={{ authState, setAuthState }}>
                    {authState.status ? (
                        authState.tipo === "pai" ? (
                            <div className="homeText">
                                <h1>Bem-vindo ao Portal de Restrições Escolares (Pais)!</h1>
                                <p>Esta é a mensagem para pais.</p>
                                <Link to="/restriction">
                                    <button className="button_1">Quero cadastrar meu filho</button>
                                </Link>
                            </div>
                        ) : authState.tipo === "professor" ? (
                            <div className="homeText">
                                <h1>Bem-vindo ao Portal de Restrições Escolares {authState.username}</h1>
                                <p>Aqui você pode ver todos os alunos que estão com restrições.</p>
                                <Link to="/alunos">
                                    <button className="button_1">Ver lista de alunos</button>
                                </Link>
                            </div>
                        ) : null
                    ) : (
                        <div className="homeText">
                            <h1>Bem-vindo ao Portal de Restrições Escolares!</h1>
                            <p>Esta é a mensagem padrão para usuários não autenticados.</p>
                            <Link to="/login">
                                <button className="button_1">Login</button>
                            </Link>
                        </div>
                    )}
                </AuthContext.Provider>
            </section>
        </div>
    );
}

export default Home;