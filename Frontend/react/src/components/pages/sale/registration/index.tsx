import * as Styled from "./styles";
import { Sale, useClientService, useProductService, useSaleService } from "app";
import { SnackBar } from "components/common/snackBar";
import { SaleForm } from "./form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const SaleRegistration = () => {
  const router = useRouter();
  const { id } = router.query;

  const saleService = useSaleService();
  const clientService = useClientService();
  const productService = useProductService();

  const [message, setMessage] = useState({ text: "" });
  const [sale, setSale] = useState<Sale>();

  useEffect(() => {
    if (id) {
      saleService.loadSaleById(String(id)).then((res) => {
        res.saleItem = res.saleItem.map((item) => {
          item.quantity = Number(item.quantity);
          return item;
        });
        setSale(res);
      });
    }
  }, [id]);

  const handleSubmit = (saleReceived: Sale) => {
    const sale: Sale = JSON.parse(JSON.stringify(saleReceived));

    sale.clientId = Number(sale.clientId);

    sale.saleItem = sale.saleItem.map((item) => {
      item.productId = Number(item.productId);
      delete item.product;
      delete item.price;
      delete item.id;
      delete item.saleId;
      return item;
    });

    if (Number(sale.id) > 0) {
      delete sale.date;
      delete sale.clientId;
      delete sale.sellerId;

      saleService
        .update(sale)
        .then((_) => {
          setMessage({ text: "Atualizado com sucesso." });
        })
        .catch((err) => {
          err.response?.data?.message
            ? setMessage({ text: err.response.data.message })
            : setMessage({ text: "Ocorreu um erro." });
        });
    } else {
      delete sale.id;
      saleService
        .create(sale)
        .then((_) => {
          setMessage({ text: "Salvo com sucesso." });
        })
        .catch((err) => {
          err.response?.data?.message
            ? setMessage({ text: err.response.data.message })
            : setMessage({ text: "Ocorreu um erro." });
        });
    }
  };

  return (
    <Styled.Wrapper>
      <SaleForm
        onSubmit={handleSubmit}
        sale={sale}
        router={router}
        clientService={clientService}
        productService={productService}
      />
      <SnackBar message={message} />
    </Styled.Wrapper>
  );
};
