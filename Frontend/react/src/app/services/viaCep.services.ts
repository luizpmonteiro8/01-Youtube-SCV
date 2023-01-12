import axios from "axios";

export const useViaCepService = () => {
  const getAddress = async (cep: string) => {
    const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return {
      street: resp.data.logradouro,
      zipCode: cep,
      district: resp.data.bairro,
      state: resp.data.uf,
    };
  };

  return { getAddress };
};
