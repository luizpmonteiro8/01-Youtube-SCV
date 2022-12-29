import * as Styled from "./styles";
import * as Yup from "yup";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { useFormik } from "formik";
import { Credential } from "app";

type Props = {
  onSubmit: (credential: Credential) => void;
};

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = ({ onSubmit }: Props) => {
  const formik = useFormik<Credential>({
    initialValues,
    onSubmit,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido.")
        .required("Campo obrigatório."),
      password: Yup.string()
        .min(8, "Senha deve ter no mínimo 8 caracteres.")
        .required("Campo obrigatório."),
    }),
  });

  return (
    <Styled.Card>
      <Styled.Title>
        <h1>Login</h1>
      </Styled.Title>
      <Styled.Body>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Email"
            id="email"
            name="email"
            placeholder={"Digite o email"}
            width="100%"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <br />
          <Input
            label="Senha"
            id="password"
            name="password"
            placeholder={"Digite a senha"}
            width="100%"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />

          <p onClick={() => alert("Contate o administrador")}>
            Esqueceu a senha?
          </p>

          <Styled.ButtonSubmit>
            <Button type="submit" style="black" title="Enviar" />
          </Styled.ButtonSubmit>
        </form>
      </Styled.Body>
      <Styled.Option>
        <p>Cadastrar uma nova conta</p>
      </Styled.Option>
    </Styled.Card>
  );
};
