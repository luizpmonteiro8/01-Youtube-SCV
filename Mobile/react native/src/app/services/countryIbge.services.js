import axios from 'axios';

export const useCountryIbgeService = () => {
  const getCountry = async () => {
    const resp = await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/paises',
    );
    const country = new Set();

    resp.data.map((item: any) => {
      country.add(item.nome.abreviado);
    });

    const countryOrder = Array.from(country).sort();

    return countryOrder;
  };

  return {getCountry};
};
