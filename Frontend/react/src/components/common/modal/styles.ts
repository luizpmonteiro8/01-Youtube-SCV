import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);

    h2 {
      margin: 0;
      padding: 0;
    }
  `}
`;

export const Content = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    padding: 15px;
    margin: 0 auto;
    height: 250px;
    width: 250px;
    background-color: #fff;
    border-radius: 15px;
    justify-content: space-between;
  `}
`;

export const Title = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  `}
`;

export const Row = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  `}
`;
