import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    margin-right: 15px;

    small {
      color: red;
    }
  `}
`;
