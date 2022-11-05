import * as Styled from "./styles";

type Props = {
  title: string;
  type: "green" | "blue" | "red" | "grey" | "black";
};

export const Button = ({ title, type }: Props) => {
  return (
    <Styled.Wrapper>
      {type == "green" && <button className="button button1">{title}</button>}
      {type == "blue" && <button className="button button2">{title}</button>}
      {type == "red" && <button className="button button3">{title}</button>}
      {type == "grey" && <button className="button button4">{title}</button>}
      {type == "black" && <button className="button button5">{title}</button>}
    </Styled.Wrapper>
  );
};
