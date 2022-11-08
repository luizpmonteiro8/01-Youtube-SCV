import { PaginationType } from "app";
import { useEffect, useState } from "react";
import { Button } from "../button";
import * as Styled from "./styles";
type Props = {
  pagination: PaginationType;
  onClickPaginator: (page: number) => void;
};

export const Paginator = ({ pagination, onClickPaginator }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.Row>
        <Button
          style="red"
          title="Primeiro"
          onClick={() => onClickPaginator(0)}
        />
        <Button
          style="red"
          title="Anterior"
          onClick={() => onClickPaginator(pagination.page - 1)}
        />
        <Styled.Text>{`Total de itens: ${pagination.length}`}</Styled.Text>
        <Styled.Text>{`Página: ${pagination.page + 1} de ${
          pagination.lastPage + 1
        }`}</Styled.Text>
        <Button
          style="black"
          title="Próximo"
          onClick={() => onClickPaginator(pagination.page + 1)}
        />
        <Button
          style="black"
          title="Último"
          onClick={() => onClickPaginator(pagination.lastPage)}
        />
      </Styled.Row>
    </Styled.Wrapper>
  );
};
