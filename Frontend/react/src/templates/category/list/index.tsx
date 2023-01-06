import * as Styled from "./styles";

import { useEffect } from "react";
import { Base } from "templates/base";
import { CategoryListing } from "components/pages/products/category/list";

export const CategoryListTp = () => {
  useEffect(() => {
    document.title = "SCV - Lista de categorias";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <CategoryListing />
      </Styled.Wrapper>
    </Base>
  );
};
