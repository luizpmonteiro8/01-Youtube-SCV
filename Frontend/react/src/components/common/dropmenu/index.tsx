import * as Styled from "./styles";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const DropMenu = ({ title, children }: Props) => {
  return (
    <Styled.Wrapper>
      <div className="dropdown">
        <button className="dropbtn">{title}</button>
        <div className="dropdown-content">{children}</div>
      </div>
    </Styled.Wrapper>
  );
};
