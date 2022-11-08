import * as Styled from "./styles";

import { useEffect } from "react";
import { Base } from "templates/base";
import { ProductListing } from "components/pages/products/list";

export const ProductListTp = () => {
  useEffect(() => {
    document.title = "SCV - Lista de produtos";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <ProductListing />
      </Styled.Wrapper>
    </Base>
  );
};
