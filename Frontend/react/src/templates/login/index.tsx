import * as Styled from "./styles";

import { useEffect } from "react";
import { Login } from "components/pages/login";

export const LoginTp = () => {
  useEffect(() => {
    document.title = "SCV - Sistema de controle de vendas";
  }, []);

  return (
    <Styled.Wrapper>
      <Login />
    </Styled.Wrapper>
  );
};
