import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    background: #f2f2f2;
    border-radius: 20px;
    box-shadow: 0 0 20px 8px #d0d0d0;
    padding: 15px;
    width: fit-content;
    margin: 0 auto;
    margin-top: 15px;

    p {
      padding: 0;
      margin: 0;
      font-family: "MontSerrat", "Arial";
      font-size: 25px;
      font-weight: 700;
    }
  `}
`;
