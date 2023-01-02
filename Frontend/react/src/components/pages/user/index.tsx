import * as Styled from "./styles";
import { UserForm } from "./form";
import { User, useUserService } from "app";
import { SnackBar } from "components/common/snackBar";
import { useState } from "react";

export const UserRegistration = () => {
  const userService = useUserService();
  const [message, setMessage] = useState({ text: "" });

  const handleSubmit = async (user: User) => {
    userService
      .create(user)
      .then((_) => {
        setMessage({ text: "Criado com sucesso." });
      })
      .catch((err) => {
        err.response?.data?.message
          ? setMessage({ text: err.response.data.message })
          : setMessage({ text: "Ocorreu um erro." });
      });
  };

  return (
    <Styled.Wrapper>
      <UserForm onSubmit={handleSubmit} />
      <SnackBar message={message} />
    </Styled.Wrapper>
  );
};
