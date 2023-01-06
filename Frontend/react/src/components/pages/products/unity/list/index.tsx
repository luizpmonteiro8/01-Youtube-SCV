import * as Styled from "./styles";
import { PaginationType, Unity, useUnityService } from "app";
import { Button } from "components/common/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "components/common/modal";
import { SnackBar } from "components/common/snackBar";
import { Paginator } from "components/common/paginator";

export const UnityListing = () => {
  const router = useRouter();
  const unityService = useUnityService();
  const [pagination, setPagination] = useState<PaginationType>();

  const [search, setSearch] = useState("");
  const [size, setSize] = useState(25);
  const [page, setPage] = useState(0);
  const [orderValue, setOrder] = useState("asc");
  const [fieldValue, setField] = useState("id");

  const [unityList, setUnityList] = useState<Unity[]>([]);
  const [unityDelete, setUnityDelete] = useState<Unity | undefined>(undefined);

  const [message, setMessage] = useState({ text: "" });

  useEffect(() => {
    loadPageUnity(0, size, search, orderValue, fieldValue);
  }, []);

  const onConfirmDelete = () => {
    unityService
      .remove(Number(unityDelete?.id))
      .then((_) => {
        setMessage({
          text: `Unidade ${unityDelete?.name} com id: ${unityDelete?.id} removida com sucesso. `,
        });

        const newUnityList = unityList.filter(
          (item) => item.id !== unityDelete?.id
        );
        setUnityList(newUnityList);
        setUnityDelete(undefined);
      })
      .catch((err) => {
        err.response?.data?.message
          ? setMessage({ text: err.response.data.message })
          : setMessage({ text: "Ocorreu um erro." });
      });
  };

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

  const onClickPaginator = (page: number) => {
    if (page >= 0 && page <= pagination!.lastPage) {
      setPage(page);
      loadPageUnity(page, size, search, orderValue, fieldValue);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Styled.Wrapper>
      <h1>Lista de unidades</h1>
      <Styled.RowSpace>
        <Button
          title="Adicionar"
          style="black"
          onClick={() => {
            router.push("/cadastrar/unidades");
          }}
        />
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
                <td>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <a
                      onClick={() => {
                        router.push("/cadastrar/unidades?id=" + item.id);
                      }}
                      style={{ padding: "15px", marginRight: "15px" }}
                    >
                      Editar
                    </a>
                    <a
                      onClick={() => {
                        setUnityDelete(item);
                        window.scrollTo(0, 0);
                      }}
                      style={{ padding: "15px" }}
                    >
                      Remover
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Styled.Table>
      {unityDelete != null && (
        <Modal
          title="Remover unidade"
          message={`Deseja remover unidade ${unityDelete.name} com id: ${unityDelete.id}?`}
          onCancel={() => {
            setUnityDelete(undefined);
          }}
          onConfirm={onConfirmDelete}
        />
      )}
      <SnackBar message={message} />
      {pagination && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <Paginator
            pagination={pagination}
            onClickPaginator={onClickPaginator}
          />
        </div>
      )}
    </Styled.Wrapper>
  );
};
