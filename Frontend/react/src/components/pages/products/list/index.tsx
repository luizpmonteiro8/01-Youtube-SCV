import * as Styled from "./styles";
import { PaginationType, Product, useProductService } from "app";
import { Button } from "components/common/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "components/common/modal";
import { SnackBar } from "components/common/snackBar";
import { Paginator } from "components/common/paginator";

export const ProductListing = () => {
  const router = useRouter();
  const productService = useProductService();
  const [pagination, setPagination] = useState<PaginationType>();

  const [search, setSearch] = useState("");
  const [size, setSize] = useState(25);
  const [page, setPage] = useState(0);
  const [orderValue, setOrder] = useState("asc");
  const [fieldValue, setField] = useState("id");

  const [productList, setProductList] = useState<Product[]>([]);
  const [productDelete, setProductDelete] = useState<Product | undefined>(
    undefined
  );

  const [message, setMessage] = useState({ text: "" });

  useEffect(() => {
    loadPageProduct(0, size, search, orderValue, fieldValue);
  }, []);

  const onConfirmDelete = () => {
    productService
      .remove(Number(productDelete?.id))
      .then((_) => {
        setMessage({
          text: `Produto ${productDelete?.name} com id: ${productDelete?.id} removida com sucesso. `,
        });

        const newProductList = productList.filter(
          (item) => item.id !== productDelete?.id
        );
        setProductList(newProductList);
        setProductDelete(undefined);
      })
      .catch((err) => {
        err.response?.data?.message
          ? setMessage({ text: err.response.data.message })
          : setMessage({ text: "Ocorreu um erro." });
      });
  };

  //
  const loadPageProduct = async (
    page: number,
    size: number,
    search: string,
    order: string,
    sort: string
  ) => {
    await productService
      .loadPageProduct(page, size, search, order, sort)
      .then((res) => {
        setProductList(res.results);
        setPagination(res.pagination);
      });
  };

  const onClickPaginator = (page: number) => {
    if (page >= 0 && page <= pagination!.lastPage) {
      setPage(page);
      loadPageProduct(page, size, search, orderValue, fieldValue);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Styled.Wrapper>
      <h1>Lista de produtos</h1>
      <Styled.RowSpace>
        <Button
          title="Adicionar"
          style="black"
          onClick={() => {
            router.push("/cadastrar/produtos");
          }}
        />
        <Styled.Search>
          <h3>Buscar</h3>
          <input
            id="searchInput"
            onChange={(e) => {
              setSearch(e.target.value);
              loadPageProduct(0, 25, e.target.value, orderValue, fieldValue);
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
          {productList?.map((item, index) => {
            return (
              <tr key={"productList" + index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <a
                      onClick={() => {
                        router.push("/cadastrar/produtos?id=" + item.id);
                      }}
                      style={{ padding: "15px", marginRight: "15px" }}
                    >
                      Editar
                    </a>
                    <a
                      onClick={() => {
                        setProductDelete(item);
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
      {productDelete != null && (
        <Modal
          title="Remover produto"
          message={`Deseja remover produto ${productDelete.name} com id: ${productDelete.id}?`}
          onCancel={() => {
            setProductDelete(undefined);
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
