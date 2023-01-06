import * as Styled from "./styles";

import { Base } from "templates/base";
import { useEffect } from "react";
import { ProductRegistration } from "components/pages/products/product/registration";

export const ProductRegistrationTp = () => {
  useEffect(() => {
    document.title = "SCV - Cadastro de produtos";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <ProductRegistration />
      </Styled.Wrapper>
    </Base>
  );
};
