import * as Styled from "./styles";

import { Base } from "templates/base";
import { useEffect } from "react";
import { ClientRegistration } from "components/pages/client/registration";

export const ClientRegistrationTp = () => {
  useEffect(() => {
    document.title = "SCV - Cadastro de clientes";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <ClientRegistration />
      </Styled.Wrapper>
    </Base>
  );
};
