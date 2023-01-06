import * as Styled from "./styles";

import { useEffect } from "react";
import { Base } from "templates/base";
import { UnityListing } from "components/pages/products/unity/list";

export const UnityListTp = () => {
  useEffect(() => {
    document.title = "SCV - Lista de unidades";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <UnityListing />
      </Styled.Wrapper>
    </Base>
  );
};
