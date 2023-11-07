import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registro() {
  const history = useHistory();

  const initialValues = {
    username: "",
    password: "",
    confirmaSenha: "",
    cpf: "",
    tipo: "pai"
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required("O nome é obrigatório"),

    password: Yup.string()
      .min(4, "A senha deve ter pelo menos 4 caracteres")
      .max(20)
      .required("A senha é obrigatória"),

    confirmaSenha: Yup.string()
      .oneOf([Yup.ref("password"), null], "As senhas não são iguais"),

    cpf: Yup.string() // Validar o CPF
      .matches(/^\d{11}$/, "CPF inválido") // Adicione uma validação adequada para o formato do CPF
      .required("O CPF é obrigatório"),
  });

  const onSubmit = (data) => {
    axios.post("https://api-inclued.onrender.com/auth", data).then(() => {
      history.push("/login");
    });
  };

  return (
    <div className="divContainer">
      <div className="container">
        <h1 className="tituloLogin">Cadastro</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="login-form">
            <div className="login-form-group">
              <Field
                name="username"
                className="form-field"
                placeholder="Nome"
              />
              <ErrorMessage
                component="span"
                name="username"
                className="form-error"
              />
            </div>
            <div className="login-form-group">
              <Field
                type="password"
                name="password"
                className="form-field"
                placeholder="Senha"
              />
              <ErrorMessage
                type="password"
                component="span"
                name="password"
                className="form-error"
              />
            </div>
            <div className="login-form-group">
              <Field
                type="password"
                name="confirmaSenha"
                className="form-field"
                placeholder="Confirme sua senha"
              />
              <ErrorMessage
                type="password"
                component="span"
                name="confirmaSenha"
                className="form-error"
              />
            </div>
            <div className="login-form-group">
              <Field
                name="cpf"
                className="form-field"
                placeholder="CPF"
              />
              <ErrorMessage
                component="span"
                name="cpf"
                className="form-error"
              />
            </div>
            <label htmlFor="tipo" className="form-label">
              Tipo de Usuário:
            </label>
            <Field as="select" name="tipo" className="form-field">
              <option value="pai">Pais</option>
              <option value="professor">Professor</option>
            </Field>
            <ErrorMessage component="span" name="tipo" className="form-error" />

            <button className="button" type="submit">
              Cadastrar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registro;
