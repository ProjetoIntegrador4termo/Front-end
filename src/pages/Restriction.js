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
        axios.post("http://localhost:3001/aluno", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((response) => {
                if (response.data.message === "Aluno criado com sucesso") {
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
                <h1 className="tituloLogin">Aluno</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <Field
                                name="name"
                                className="form-field"
                                placeholder="Nome"
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
                                placeholder="Restrição do aluno"
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
                                className="form-field"
                                placeholder="Série do aluno"
                            />

                            <ErrorMessage
                                component="span"
                                name="series"
                                className="form-error"
                            />
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
