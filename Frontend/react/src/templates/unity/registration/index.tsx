import * as Styled from "./styles";

import { Base } from "templates/base";
import { useEffect } from "react";
import { UnityRegistration } from "components/pages/products/unity/registration";

export const UnityRegistrationTp = () => {
  useEffect(() => {
    document.title = "SCV - Cadastro de unidades";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <UnityRegistration />
      </Styled.Wrapper>
    </Base>
  );
};
