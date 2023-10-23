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

    return (

        <section className='home'>

            <div className="homeText">
                <h1>Bem-vindo ao Portal de Restrições Escolares!</h1>
                <p>Preocupamo-nos com a segurança e bem-estar de todos os alunos em nossa escola. Este portal foi projetado para permitir que você, como pai ou responsável, registre e compartilhe informações essenciais sobre as restrições de seus filhos, garantindo que possamos oferecer o melhor ambiente de aprendizado para todos.</p>
                <p><strong>Aqui estão alguns dos benefícios deste portal:</strong></p>
                <ul>
                    <li>Informações de Segurança: Ao nos fornecer informações sobre alergias, restrições alimentares, condições médicas e outras necessidades especiais, estamos melhor preparados para cuidar de seus filhos durante o dia escolar.</li>
                    <li>Comunicação Eficiente: Facilitamos a comunicação entre você, a escola e o pessoal do refeitório. Se houver atualizações nas restrições de seu filho, você pode atualizar facilmente suas informações.</li>
                    <li>Tranquilidade: Sabemos que a segurança de seus filhos é uma prioridade. Com suas informações, podemos tomar medidas proativas para garantir que seu filho tenha um ambiente de aprendizado seguro e saudável.</li>
                </ul>
                <p>Para começar, basta fazer o login na sua conta ou criar uma nova conta se você ainda não o fez. Em seguida, adicione as informações das restrições do seu filho. Estamos aqui para ajudar e garantir que seu filho tenha uma experiência escolar positiva</p>
                <p>Seja bem-vindo ao Portal de Restrições Escolares!</p>
                <p> Atenciosamente,</p>
                <p>Equipe <strong>IncluED</strong></p>
                <AuthContext.Provider value={{ authState, setAuthState }}>
                    {authState.status ? (
                        <Link to="/restriction">
                            <button className="button_1">Quero cadastrar meu filho</button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button className="button_1">Login</button>
                        </Link>
                    )}
                </AuthContext.Provider>
            </div>
        </section>
    );
}

export default Home;