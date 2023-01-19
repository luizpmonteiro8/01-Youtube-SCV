import * as Styled from "./styles";
import * as Yup from "yup";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { Product, Sale, SaleItem } from "app";
import { Card } from "components/common/card";
import { NextRouter } from "next/router";
import { useFormik } from "formik";
import { AutoCompletePaginate } from "components/common/autoCompletePaginate";
import { useState } from "react";
import { convertAmericanFromBrazil } from "components/common/util/formatNumber";

type Props = {
  router: NextRouter;
  sale: Sale | undefined;
  clientService: any;
  productService: any;
  onSubmit: (sale: Sale) => void;
};

const initialValues = {
  id: undefined,
  toDelivery: false,
  delivered: false,
  clientId: "",
  saleItem: [] as SaleItem[],
};

export const SaleForm = ({
  onSubmit,
  sale,
  router,
  clientService,
  productService,
}: Props) => {
  const [resetClientAutoComplete, setClientAutoComplete] =
    useState<boolean>(false);
  const [resetProductAutoComplete, setProductAutoComplete] =
    useState<boolean>(false);

  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState<Product>();

  const formik = useFormik<Sale>({
    initialValues: { ...initialValues, ...sale },
    enableReinitialize: true,
    onSubmit,
    validationSchema: Yup.object({
      clientId: Yup.string().trim().required("Campo obrigatório."),
      saleItem: Yup.array().min(
        1,
        "Deve ser adicionando pelo menos 1 produto."
      ),
    }),
  });

  const totalItem = (item: SaleItem) => {
    return (
      "R$ " +
      convertAmericanFromBrazil(Number(item.product?.priceSale) * item.quantity)
    );
  };

  const totalSale = () => {
    let total = 0;
    formik.values.saleItem.map((item) => {
      total += item.quantity * Number(item.product?.priceSale);
    });
    return total;
  };

  const removeItem = async (index: number) => {
    formik.values.saleItem.splice(formik.values.saleItem.length - index - 1, 1);
    formik.setFieldValue("saleItem", formik.values.saleItem);
    if (sale) {
      sale.saleItem = formik.values.saleItem;
    }
  };

  return (
    <Styled.WrapperForm onSubmit={formik.handleSubmit}>
      <Styled.RowSpaceBetween>
        <h3>Cadastro de venda</h3>
        <div>
          <Button title="Salvar" type="submit" style="green" />
          <h5>Total:{convertAmericanFromBrazil(totalSale())}</h5>
        </div>
      </Styled.RowSpaceBetween>
      <AutoCompletePaginate
        loadFunction={clientService.loadPageClient}
        loadId={clientService.loadClientById}
        id="clientId"
        name="clientId"
        label="Selecione o cliente"
        sortField="id"
        reset={resetClientAutoComplete}
        value={Number(formik.values.clientId)}
        onClick={(e) => {
          if (e) {
            formik.setFieldValue("clientId", e.id);
          } else {
            formik.setFieldValue("clientId", "");
          }
        }}
        error={
          formik.touched.clientId && formik.errors.clientId
            ? formik.errors.clientId
            : ""
        }
        marginRight="15px"
      />

      <Styled.Row>
        <div>
          <input
            type="checkbox"
            id="toDelivery"
            name="toDelivery"
            checked={formik.values.toDelivery}
            onChange={() =>
              formik.setFieldValue("toDelivery", !formik.values.toDelivery)
            }
          />
          <label>Para entrega</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="delivered"
            name="delivered"
            checked={formik.values.delivered}
            onChange={() =>
              formik.setFieldValue("delivered", !formik.values.delivered)
            }
          />
          <label>Entregue</label>
        </div>
      </Styled.Row>

      <hr></hr>

      <Styled.Row>
        <AutoCompletePaginate
          loadFunction={productService.loadPageProduct}
          loadId={productService.loadProductById}
          id="productId"
          name="productId"
          label="Selecione o produto"
          sortField="id"
          reset={resetProductAutoComplete}
          value={product?.id ? Number(product?.id) : -1}
          onClick={(e) => {
            if (e) {
              setProduct(e);
            } else {
              setProduct(undefined);
            }
          }}
          marginRight="15px"
          error={
            formik.touched.saleItem && formik.errors.saleItem
              ? (formik.errors.saleItem as string)
              : ""
          }
        />

        <Input
          label="Quantidade"
          id="quantity"
          name="quantity"
          placeholder="Digite a quantidade"
          width="250px"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          error={""}
        />
        <Button
          type="button"
          title="Adicionar"
          style="green"
          onClick={() => {
            if (product) {
              const saleItem: SaleItem = {
                quantity: quantity,
                productId: product.id!.toString(),
                product: product,
              };
              formik.values.saleItem.push(saleItem);
              formik.setFieldValue("saleItem", formik.values.saleItem);
              if (sale) {
                sale.saleItem = formik.values.saleItem;
              }
            }
          }}
        />
      </Styled.Row>
      <hr></hr>
      <Styled.Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {formik.values.saleItem
            ?.slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <tr key={"saleItem" + index}>
                  <td>{formik.values.saleItem.length - index}</td>
                  <td>{item.product!.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {"R$ " + convertAmericanFromBrazil(item.product!.priceSale)}
                  </td>
                  <td>{totalItem(item)}</td>
                  <td>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      <a
                        onClick={() => {
                          setQuantity(item.quantity);
                          setProduct(item.product);
                          removeItem(index);
                        }}
                        style={{ padding: "15px", marginRight: "15px" }}
                      >
                        Editar
                      </a>
                      <a
                        onClick={() => {
                          removeItem(index);
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
    </Styled.WrapperForm>
  );
};
