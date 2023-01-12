import * as Styled from "./styles";
import { Unity, useUnityService } from "app";
import { SnackBar } from "components/common/snackBar";
import { UnityForm } from "./form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const UnityRegistration = () => {
  const router = useRouter();
  const { id } = router.query;

  const unityService = useUnityService();

  const [message, setMessage] = useState({ text: "" });
  const [unity, setUnity] = useState<Unity>();

  useEffect(() => {
    if (id) {
      unityService.loadUnityById(String(id)).then((res) => {
        setUnity(res);
      });
    }
  }, [id]);

  const handleSubmit = (unity: Unity) => {
    if (Number(unity.id) > 0) {
      unityService
        .update(unity)
        .then((_) => {
          setMessage({ text: "Atualizado com sucesso." });
        })
        .catch((err) => {
          err.response?.data?.message
            ? setMessage({ text: err.response.data.message })
            : setMessage({ text: "Ocorreu um erro." });
        });
    } else {
      delete unity.id;
      unityService
        .create(unity)
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
      <UnityForm onSubmit={handleSubmit} unity={unity} router={router} />
      <SnackBar message={message} />
    </Styled.Wrapper>
  );
};
