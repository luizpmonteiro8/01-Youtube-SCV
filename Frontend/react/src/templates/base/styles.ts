import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    h1,
    h3 {
      margin: 0;
      padding: 0;
    }

    a {
      cursor: pointer;
    }

    font-family: Arial, Helvetica, sans-serif;
  `}
`;

export const Container = styled.div`
  ${() => css``}
`;
