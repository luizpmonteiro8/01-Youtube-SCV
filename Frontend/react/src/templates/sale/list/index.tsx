import * as Styled from "./styles";

import { useEffect } from "react";
import { Base } from "templates/base";
import { SaleListing } from "components/pages/sale/list";

export const SaleListTp = () => {
  useEffect(() => {
    document.title = "SCV - Lista de vendas";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <SaleListing />
      </Styled.Wrapper>
    </Base>
  );
};
