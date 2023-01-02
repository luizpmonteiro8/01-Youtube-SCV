import * as Styled from "./styles";

import { useEffect } from "react";
import { UserRegistration } from "components/pages/user";

export const UserTp = () => {
  useEffect(() => {
    document.title = "SCV - Sistema de controle de vendas";
  }, []);

  return (
    <Styled.Wrapper>
      <UserRegistration />
    </Styled.Wrapper>
  );
};
