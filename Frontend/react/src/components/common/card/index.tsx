import * as Styled from "./styles";
type Props = {
  title: string;
  children: React.ReactNode;
  width?: string;
};

export const Card = ({ title, children, width }: Props) => {
  return (
    <Styled.Wrapper style={width ? { maxWidth: width } : {}}>
      <div>
        <p>{title}</p>
      </div>
      <div>{children}</div>
    </Styled.Wrapper>
  );
};
