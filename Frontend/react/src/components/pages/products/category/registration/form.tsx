import * as Styled from "./styles";
import * as Yup from "yup";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Category } from "app";
import { Card } from "components/common/card";
import { NextRouter } from "next/router";
import { useFormik } from "formik";

type Props = {
  router: NextRouter;
  category: Category | undefined;
  onSubmit: (category: Category) => void;
};

const initialValues = { id: undefined, name: "" };

export const CategoryForm = ({ onSubmit, category, router }: Props) => {
  const formik = useFormik<Category>({
    initialValues: { ...initialValues, ...category },
    enableReinitialize: true,
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Campo obrigatório."),
    }),
  });

  return (
    <Card title="Cadastro de categorias">
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

          <Styled.Row style={{ margin: "0 auto" }}>
            <Button type="submit" style="black" title="Enviar" />
            <Button
              type="reset"
              style="red"
              onClick={() => {
                router.push("/cadastrar/categorias");
                formik.resetForm();
                formik.setValues({ ...initialValues });
              }}
              title="Limpar"
            />
          </Styled.Row>
        </Styled.FormBody>
      </Styled.Form>
    </Card>
  );
};
