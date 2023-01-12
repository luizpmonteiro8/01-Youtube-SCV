import * as Styled from "./styles";
import * as Yup from "yup";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { useState } from "react";
import { Product } from "app";
import { Card } from "components/common/card";
import { NextRouter } from "next/router";
import { AutoCompletePaginate } from "components/common/autoCompletePaginate";
import {
  convertBraziltoAmerican,
  formatNumberInScreen,
} from "components/common/util/formatNumber";
import { useFormik } from "formik";

type Props = {
  router: NextRouter;
  product: Product;
  onSubmit: (product: Product) => void;
  unityService: any;
  categoryService: any;
};

const initialValues = {
  id: undefined,
  name: "",
  priceSale: "",
  unityId: -1,
  categoryId: [-1],
};

export const ProductForm = ({
  onSubmit,
  product,
  router,
  unityService,
  categoryService,
}: Props) => {
  const formik = useFormik<Product>({
    initialValues: { ...initialValues, ...product },
    enableReinitialize: true,
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Campo obrigatório."),
      //fazer um test >0
      priceSale: Yup.string().trim().required("Campo obrigatório."),
      unityId: Yup.number()
        .positive("Campo obrigatório.")
        .required("Campo obrigatório."),
      categoryId: Yup.array().of(
        Yup.number()
          .positive("Campo obrigatório.")
          .required("Campo obrigatório.")
      ),
    }),
  });

  const [resetUnityAutoComplete, setUnityAutoComplete] =
    useState<boolean>(false);

  return (
    <Card title="Cadastro de produtos">
      <Styled.Form onSubmit={formik.handleSubmit}>
        <Styled.FormBody>
          <Input
            label="Id"
            id="id"
            name="id"
            placeholder=""
            width="150px"
            value={formik.values.id}
            disabled={true}
          />
          <Input
            label="Nome"
            id="name"
            name="name"
            placeholder="Digite o nome"
            width="250px"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <Input
            label="Preço de venda"
            id="priceSale"
            name="priceSale"
            placeholder="Digite o preço de venda"
            width="250px"
            value={formik.values.priceSale}
            onChange={(e) => {
              formik.setFieldValue(
                "priceSale",
                formatNumberInScreen(e.target.value)
              );
            }}
            error={
              formik.touched.priceSale && formik.errors.priceSale
                ? formik.errors.priceSale
                : ""
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
            value={formik.values.unityId}
            onClick={(e) => {
              if (e) {
                formik.setFieldValue("unityId", e.id);
              } else {
                formik.setFieldValue("unityId", -1);
              }
            }}
            error={
              formik.touched.unityId && formik.errors.unityId
                ? formik.errors.unityId
                : ""
            }
            marginRight="15px"
          />
          <Styled.CategoryInput>
            <label>Categorias:</label>

            <button
              type="button"
              disabled={formik.values.categoryId[0] == -1}
              onClick={() => {
                formik.values.categoryId.splice(0, 0, -1);
                formik.setFieldValue("categoryId", formik.values.categoryId);
              }}
            >
              +
            </button>
          </Styled.CategoryInput>
          {formik.values.categoryId.map((item, index) => {
            return (
              <Styled.CategoryInput key={"category" + index}>
                <AutoCompletePaginate
                  loadFunction={categoryService.loadPageCategory}
                  loadId={categoryService.loadCategoryById}
                  id={"categoryId" + index}
                  name={"categoryId" + index}
                  label="Selecione a categoria"
                  sortField="name"
                  reset={resetUnityAutoComplete}
                  value={item}
                  onClick={(e) => {
                    if (e) {
                      formik.values.categoryId[index] = e.id;
                      formik.setFieldValue(
                        "categoryId",
                        formik.values.categoryId
                      );
                    }
                  }}
                  error={
                    formik.touched.categoryId &&
                    formik.errors.categoryId &&
                    formik.errors.categoryId[index]
                      ? formik.errors.categoryId[index]
                      : ""
                  }
                  marginRight="15px"
                />
                {index != 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      formik.values.categoryId.splice(index, 1);
                      formik.setFieldValue(
                        "categoryId",
                        formik.values.categoryId
                      );
                    }}
                  >
                    -
                  </button>
                )}
              </Styled.CategoryInput>
            );
          })}
          <Styled.Row style={{ margin: "0 auto" }}>
            <Button type="submit" style="black" title="Enviar" />
            <Button
              type="reset"
              style="red"
              onClick={async () => {
                router.push("/cadastrar/produtos");
                formik.resetForm();
                formik.setValues({ ...initialValues, categoryId: [-1] });
              }}
              title="Limpar"
            />
          </Styled.Row>
        </Styled.FormBody>
      </Styled.Form>
    </Card>
  );
};
