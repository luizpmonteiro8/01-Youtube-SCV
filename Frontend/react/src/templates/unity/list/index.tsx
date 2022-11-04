import * as Styled from "./styles";

import { useEffect } from "react";
import { UnityList } from "../../../common/pages/unity/list";
import { Base } from "../../base";

export const UnityListTp = () => {
  useEffect(() => {
    document.title = "SCV - lista de unidades";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <UnityList />
      </Styled.Wrapper>
    </Base>
  );
};
