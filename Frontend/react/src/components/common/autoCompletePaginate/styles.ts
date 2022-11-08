import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin-bottom: 15px;
    .p-card-body {
      padding: 0;
    }
    button {
      height: 43px;
      width: 30px;
      border: 2px solid #ccc;
      display: flex;
      justify-content: center;
    }
    button i {
      margin-top: 7px;
    }
    small {
      margin: 0;
      padding: 0;
      color: #ff0000;
    }
    label {
      font-family: Arial, Helvetica, sans-serif;
      margin-bottom: 5px;
    }
  `}
`;

export const Row = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
  `}
`;

export const Item = styled.div`
  ${({ theme }) => css`
    padding: 8px;
    height: 45px;
    width: 220px;
    font-size: 18px;
    cursor: pointer;
    :hover {
      background-color: #eeeeee;
    }
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    width: 270px;
    background: #f2f2f2;
    border-radius: 5px;
    box-shadow: 0 0 20px 8px #d0d0d0;
    padding: 15px;
    width: fit-content;
    margin-top: -20px;
  `}
`;
