import { useRouter } from "next/router";
import { DropMenu } from "../dropmenu";
import * as Styled from "./styles";

export const Menu = () => {
  const router = useRouter();

  return (
    <Styled.Wrapper>
      <div>
        <p>SCV</p>
      </div>
      <Styled.Right>
        <Styled.DropDown>
          <DropMenu title={"Cadastrar"}>
            <a
              onClick={() => {
                router.push("/cadastrar/unidades");
              }}
            >
              Unidades
            </a>
            <a
              onClick={() => {
                router.push("/cadastrar/produtos");
              }}
            >
              Produtos
            </a>
          </DropMenu>
          <DropMenu title={"Listar"}>
            <a
              onClick={() => {
                router.push("/listar/unidades");
              }}
            >
              Unidades
            </a>
            <a
              onClick={() => {
                router.push("/listar/produtos");
              }}
            >
              Produtos
            </a>
          </DropMenu>
        </Styled.DropDown>
        <i className="material-icons">logout</i>
      </Styled.Right>
    </Styled.Wrapper>
  );
};
