import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    h1,
    h3 {
      margin: 0;
      padding: 0;
    }

    h1 {
      margin: 0 auto;
      width: fit-content;
    }
    a {
      cursor: pointer;
    }
  `}
`;

export const Table = styled.table`
  ${() => css`
    margin-top: 15px;
     {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    td,
    th {
      border: 1px solid #ddd;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #c4cbd7;
      color: white;
    }
  `}
`;

export const RowSpace = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const Search = styled.div`
  ${() => css`
    input {
      border-radius: 5px;
      border: 2px solid #a2a2a2;
      height: 35px;
    }
  `}
`;
