export const formatNumberInScreen = (valor: string | number) => {
  valor = valor + '';

  valor = valor.replace('+', '');
  valor = valor.replace('-', '');
  valor = parseInt(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{2})$/g, ',$1');

  if (valor.length == 1) {
    valor = valor.replace(/([0-9]{1})$/g, '0,0$1');
  }

  if (valor.length == 3) {
    valor = valor.replace(/([0-9]{2})$/g, '0,$1');
    valor = valor.replace(',', '');
  }

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  }
  if (valor.length > 10) {
    valor = valor.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3');
  }
  if (valor.length > 14) {
    valor = valor.replace(
      /([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,
      '.$1.$2.$3,$4',
    );
  }

  if (valor == 'NaN') {
    valor = '';
  }
  return valor;
};

export const formatNumber3DecimalInScreen = (valor: string | number) => {
  if (
    valor == '0' ||
    valor == '0,00' ||
    valor == '0,0' ||
    valor == '0.00' ||
    valor == '0.0' ||
    valor == null ||
    valor == undefined
  ) {
    return '';
  }

  valor = valor + '';
  valor = valor.replace('+', '');
  valor = valor.replace('-', '');

  valor = parseInt(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{3})$/g, ',$1');

  if (valor.length == 1) {
    valor = valor.replace(/([0-9]{1})$/g, '0,00$1');
  }
  if (valor.length == 2) {
    valor = valor.replace(/([0-9]{2})$/g, '0,0$1');
  }

  if (valor.length == 4) {
    valor = valor.replace(/([0-9]{3})$/g, '0,$1');
    valor = valor.replace(',', '');
  }

  if (valor.length > 7) {
    valor = valor.replace(/([0-9]{3}),([0-9]{3}$)/g, '.$1,$2');
  }
  if (valor.length > 11) {
    valor = valor.replace(/([0-9]{3}).([0-9]{3}),([0-9]{3}$)/g, '.$1.$2,$3');
  }

  if (valor == 'NaN') {
    valor = '';
  }
  return valor;
};

export const convertBraziltoAmerican = (valor: string | number) => {
  if (valor == null) {
    return null;
  }
  valor = valor + '';
  valor = valor.replace('.', '');
  valor = valor.replace(',', '.');

  return valor;
};

export const convertAmericanFromBrazil = (value: string | number) => {
  if (
    value == '0' ||
    value == '0,00' ||
    value == '0,0' ||
    value == '0.00' ||
    value == '0.0' ||
    value == null ||
    value == undefined
  ) {
    return '';
  } else {
    return Number(value).toLocaleString('pt-br', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
};
