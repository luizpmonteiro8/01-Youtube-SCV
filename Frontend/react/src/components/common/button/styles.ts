import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${() => css`
    .button {
      background-color: #4caf50; /* Green */
      border: none;
      color: white;
      padding: 10px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      transition-duration: 0.4s;
      cursor: pointer;
    }

    .button1 {
      background-color: white;
      color: black;
      border: 2px solid #4caf50;
    }

    .button1:hover {
      background-color: #4caf50;
      color: white;
    }

    .button2 {
      background-color: white;
      color: black;
      border: 2px solid #008cba;
    }

    .button2:hover {
      background-color: #008cba;
      color: white;
    }

    .button3 {
      background-color: white;
      color: black;
      border: 2px solid #f44336;
    }

    .button3:hover {
      background-color: #f44336;
      color: white;
    }

    .button4 {
      background-color: white;
      color: black;
      border: 2px solid #e7e7e7;
    }

    .button4:hover {
      background-color: #e7e7e7;
    }

    .button5 {
      background-color: white;
      color: black;
      border: 2px solid #555555;
    }

    .button5:hover {
      background-color: #555555;
      color: white;
    }
  `}
`;
