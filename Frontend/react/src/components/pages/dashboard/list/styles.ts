import styled, { css } from "styled-components";
import { ThemeType } from "theme";

type Props = {
  theme: ThemeType;
};

export const Wrapper = styled.div`
  ${() => css`
    .textWelcome {
      font-family: "Arial";
      font-size: 35px;
    }
    h1 {
      margin: 0 auto;
      width: fit-content;
    }

    p {
      padding: 0;
      margin: 0;
      font-family: "MontSerrat", "Arial";
      font-size: 18px;
      font-weight: 700;
    }
  `}
`;

export const Card = styled.div`
  ${() => css`
    border-radius: 5px;
    padding: 15px;
    width: fit-content;
    margin: 0 auto;
    margin-top: 15px;

    p {
      color: white;
    }
  `}
`;

export const Row = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
  `}
`;

export const Menu = styled.div`
  ${() => css`
    padding: 5px;
    border: 1px dotted black;
    background-color: aliceblue;
    ul {
      width: fit-content;
      list-style-type: circle;
      font-size: 25px;
      line-height: 180%;
      cursor: pointer;
    }

    p {
      text-align: center;
      margin-bottom: 15px;
    }
  `}
`;
