import * as Styled from "./styles";
import { Dashboard, useDashboardService } from "app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { convertAmericanFromBrazil } from "components/common/util/formatNumber";
import { SaleListing } from "components/pages/sale/list";

export const DashboardListing = () => {
  const router = useRouter();
  const dashboardService = useDashboardService();

  const [dashboard, setDashboard] = useState<Dashboard>();

  useEffect(() => {
    dashboardService.loadDashboard().then((res) => setDashboard(res));
  }, []);

  console.log(dashboard);

  return (
    <Styled.Wrapper>
      <Styled.Row>
        {dashboard && dashboard.productCount > 0 && (
          <Styled.Card style={{ background: "red" }}>
            <p>Quantidade de produtos: {dashboard?.productCount}</p>
            <p>Último produto cadastrado: {dashboard?.productLast}</p>
          </Styled.Card>
        )}
        {dashboard && dashboard.categoryCount > 0 && (
          <Styled.Card style={{ background: "blue" }}>
            <p>Quantidade de categoria: {dashboard?.categoryCount}</p>
          </Styled.Card>
        )}
        {dashboard && dashboard.saleCount > 0 && (
          <Styled.Card style={{ background: "green" }}>
            <p>Quantidade de vendas: {dashboard?.saleCount}</p>
            <p>Último vendedor: {dashboard?.saleLastSeller}</p>
            <p>
              Total da vendas: R${" "}
              {convertAmericanFromBrazil(dashboard?.saleLastTotal as number)}
            </p>
          </Styled.Card>
        )}
      </Styled.Row>
      <Styled.Menu>
        <p className="textWelcome">
          Bem vindo ao sistema de controle de vendas, com ele você vai poder
          fazer o controle de sua loja, ter as informações do seu clientes e
          controlar a quantidade de vendas feita por mês.
        </p>
        <h1>Lista:</h1>
        <ul>
          <li onClick={() => router.push("/listar/unidades")}>Unidades</li>
          <li onClick={() => router.push("/listar/categorias")}>Categoria</li>
          <li onClick={() => router.push("/listar/produtos")}>Produtos</li>
          <li onClick={() => router.push("/listar/clientes")}>Clientes</li>
          <li onClick={() => router.push("/listar/vendas")}>Vendas</li>
        </ul>
        <h1>Cadastro:</h1>
        <ul>
          <li onClick={() => router.push("/cadastrar/unidades")}>Unidades</li>
          <li onClick={() => router.push("/cadastrar/categorias")}>
            Categoria
          </li>
          <li onClick={() => router.push("/cadastrar/produtos")}>Produtos</li>
          <li onClick={() => router.push("/cadastrar/clientes")}>Clientes</li>
          <li onClick={() => router.push("/cadastrar/vendas")}>Vendas</li>
        </ul>
      </Styled.Menu>
    </Styled.Wrapper>
  );
};
