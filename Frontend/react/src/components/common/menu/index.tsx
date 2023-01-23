import * as Styled from "./styles";
import { useRouter } from "next/router";
import { DropMenu } from "../dropmenu";
import { signOut } from "next-auth/react";
import { changeTheme } from "theme/theme";

export const Menu = () => {
  const router = useRouter();

  return (
    <Styled.Wrapper>
      <div>
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/home");
          }}
        >
          SCV
        </p>
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
                router.push("/cadastrar/categorias");
              }}
            >
              Categorias
            </a>
            <a
              onClick={() => {
                router.push("/cadastrar/produtos");
              }}
            >
              Produtos
            </a>
            <a
              onClick={() => {
                router.push("/cadastrar/clientes");
              }}
            >
              Clientes
            </a>
            <a
              onClick={() => {
                router.push("/cadastrar/vendas");
              }}
            >
              Vendas
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
                router.push("/listar/categorias");
              }}
            >
              Categorias
            </a>
            <a
              onClick={() => {
                router.push("/listar/produtos");
              }}
            >
              Produtos
            </a>
            <a
              onClick={() => {
                router.push("/listar/clientes");
              }}
            >
              Clientes
            </a>
            <a
              onClick={() => {
                router.push("/listar/vendas");
              }}
            >
              Vendas
            </a>
          </DropMenu>
        </Styled.DropDown>
        <Styled.Logout>
          <DropMenu
            title={
              <i className="material-icons" style={{ marginRight: "40px" }}>
                palette
              </i>
            }
          >
            <a
              onClick={() => {
                changeTheme("grey");
                router.reload();
              }}
            >
              Cinza
            </a>
            <a
              onClick={() => {
                changeTheme("blue");
                router.reload();
              }}
            >
              Azul
            </a>
            <a
              onClick={() => {
                changeTheme("red");
                router.reload();
              }}
            >
              Vermelho
            </a>
          </DropMenu>

          <i
            className="material-icons"
            onClick={() => {
              signOut();
            }}
          >
            logout
          </i>
        </Styled.Logout>
      </Styled.Right>
    </Styled.Wrapper>
  );
};
