import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css``}
`;

export const Row = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const Text = styled.div`
  ${() => css`
    border: 2px solid #9f9f9f;
    padding: 10px;
    font-size: 18px;
  `}
`;
