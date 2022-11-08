import * as Styled from "./styles";

type Props = {
  title: string;
  type?: "button" | "submit" | "reset";
  style: "green" | "blue" | "red" | "grey" | "black";
  onClick?: (e: any) => void;
};

export const Button = ({ title, type = "button", style, onClick }: Props) => {
  return (
    <Styled.Wrapper>
      {style == "green" && (
        <button type={type} className="button button1" onClick={onClick}>
          {title}
        </button>
      )}
      {style == "blue" && (
        <button type={type} className="button button2" onClick={onClick}>
          {title}
        </button>
      )}
      {style == "red" && (
        <button type={type} className="button button3" onClick={onClick}>
          {title}
        </button>
      )}
      {style == "grey" && (
        <button type={type} className="button button4" onClick={onClick}>
          {title}
        </button>
      )}
      {style == "black" && (
        <button type={type} className="button button5" onClick={onClick}>
          {title}
        </button>
      )}
    </Styled.Wrapper>
  );
};
