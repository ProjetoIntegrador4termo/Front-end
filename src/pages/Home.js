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
    }, [authState]);

    return (
        <div className='homeColor'>
            <section className='home'>
                <AuthContext.Provider value={{ authState, setAuthState }}>
                    {authState.status ? (
                        authState.tipo === "pai" ? (
                            <div className="homeText">
                                <h1>Bem-vindo {authState.username} ao Portal de Restrições Escolares!</h1>
                                <p>Nosso portal é dedicado a ajudar você a gerenciar as restrições escolares de forma eficiente e conveniente.</p>
                                <Link to="/restriction">
                                    <button className="button_1">Quero cadastrar meu filho</button>
                                </Link>
                            </div>
                        ) : authState.tipo === "professor" ? (
                            <div className="homeText">
                                <h1>Bem-vindo(a) professor(a) {authState.username} ao Portal de Restrições Escolares</h1>
                                <p>Aqui você pode ver todos os alunos que estão com restrições.</p>
                                <Link to="/alunos">
                                    <button className="button_1">Ver lista de alunos</button>
                                </Link>
                            </div>
                        ) : null
                    ) : (
                        <div className="homeText">
                            <h1>Bem-vindo ao Portal de Restrições Escolares!</h1>
                            <p>Preocupamo-nos com a segurança e bem-estar de todos os alunos em nossa escola. Este portal foi projetado para permitir que você, como pai ou responsável, registre e compartilhe informações essenciais sobre as restrições de seus filhos, garantindo que possamos oferecer o melhor ambiente de aprendizado para todos.</p>
                            <p>Para começar, basta fazer o login na sua conta ou criar uma nova conta se você ainda não o fez. Em seguida, adicione as informações das restrições do seu filho. Estamos aqui para ajudar e garantir que seu filho tenha uma experiência escolar positiva</p>
                            <p> Atenciosamente,</p>
                            <p>Equipe <strong>IncluED</strong></p>
                            <Link to="/Cadastro">
                                <button className="button_1">Quero criar minha conta</button>
                            </Link>
                        </div>
                    )}
                </AuthContext.Provider>
            </section>
        </div>
    );
}

export default Home;