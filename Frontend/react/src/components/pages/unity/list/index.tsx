import { PaginationType, Unity, useUnityService } from "app";
import { Button } from "components/common/button";
import { useEffect, useState } from "react";
import * as Styled from "./styles";

export const UnityListing = () => {
  const unityService = useUnityService();
  const [unityList, setUnityList] = useState<Unity[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();

  const [search, setSearch] = useState("");
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [orderValue, setOrder] = useState("asc");
  const [fieldValue, setField] = useState("id");

  useEffect(() => {
    loadPageUnity(0, size, search, orderValue, fieldValue);
  }, []);

  //
  const loadPageUnity = async (
    page: number,
    size: number,
    search: string,
    order: string,
    sort: string
  ) => {
    await unityService
      .loadPageUnity(page, size, search, order, sort)
      .then((res) => {
        setUnityList(res.results);
        setPagination(res.pagination);
      });
  };

  return (
    <Styled.Wrapper>
      <h1>Lista de unidades</h1>
      <Styled.RowSpace>
        <Button title="Adicionar" type="black" />
        <Styled.Search>
          <h3>Buscar</h3>
          <input
            id="searchInput"
            onChange={(e) => {
              setSearch(e.target.value);
              loadPageUnity(0, 25, e.target.value, orderValue, fieldValue);
            }}
          />
        </Styled.Search>
      </Styled.RowSpace>
      <Styled.Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {unityList?.map((item, index) => {
            return (
              <tr key={"unityList" + index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Styled.Table>
    </Styled.Wrapper>
  );
};
