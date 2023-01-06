import * as Styled from "./styles";
import { Category, useCategoryService } from "app";
import { SnackBar } from "components/common/snackBar";
import { CategoryForm } from "./form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const CategoryRegistration = () => {
  const router = useRouter();
  const { id } = router.query;

  const categoryService = useCategoryService();

  const [message, setMessage] = useState({ text: "" });
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    if (id) {
      categoryService.loadCategoryById(String(id)).then((res) => {
        setCategory(res);
      });
    }
  }, []);

  const handleSubmit = (category: Category) => {
    if (Number(category.id) > 0) {
      categoryService
        .update(category)
        .then((_) => {
          setMessage({ text: "Atualizado com sucesso." });
        })
        .catch((err) => {
          err.response?.data?.message
            ? setMessage({ text: err.response.data.message })
            : setMessage({ text: "Ocorreu um erro." });
        });
    } else {
      delete category.id;
      categoryService
        .create(category)
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
      <CategoryForm
        onSubmit={handleSubmit}
        category={category}
        router={router}
      />
      <SnackBar message={message} />
    </Styled.Wrapper>
  );
};
