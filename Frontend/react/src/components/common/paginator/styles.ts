import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css``}
`;

export const Row = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 670px) {
      justify-content: center;
      width: 330px;
    }
    @media (max-width: 330px) {
      justify-content: center;

      width: auto;
    }
  `}
`;

export const Text = styled.div`
  ${() => css`
    border: 2px solid #9f9f9f;
    padding: 10px;
    font-size: 18px;
  `}
`;

export const Group = styled.div`
  ${() => css`
    display: flex;
  `}
`;

export const GroupText = styled.div`
  ${() => css`
    display: flex;

    @media (max-width: 520px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  `}
`;
