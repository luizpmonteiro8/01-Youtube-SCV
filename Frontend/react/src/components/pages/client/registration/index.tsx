import * as Styled from "./styles";
import {
  Client,
  useClientService,
  useCountryIbgeService,
  useViaCepService,
} from "app";
import { SnackBar } from "components/common/snackBar";
import { ClientForm } from "./form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const ClientRegistration = () => {
  const router = useRouter();
  const { id } = router.query;

  const clientService = useClientService();
  const countryService = useCountryIbgeService();
  const cepService = useViaCepService();

  const [message, setMessage] = useState({ text: "" });
  const [client, setClient] = useState<Client>();
  const [countryList, setCountryList] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      clientService.loadClientById(String(id)).then((res) => {
        setClient(res);
      });
    }
    countryService.getCountry().then((resp) => setCountryList(resp));
  }, [id]);

  const handleSubmit = (client: Client) => {
    if (Number(client.id) > 0) {
      delete client!.address!.id;
      delete client!.address!.clientId;
      delete client!.address!.sellerId;
      clientService
        .update(client)
        .then((_) => {
          setMessage({ text: "Atualizado com sucesso." });
        })
        .catch((err) => {
          err.response?.data?.message
            ? setMessage({ text: err.response.data.message })
            : setMessage({ text: "Ocorreu um erro." });
        });
    } else {
      delete client.id;
      clientService
        .create(client)
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
      <ClientForm
        onSubmit={handleSubmit}
        client={client}
        router={router}
        countryList={countryList}
        cepService={cepService}
      />
      <SnackBar message={message} />
    </Styled.Wrapper>
  );
};
