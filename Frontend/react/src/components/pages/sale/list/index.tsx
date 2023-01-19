import * as Styled from "./styles";
import { PaginationType, Sale, SaleItem, useSaleService } from "app";
import { Button } from "components/common/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "components/common/modal";
import { SnackBar } from "components/common/snackBar";
import { Paginator } from "components/common/paginator";
import { convertAmericanFromBrazil } from "components/common/util/formatNumber";

export const SaleListing = () => {
  const router = useRouter();
  const saleService = useSaleService();
  const [pagination, setPagination] = useState<PaginationType>();

  const [search, setSearch] = useState("");
  const [size, setSize] = useState(25);
  const [page, setPage] = useState(0);
  const [orderValue, setOrder] = useState("asc");
  const [fieldValue, setField] = useState("id");

  const [saleList, setSaleList] = useState<Sale[]>([]);
  const [saleDelete, setSaleDelete] = useState<Sale | undefined>(undefined);

  const [message, setMessage] = useState({ text: "" });

  useEffect(() => {
    loadPageSale(0, size, search, orderValue, fieldValue);
  }, []);

  const onConfirmDelete = () => {
    saleService
      .remove(Number(saleDelete?.id))
      .then((_) => {
        setMessage({
          text: `Venda ${saleDelete?.id} removida com sucesso. `,
        });

        const newSaleList = saleList.filter(
          (item) => item.id !== saleDelete?.id
        );
        setSaleList(newSaleList);
        setSaleDelete(undefined);
      })
      .catch((err) => {
        err.response?.data?.message
          ? setMessage({ text: err.response.data.message })
          : setMessage({ text: "Ocorreu um erro." });
      });
  };

  //
  const loadPageSale = async (
    page: number,
    size: number,
    search: string,
    order: string,
    sort: string
  ) => {
    await saleService
      .loadPageSale(page, size, search, order, sort)
      .then((res) => {
        setSaleList(res.results);
        setPagination(res.pagination);
      });
  };

  const onClickPaginator = (page: number) => {
    if (page >= 0 && page <= pagination!.lastPage) {
      setPage(page);
      loadPageSale(page, size, search, orderValue, fieldValue);
      window.scrollTo(0, 0);
    }
  };

  const totalSale = (item: SaleItem[]) => {
    let total = 0;

    item.map((saleItem) => {
      total += saleItem.quantity * saleItem.price!;
    });
    return "R$ " + convertAmericanFromBrazil(total);
  };

  const formatDate = (date: Date) => {
    date.setHours(date.getHours() + 3);
    return date.toLocaleString();
  };

  return (
    <Styled.Wrapper>
      <h1>Lista de vendas</h1>
      <Styled.RowSpace>
        <Button
          title="Adicionar"
          style="black"
          onClick={() => {
            router.push("/cadastrar/vendas");
          }}
        />
        <Styled.Search>
          <h3>Buscar</h3>
          <input
            id="searchInput"
            onChange={(e) => {
              setSearch(e.target.value);
              loadPageSale(0, 25, e.target.value, orderValue, fieldValue);
            }}
          />
        </Styled.Search>
      </Styled.RowSpace>
      <Styled.Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Total</th>
            <th>Entregue</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {saleList?.map((item, index) => {
            return (
              <tr key={"saleList" + index}>
                <td>{item.id}</td>
                <td>{item.seller?.name}</td>
                <td>{item.client?.name}</td>
                <td>{formatDate(new Date(item.date!))}</td>
                <td>{totalSale(item.saleItem)}</td>
                <td>{item.delivered ? "Sim" : "Não"}</td>

                <td>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <a
                      onClick={() => {
                        router.push("/cadastrar/vendas?id=" + item.id);
                      }}
                      style={{ padding: "15px", marginRight: "15px" }}
                    >
                      Editar
                    </a>
                    <a
                      onClick={() => {
                        setSaleDelete(item);
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
      {saleDelete != null && (
        <Modal
          title="Remover venda"
          message={`Deseja remover venda com id: ${saleDelete.id}?`}
          onCancel={() => {
            setSaleDelete(undefined);
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
