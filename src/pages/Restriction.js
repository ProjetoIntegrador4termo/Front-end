import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Restriction() {
    const initialValues = {
        name: "",
        restriction: "",
        series: "",
    };

    const history = useHistory();

    const onSubmit = (data) => {
        axios.post("http://localhost:6202/aluno", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((response) => {
                if (response.data.message === "Aluno criado com sucesso") {
                    alert("Aluno cadastrado com sucesso")
                    history.push("/"); 
                }
            })
            .catch((error) => {
                console.error("Erro ao enviar dados:", error);
            });
    };

    return (
        <div className="divContainer">
            <div className="container">
                <h1 className="tituloLogin">Aluno(a)</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <Field
                                name="name"
                                className="form-field"
                                placeholder="Nome Completo"
                            />

                            <ErrorMessage
                                component="span"
                                name="name"
                                className="form-error"
                            />
                        </div>
                        <div className="login-form-group">
                            <Field
                                name="restriction"
                                className="form-field"
                                placeholder="Restrições do aluno(a)"
                            />

                            <ErrorMessage
                                component="span"
                                name="restriction"
                                className="form-error"
                            />
                        </div>

                        <div className="login-form-group">
                            <Field
                                name="series"
                                as="select"
                                className="form-field"
                            >
                                <option className='selecionarSerie'>Selecione a série</option>
                                <option value="1 Termo">1 Termo</option>
                                <option value="2 Termo">2 Termo</option>
                                <option value="3 Termo">3 Termo</option>
                                <option value="4 Termo">4 Termo</option>
                                <option value="5 Termo">5 Termo</option>
                                <option value="6 Termo">6 Termo</option>
                            </Field>
                        </div>

                        <button className="button" type="submit">
                            Cadastrar
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Restriction;
