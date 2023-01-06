import * as Styled from "./styles";

import { Base } from "templates/base";
import { useEffect } from "react";
import { CategoryRegistration } from "components/pages/products/category/registration";

export const CategoryRegistrationTp = () => {
  useEffect(() => {
    document.title = "SCV - Cadastro de categorias";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <CategoryRegistration />
      </Styled.Wrapper>
    </Base>
  );
};
