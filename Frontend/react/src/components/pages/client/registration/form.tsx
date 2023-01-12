import * as Styled from "./styles";
import * as Yup from "yup";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { Client, useViaCepService } from "app";
import { Card } from "components/common/card";
import { NextRouter } from "next/router";
import { useFormik } from "formik";
import { cpfMask } from "components/common/util/cpfMask";
import { cepMask } from "components/common/util/cepMask";

type Props = {
  router: NextRouter;
  client: Client | undefined;
  countryList: string[];
  cepService: any;
  onSubmit: (client: Client) => void;
};

const initialValues = { id: undefined, name: "", cpf: "", address: undefined };

export const ClientForm = ({
  onSubmit,
  client,
  router,
  countryList,
  cepService,
}: Props) => {
  const formik = useFormik<Client>({
    initialValues: { ...initialValues, ...client },
    enableReinitialize: true,
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Campo obrigatório."),
    }),
  });

  console.log(formik.values);

  return (
    <Card title="Cadastro de clientes">
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
            label="Cpf"
            id="cpf"
            name="cpf"
            placeholder="Digite o cpf"
            width="250px"
            value={formik.values.cpf}
            onChange={(e) => {
              formik.setFieldValue("cpf", cpfMask(e.target.value));
            }}
            error={
              formik.touched.cpf && formik.errors.cpf ? formik.errors.cpf : ""
            }
          />

          <label>Selecione o país</label>
          <select
            name="country"
            id="country"
            value={formik.values.address?.country}
            onChange={(e) => {
              formik.setFieldValue("address", {
                ...formik.values.address,
                country: e.target.value,
              });
            }}
          >
            {countryList.map((item, index) => {
              return (
                <option key={"country" + index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <Input
            label="Cep"
            id="cep"
            name="cep"
            placeholder="Digite o cep"
            width="250px"
            value={formik.values.address?.zipCode}
            onChange={(e) => {
              formik.setFieldValue("address", {
                ...formik.values.address,
                zipCode: cepMask(e.target.value),
              });
              if (e.target.value.length == 9) {
                cepService.getAddress(e.target.value).then((resp: any) => {
                  const address = {
                    ...formik.values.address,
                    street: resp.street,
                    district: resp.district,
                    state: resp.state,
                    zipCode: cepMask(e.target.value),
                  };
                  formik.setFieldValue("address", address);
                });
              }
            }}
            error={
              formik.touched.cpf && formik.errors.cpf ? formik.errors.cpf : ""
            }
          />

          <Input
            label="Rua"
            id="street"
            name="street"
            placeholder=""
            width="250px"
            value={formik.values.address?.street}
            disabled={true}
          />
          <Input
            label="Número"
            id="number"
            name="number"
            placeholder="Digite o número"
            width="250px"
            value={formik.values.address?.number}
            onChange={(e) => {
              formik.setFieldValue("address", {
                ...formik.values.address,
                number: e.target.value,
              });
            }}
          />
          <Input
            label="Complemento"
            id="complement"
            name="complement"
            placeholder="Digite o complemento"
            width="250px"
            value={formik.values.address?.complement}
            onChange={(e) => {
              formik.setFieldValue("address", {
                ...formik.values.address,
                complement: e.target.value,
              });
            }}
          />
          <Input
            label="Bairro"
            id="district"
            name="district"
            placeholder=""
            width="250px"
            value={formik.values.address?.district}
            disabled={true}
          />

          <Input
            label="Estado"
            id="state"
            name="state"
            placeholder=""
            width="250px"
            value={formik.values.address?.state}
            disabled={true}
          />

          <Styled.Row style={{ margin: "0 auto" }}>
            <Button type="submit" style="black" title="Enviar" />
            <Button
              type="reset"
              style="red"
              onClick={() => {
                router.push("/cadastrar/clientes");
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
