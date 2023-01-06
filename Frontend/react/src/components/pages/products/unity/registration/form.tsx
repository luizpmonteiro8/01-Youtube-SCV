import * as Styled from "./styles";
import * as Yup from "yup";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Unity } from "app";
import { Card } from "components/common/card";
import { NextRouter } from "next/router";
import { useFormik } from "formik";

type Props = {
  router: NextRouter;
  unity: Unity | undefined;
  onSubmit: (unity: Unity) => void;
};

const initialValues = { id: undefined, name: "" };

export const UnityForm = ({ onSubmit, unity, router }: Props) => {
  const formik = useFormik<Unity>({
    initialValues: { ...initialValues, ...unity },
    enableReinitialize: true,
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Campo obrigatório."),
    }),
  });

  return (
    <Card title="Cadastro de unidades">
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
                router.push("/cadastrar/unidades");
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
