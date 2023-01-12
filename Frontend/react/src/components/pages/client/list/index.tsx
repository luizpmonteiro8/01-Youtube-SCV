import * as Styled from "./styles";
import { PaginationType, Client, useClientService } from "app";
import { Button } from "components/common/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "components/common/modal";
import { SnackBar } from "components/common/snackBar";
import { Paginator } from "components/common/paginator";

export const ClientListing = () => {
  const router = useRouter();
  const clientService = useClientService();
  const [pagination, setPagination] = useState<PaginationType>();

  const [search, setSearch] = useState("");
  const [size, setSize] = useState(25);
  const [page, setPage] = useState(0);
  const [orderValue, setOrder] = useState("asc");
  const [fieldValue, setField] = useState("id");

  const [clientList, setClientList] = useState<Client[]>([]);
  const [clientDelete, setClientDelete] = useState<Client | undefined>(
    undefined
  );

  const [message, setMessage] = useState({ text: "" });

  useEffect(() => {
    loadPageClient(0, size, search, orderValue, fieldValue);
  }, []);

  const onConfirmDelete = () => {
    clientService
      .remove(Number(clientDelete?.id))
      .then((_) => {
        setMessage({
          text: `Cliente ${clientDelete?.name} com id: ${clientDelete?.id} removida com sucesso. `,
        });

        const newClientList = clientList.filter(
          (item) => item.id !== clientDelete?.id
        );
        setClientList(newClientList);
        setClientDelete(undefined);
      })
      .catch((err) => {
        err.response?.data?.message
          ? setMessage({ text: err.response.data.message })
          : setMessage({ text: "Ocorreu um erro." });
      });
  };

  //
  const loadPageClient = async (
    page: number,
    size: number,
    search: string,
    order: string,
    sort: string
  ) => {
    await clientService
      .loadPageClient(page, size, search, order, sort)
      .then((res) => {
        setClientList(res.results);
        setPagination(res.pagination);
      });
  };

  const onClickPaginator = (page: number) => {
    if (page >= 0 && page <= pagination!.lastPage) {
      setPage(page);
      loadPageClient(page, size, search, orderValue, fieldValue);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Styled.Wrapper>
      <h1>Lista de clientes</h1>
      <Styled.RowSpace>
        <Button
          title="Adicionar"
          style="black"
          onClick={() => {
            router.push("/cadastrar/clientes");
          }}
        />
        <Styled.Search>
          <h3>Buscar</h3>
          <input
            id="searchInput"
            onChange={(e) => {
              setSearch(e.target.value);
              loadPageClient(0, 25, e.target.value, orderValue, fieldValue);
            }}
          />
        </Styled.Search>
      </Styled.RowSpace>
      <Styled.Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientList?.map((item, index) => {
            return (
              <tr key={"clientList" + index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{`${item.address!.street},${item.address!.number},${
                  item.address!.district
                }`}</td>
                <td>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <a
                      onClick={() => {
                        router.push("/cadastrar/clientes?id=" + item.id);
                      }}
                      style={{ padding: "15px", marginRight: "15px" }}
                    >
                      Editar
                    </a>
                    <a
                      onClick={() => {
                        setClientDelete(item);
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
      {clientDelete != null && (
        <Modal
          title="Remover cliente"
          message={`Deseja remover cliente ${clientDelete.name} com id: ${clientDelete.id}?`}
          onCancel={() => {
            setClientDelete(undefined);
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
