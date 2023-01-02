import styled, { css } from "styled-components";
import { ThemeType } from "theme";

type Props = {
  theme: ThemeType;
};

export const Wrapper = styled.div`
  ${({ theme }: Props) => css`
    height: 30px;
    padding: 10px;
    background-color: ${theme.menuBG};

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

export const Logout = styled.div`
  ${() => css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `}
`;
