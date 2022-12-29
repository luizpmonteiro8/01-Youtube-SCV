import * as Styled from "./styles";

import { Base } from "templates/base";
import { UnityListing } from "components/pages/unity/list";
import { UnityRegistration } from "components/pages/unity/registration";
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
