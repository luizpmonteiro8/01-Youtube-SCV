import * as Styled from "./styles";

import { Base } from "templates/base";
import { useEffect } from "react";
import { SaleRegistration } from "components/pages/sale/registration";

export const SaleRegistrationTp = () => {
  useEffect(() => {
    document.title = "SCV - Cadastro de venda";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <SaleRegistration />
      </Styled.Wrapper>
    </Base>
  );
};
