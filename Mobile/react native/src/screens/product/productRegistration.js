/* eslint-disable react-native/no-inline-styles */
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
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductRegistrationScreen = ({navigation, route}) => {
  const initialValues = {
    id: null,
    name: '',
    priceSale: 0,
    unityId: -1,
    unity: {id: null, name: ''},
    categoryId: [],
  };
  const productService = useProductService();
  const [product, setProduct] = useState({
    id: null,
    name: '',
    priceSale: 0,
    unityId: -1,
    unity: {id: null, name: ''},
    categoryId: [],
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (route.params == undefined) {
      return;
    }
    if (Object.keys(route.params).includes('priceSale')) {
      const newProduct = route.params;
      newProduct.priceSale = convertAmericanFromBrazil(newProduct.priceSale);
      newProduct.categoryId = route.params.categories.map(item => item.id);
      setCategories(route.params.categories);
      setProduct(newProduct);
    } else if (route.params.type === 'unity') {
      product.unity = route.params;
      product.unityId = route.params.id;
      setProduct({...product});
    } else if (route.params.type === 'category') {
      categories.push(route.params);
      setCategories(categories);
      product.categoryId.push(route.params.id);
      setProduct({...product});
    }
  }, [route.params]);

  const saveOrUpdateProduct = values => {
    const productCopy = JSON.parse(JSON.stringify(values));
    delete productCopy.unity;
    productCopy.priceSale = convertBraziltoAmerican(product.priceSale);

    productCopy.categoryId = productCopy.categoryId.map(item => Number(item));
    delete productCopy.categories;

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
      <Formik
        initialValues={(initialValues, product)}
        enableReinitialize={true}
        onSubmit={values => {
          console.log(values);
          saveOrUpdateProduct(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Campo obrigatório.')
            .trim('Campo obrigatório.'),
          priceSale: Yup.string()
            .required('Campo obrigatório.')
            .test(
              'isNumber',
              'Campo obrigatório',
              values => convertBraziltoAmerican(values) > 0,
            ),
          unityId: Yup.number().positive('Campo obrigatório.'),
          categoryId: Yup.array()
            .min(1, 'Campo obrigatório.')
            .of(
              Yup.number()
                .positive('Campo obrigatório.')
                .required('Campo obrigatório.'),
            ),
        })}>
        {({handleChange, handleSubmit, values, errors, touched, resetForm}) => (
          <View>
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
                error={touched.name && errors.name ? errors.name : ''}
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
                  touched.priceSale && errors.priceSale ? errors.priceSale : ''
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
                    touched.unityId && errors.unityId ? errors.unityId : ''
                  }
                  value={product.unity?.name}
                  disabled={true}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.CategoryList}>
              <View style={{...styles.RowSpaceBetween, marginBottom: 15}}>
                <Text style={styles.LabelText}>Categorias</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CategoryListSelect');
                  }}>
                  <Icon name="add" size={25} color="#000" />
                </TouchableOpacity>
              </View>
              {touched.categoryId && errors.categoryId && (
                <Text style={styles.ErrorText}>{errors.categoryId}</Text>
              )}

              {categories.map((category, index) => {
                return (
                  <View style={styles.RowSpaceBetween} key={'category' + index}>
                    <Text style={styles.TextCategoryList}>{category.name}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        categories.splice(index, 1);
                        setCategories(categories);
                        product.categoryId = product.categoryId.filter(
                          itemCategory => itemCategory !== category.id,
                        );
                        setProduct({...product});
                      }}>
                      <Icon name="remove" size={25} color="#000" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <View style={styles.ButtonView}>
              <TouchableOpacity
                onPress={() => {
                  setProduct({
                    id: null,
                    name: '',
                    priceSale: 0,
                    unityId: -1,
                    unity: {id: null, name: ''},
                    categoryId: [],
                  });
                  setCategories([]);
                  resetForm();
                }}>
                <Text style={styles.ButtonTextCancel}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.ButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
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
    marginRight: 15,
    fontSize: 18,
  },
  CategoryList: {padding: 15},
  RowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LabelText: {fontSize: 20, color: '#000'},
  ErrorText: {color: '#ff0000', fontSize: 18},
  TextCategoryList: {fontSize: 14, marginBottom: 15},
});

export default ProductRegistrationScreen;
