import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
function EditAluno() {
    const initialValues = {
        name: "",
        restriction: "",
        series: "",
    };

    const history = useHistory();
    const { id } = useParams();
    const [aluno, setAluno] = useState(null); 

    useEffect(() => {
        axios.get(`http://localhost:6202/aluno/aluno/${id}`, { 
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((response) => {
                setAluno(response.data.aluno); 
            })
            .catch((error) => {
                console.error("Erro ao carregar detalhes do aluno:", error);
            });
    }, [id]);

    const onSubmit = (data) => {
        axios.put(`http://localhost:6202/aluno/editar/${id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((response) => {
                if (response.data.message === "Aluno atualizado com sucesso") {
                    alert("Aluno atualizado com sucesso");
                    history.push("/");
                }
            })
            .catch((error) => {
                console.error("Erro ao atualizar aluno:", error);
            });
    };

    if (aluno === null) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="divContainer">
            <div className="container">
                <h1 className="tituloLogin">Editar Aluno</h1>
                <Formik
                    initialValues={aluno}
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
                                <option value="">Selecione a série</option>
                                <option value="1 Termo">1 Termo</option>
                                <option value="2 Termo">2 Termo</option>
                                <option value="3 Termo">3 Termo</option>
                                <option value="4 Termo">4 Termo</option>
                                <option value="5 Termo">5 Termo</option>
                                <option value="6 Termo">6 Termo</option>
                            </Field>
                        </div>

                        <button className="button" type="submit">
                            Atualizar
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default EditAluno;
