import * as Styled from "./styles";
import { Button } from "components/common/button";
import { Input } from "components/common/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Unity } from "app";
import { Card } from "components/common/card";
import { NextRouter } from "next/router";

type Props = {
  router: NextRouter;
  unity: Unity;
  setUnity: Dispatch<SetStateAction<Unity>>;
  onSubmit: (unity: Unity) => void;
};

export const UnityForm = ({ onSubmit, unity, setUnity, router }: Props) => {
  const [touched, setTouched] = useState<boolean>(false);

  return (
    <Card title="Cadastro de unidades">
      <Styled.Form
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (unity.name) {
            onSubmit(unity);
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
            value={unity.id ? unity.id : ""}
            disabled={true}
          />
          <Input
            label="Nome"
            id="name"
            name="name"
            placeholder="Digite o nome"
            width="250px"
            value={unity?.name}
            onChange={(e) => {
              unity.name = e.target.value;
              setUnity({ ...unity });
            }}
            error={unity.name == "" && touched ? "Campo obrigatório" : ""}
          />

          <Styled.Row style={{ margin: "0 auto" }}>
            <Button type="submit" style="black" title="Enviar" />
            <Button
              type="reset"
              style="red"
              onClick={() => {
                setUnity({ id: null, name: "" });
                setTouched(false);
                router.push("/cadastrar/unidades");
              }}
              title="Limpar"
            />
          </Styled.Row>
        </Styled.FormBody>
      </Styled.Form>
    </Card>
  );
};
