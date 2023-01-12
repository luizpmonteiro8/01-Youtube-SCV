import * as Styled from "./styles";

import { useEffect } from "react";
import { Base } from "templates/base";
import { ClientListing } from "components/pages/client/list";

export const ClientListTp = () => {
  useEffect(() => {
    document.title = "SCV - Lista de clientes";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <ClientListing />
      </Styled.Wrapper>
    </Base>
  );
};
