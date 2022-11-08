import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    height: 30px;
    padding: 10px;
    background-color: #c4cbd7;

    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      text-decoration: none;
      cursor: pointer;
    }
    p {
      font-family: "Montserrat", "Arial";
    }
    i {
      cursor: pointer;
    }
  `}
`;

export const Right = styled.div`
  ${() => css`
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 520px) {
      width: auto;
    }
  `}
`;

export const DropDown = styled.div`
  ${() => css`
    display: flex;
  `}
`;
