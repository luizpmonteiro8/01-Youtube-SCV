// 00000-000
export const cepMask = (value: string) => {
  if (value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  } else {
    return '';
  }
};
