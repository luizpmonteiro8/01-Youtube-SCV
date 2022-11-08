import { useEffect, useState } from "react";
import { Button } from "../button";
import * as Styled from "./styles";
type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const Modal = ({ title, message, onConfirm, onCancel }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Title>
          <h2>{title}</h2>
        </Styled.Title>
        <div>{message}</div>

        <Styled.Row>
          <Button style="black" title="Ok" onClick={onConfirm} />
          <Button style="red" title="Cancelar" onClick={() => onCancel()} />
        </Styled.Row>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
