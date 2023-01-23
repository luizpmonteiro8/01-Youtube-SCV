import * as Styled from "./styles";

import { useEffect } from "react";
import { Base } from "templates/base";
import { DashboardListing } from "components/pages/dashboard/list";

export const DashboardListTp = () => {
  useEffect(() => {
    document.title = "SCV - Sistema de controle de vendas";
  }, []);

  return (
    <Base>
      <Styled.Wrapper>
        <DashboardListing />
      </Styled.Wrapper>
    </Base>
  );
};
