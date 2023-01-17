import styled, { css } from "styled-components";
import { ThemeType } from "theme";

type Props = {
  theme: ThemeType;
};

export const Wrapper = styled.div`
  ${() => css``}
`;

export const WrapperForm = styled.div`
  ${() => css`
    padding: 15px;
  `}
`;

export const Form = styled.form`
  ${() => css``}
`;

export const Row = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
  `}
`;

export const RowSpaceBetween = styled.div`
  ${() => css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  `}
`;

export const FormBody = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
  `}
`;

export const Table = styled.table`
  ${({ theme }: Props) => css`
    margin-top: 15px;
    margin: 0 auto;
     {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    td,
    th {
      border: 1px solid ${theme.tableBorderHeader};
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: ${theme.tableEven};
    }

    tr:hover {
      background-color: ${theme.tableHover};
    }

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: ${theme.tableHead};
      color: white;
    }
  `}
`;
