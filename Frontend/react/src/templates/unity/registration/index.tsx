import * as Styled from "./styles";

import { Base } from "templates/base";
import { UnityListing } from "components/pages/unity/list";
import { UnityRegistration } from "components/pages/unity/registration";
import { useEffect } from "react";

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
