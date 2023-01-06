import * as Styled from "./styles";
import { Product, useProductService, useUnityService } from "app";
import { SnackBar } from "components/common/snackBar";
import { ProductForm } from "./form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  convertAmericanFromBrazil,
  convertBraziltoAmerican,
} from "components/common/util/formatNumber";

export const ProductRegistration = () => {
  const router = useRouter();
  const { id } = router.query;

  const productService = useProductService();
  const unityService = useUnityService();

  const [message, setMessage] = useState({ text: "" });
  const [product, setProduct] = useState<Product>({
    id: null,
    name: "",
    priceSale: "",
    unityId: -1,
  });

  useEffect(() => {
    if (id) {
      productService.loadProductById(String(id)).then((res) => {
        res.priceSale = convertAmericanFromBrazil(res.priceSale);
        setProduct(res);
      });
    }
  }, []);

  const handleSubmit = (productReceived: Product) => {
    const product = JSON.parse(JSON.stringify(productReceived));

    delete product.unity;
    product.priceSale = convertBraziltoAmerican(product.priceSale!)!;

    if (Number(product.id) > 0) {
      productService
        .update(product)
        .then((_) => {
          setMessage({ text: "Atualizado com sucesso." });
        })
        .catch((err) => {
          err.response?.data?.message
            ? setMessage({ text: err.response.data.message })
            : setMessage({ text: "Ocorreu um erro." });
        });
    } else {
      delete product.id;
      productService
        .create(product)
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
      <ProductForm
        onSubmit={handleSubmit}
        unityService={unityService}
        product={product}
        setProduct={setProduct}
        router={router}
      />
      <SnackBar message={message} />
    </Styled.Wrapper>
  );
};
