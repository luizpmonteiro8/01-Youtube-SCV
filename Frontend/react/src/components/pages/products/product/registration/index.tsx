import * as Styled from "./styles";
import {
  Product,
  useCategoryService,
  useProductService,
  useUnityService,
} from "app";
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
  const categoryService = useCategoryService();

  const [message, setMessage] = useState({ text: "" });
  const [product, setProduct] = useState<Product>({
    id: undefined,
    name: "",
    priceSale: "",
    unityId: -1,
    categoryId: [-1],
  });

  useEffect(() => {
    /*  for (let index = 0; index < 1000; index++) {
      unityService.create({ name: "teste" + index.toString() });
      categoryService.create({ name: "teste" + index.toString() });
    } */

    if (id) {
      productService.loadProductById(String(id)).then((res) => {
        res.categoryId = [];
        res.categories?.map((item) => {
          res.categoryId.push(item.id!);
        });

        res.priceSale = convertAmericanFromBrazil(res.priceSale);
        setProduct(res);
      });
    }
  }, [id]);

  const handleSubmit = (productReceived: Product) => {
    const product: Product = JSON.parse(JSON.stringify(productReceived));

    delete product.unity;
    delete product.categories;
    product.priceSale = convertBraziltoAmerican(product.priceSale!)!;

    product.categoryId = product.categoryId.map((item) => Number(item));

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
        categoryService={categoryService}
        product={product}
        router={router}
      />
      <SnackBar message={message} />
    </Styled.Wrapper>
  );
};
