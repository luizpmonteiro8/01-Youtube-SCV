import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    margin-right: 15px;

    small {
      color: red;
    }

    input {
      border-radius: 5px;
      border: 2px solid #a2a2a2;
      height: 35px;
    }
  `}
`;
