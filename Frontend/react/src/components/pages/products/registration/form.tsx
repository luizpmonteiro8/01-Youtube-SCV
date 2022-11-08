import * as Styled from "./styles";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Product } from "app";
import { Card } from "components/common/card";
import { NextRouter } from "next/router";
import { AutoCompletePaginate } from "components/common/autoCompletePaginate";
import {
  convertBraziltoAmerican,
  formatNumber3DecimalInScreen,
  formatNumberInScreen,
} from "components/common/util/formatNumber";

type Props = {
  router: NextRouter;
  product: Product;
  setProduct: Dispatch<SetStateAction<Product>>;
  onSubmit: (product: Product) => void;
  unityService: any;
};

export const ProductForm = ({
  onSubmit,
  product,
  setProduct,
  router,
  unityService,
}: Props) => {
  const [touched, setTouched] = useState<boolean>(false);
  const [resetUnityAutoComplete, setUnityAutoComplete] =
    useState<boolean>(false);

  return (
    <Card title="Cadastro de produtos">
      <Styled.Form
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (
            product.name != "" &&
            Number(convertBraziltoAmerican(product.priceSale)) > 0 &&
            product.unityId > 0
          ) {
            onSubmit(product);
          }
        }}
      >
        <Styled.FormBody>
          <Input
            label="Id"
            id="id"
            name="id"
            placeholder=""
            width="150px"
            value={product.id ? product.id : ""}
            disabled={true}
          />
          <Input
            label="Nome"
            id="name"
            name="name"
            placeholder="Digite o nome"
            width="250px"
            value={product?.name}
            onChange={(e) => {
              product.name = e.target.value;
              setProduct({ ...product });
            }}
            error={product.name == "" && touched ? "Campo obrigatório" : ""}
          />

          <Input
            label="Preço de venda"
            id="priceSale"
            name="priceSale"
            placeholder="Digite o preço de venda"
            width="250px"
            value={product?.priceSale}
            onChange={(e) => {
              product.priceSale = formatNumberInScreen(e.target.value);
              setProduct({ ...product });
            }}
            error={
              product.priceSale == "" && touched ? "Campo obrigatório" : ""
            }
          />

          <AutoCompletePaginate
            loadFunction={unityService.loadPageUnity}
            loadId={unityService.loadUnityById}
            id="unityId"
            name="unityId"
            label="Selecione a unidade"
            sortField="id"
            reset={resetUnityAutoComplete}
            value={product.unityId}
            onClick={(e) => {
              if (e) {
                product.unity = e;
                product.unityId = e.id;
              } else {
                product.unity = undefined;
                product.unityId = -1;
              }
            }}
            error={product.unityId == -1 && touched ? "Campo obrigatório" : ""}
            marginRight="15px"
          />

          <Styled.Row style={{ margin: "0 auto" }}>
            <Button type="submit" style="black" title="Enviar" />
            <Button
              type="reset"
              style="red"
              onClick={async () => {
                setProduct({
                  id: null,
                  name: "",
                  priceSale: "",
                  unityId: -1,
                  unity: undefined,
                });
                await setUnityAutoComplete(true);
                setUnityAutoComplete(false);
                setTouched(false);
                router.push("/cadastrar/produtos");
              }}
              title="Limpar"
            />
          </Styled.Row>
        </Styled.FormBody>
      </Styled.Form>
    </Card>
  );
};
