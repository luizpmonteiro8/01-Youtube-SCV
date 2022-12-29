import * as Styled from "./styles";
import { LoginForm } from "./form";
import { Credential } from "app";
import { signIn } from "next-auth/react";
import { SnackBar } from "components/common/snackBar";
import { useRouter } from "next/router";
import { useState } from "react";

export const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState({ text: "" });

  const handleSubmit = async (credential: Credential) => {
    const resp = await signIn("credentials", {
      redirect: false,
      email: credential.email,
      password: credential.password,
    });

    if (resp!.ok) {
      router.push("/listar/unidades");
    } else {
      setMessage({ text: resp?.error! });
    }
  };

  return (
    <Styled.Wrapper>
      <LoginForm onSubmit={handleSubmit} />
      <SnackBar message={message} />
    </Styled.Wrapper>
  );
};
