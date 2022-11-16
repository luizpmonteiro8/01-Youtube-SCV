/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useProductService} from '../../app/services/product.services';
import {Input} from '../../components/common/input';
import Menu from '../../components/menu';
import Toast from 'react-native-toast-message';
import {
  convertAmericanFromBrazil,
  convertBraziltoAmerican,
  formatNumberInScreen,
} from '../../components/common/util/formatNumber';

const ProductRegistrationScreen = ({navigation, route}) => {
  const productService = useProductService();
  const [product, setProduct] = useState({
    id: null,
    name: '',
    priceSale: 0,
    unityId: -1,
    unity: {id: null, name: ''},
  });
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (route.params == undefined) {
      return;
    }
    if (Object.keys(route.params).includes('priceSale')) {
      const newProduct = route.params;
      newProduct.priceSale = convertAmericanFromBrazil(newProduct.priceSale);
      setProduct(newProduct);
    } else {
      product.unity = route.params;
      product.unityId = route.params.id;
      setProduct({...product});
    }
  }, [route.params]);

  const handleSubmit = () => {
    setTouched(true);
    if (
      product.name !== '' &&
      Number(convertBraziltoAmerican(product.priceSale)) > 0 &&
      Number(product.unityId) > 0
    ) {
      saveOrUpdateProduct();
    }
  };

  const saveOrUpdateProduct = () => {
    const productCopy = JSON.parse(JSON.stringify(product));
    delete productCopy.unity;
    productCopy.priceSale = convertBraziltoAmerican(product.priceSale);

    if (Number(productCopy.id) > 0) {
      productService
        .update(productCopy)
        .then(_ => {
          Toast.show({
            type: 'success',
            text1: 'Atualizado',
            text2: 'Atualizado com sucesso.',
          });
          navigation.push('ProductList');
        })
        .catch(error => {
          if (error.response.data.message) {
            Toast.show({
              type: 'error',
              text1: 'Erro',
              text2: `${error.response.data.message}`,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Erro',
              text2: 'Ocorreu um erro inesperado',
            });
          }
        });
    } else {
      delete productCopy.id;
      productService
        .create(productCopy)
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: `Criado produto com id:${res.id}.`,
          });
        })
        .catch(error => {
          if (error.response.data.message) {
            Toast.show({
              type: 'error',
              text1: 'Erro',
              text2: `${error.response.data.message}`,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Erro',
              text2: 'Ocorreu um erro inesperado',
            });
          }
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.MenuView}>
        <Menu navigation={navigation} />
      </View>
      <View>
        <Input
          label="Id"
          placeholder=""
          error=""
          disabled={true}
          value={product.id}
          onChange={() => {}}
        />
        <Input
          label="Nome"
          placeholder="Digite um nome"
          error={touched && product.name == '' ? 'Campo obrigatório' : ''}
          value={product.name}
          onChange={e => {
            product.name = e;
            setProduct({...product});
          }}
        />
        <Input
          label="Preço de venda"
          placeholder="Digite um preço de venda"
          error={
            touched && Number(convertBraziltoAmerican(product.priceSale)) <= 0
              ? 'Campo obrigatório'
              : ''
          }
          value={product.priceSale}
          onChange={e => {
            product.priceSale = formatNumberInScreen(e);
            setProduct({...product});
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UnityListSelect');
          }}>
          <Input
            label="Unidade"
            error={
              touched && Number(product.unityId) <= 0 ? 'Campo obrigatório' : ''
            }
            value={product.unity?.name}
            disabled={true}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonView}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.ButtonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setProduct({
              id: null,
              name: '',
              priceSale: 0,
              unityId: -1,
              unity: {id: null, name: ''},
            });
            setTouched(false);
          }}>
          <Text style={styles.ButtonTextCancel}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ButtonView: {display: 'flex', flexDirection: 'row', justifyContent: 'center'},
  ButtonText: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#198754',
    borderColor: '#198754',
    borderWidth: 1,
    marginRight: 15,
    color: '#fff',
    fontSize: 18,
  },
  ButtonTextCancel: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    borderWidth: 1,
    color: '#fff',
    fontSize: 18,
  },
});

export default ProductRegistrationScreen;
