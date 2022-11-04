import { Menu } from "../../common/menu";
import * as Styled from "./styles";

type Props = {
  children: React.ReactNode;
};

export const Base = ({ children }: Props) => {
  return (
    <Styled.Wrapper>
      <Menu />
      <Styled.Container>{children}</Styled.Container>
    </Styled.Wrapper>
  );
};
