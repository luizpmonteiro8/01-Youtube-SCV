import * as Styled from "./styles";
import * as Yup from "yup";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { useFormik } from "formik";
import { User } from "app";
import { useRouter } from "next/router";

type Props = {
  onSubmit: (user: User) => void;
};

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export const UserForm = ({ onSubmit }: Props) => {
  const router = useRouter();
  const formik = useFormik<User>({
    initialValues,
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obrigatório."),
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
        <h1>Cadastro</h1>
      </Styled.Title>
      <Styled.Body>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Nome"
            id="name"
            name="name"
            placeholder={"Digite o nome"}
            width="100%"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <br />
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

          <Styled.ButtonSubmit>
            <Button
              type="button"
              style="blue"
              onClick={() => {
                router.push("/");
              }}
              title="Voltar"
            />
            <Button type="submit" style="black" title="Enviar" />
          </Styled.ButtonSubmit>
        </form>
      </Styled.Body>
    </Styled.Card>
  );
};
