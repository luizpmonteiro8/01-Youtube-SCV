import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `}
`;

export const Card = styled.div`
  ${() => css`
    margin: 25px;
    border-radius: 20px;
    box-shadow: 0 0 20px 8px #d0d0d0;
    padding: 15px;
    height: 80vh;
    width: 600px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    font-family: Arial, Helvetica, sans-serif;

    h1 {
      font-size: 50px;
    }

    small {
      font-size: 18px;
    }

    label {
      font-size: 25px;
    }

    input {
      font-size: 18px;
      border-radius: 5px;
      border: 2px solid #a2a2a2;
      height: 35px;
    }

    p {
      font-size: 20px;
      cursor: pointer;
    }

    p:hover {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
  `}
`;

export const Body = styled.div`
  ${() => css``}
`;

export const Title = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
  `}
`;

export const ButtonSubmit = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    margin-top: 15px;

    button {
      font-size: 26px !important;
    }
  `}
`;

export const Option = styled.div`
  ${() => css`
    display: flex;
    justify-content: end;
  `}
`;
