/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Toast from 'react-native-toast-message';
import ModalComponent from '../../components/common/modal';
import Menu from '../../components/menu';
import {FlatListProduct} from './flat-list';
import {useProductService} from '../../app/services/product.services';

const ProductListScreen: () => Node = ({navigation}) => {
  const productService = useProductService();
  const [productList, setProductList] = useState([]);
  const [modalRemove, setModalRemove] = useState(false);
  const [productRemove, setProductRemove] = useState({});

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [sort, setSort] = useState('id');

  useEffect(() => {
    productService
      .loadPageProduct(page, size, search, order, sort)
      .then(res => {
        setProductList(res.results);
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
        console.log(error);
      });
  }, []);

  const loadMoreItemPage = () => {
    setPage(page + 1);

    productService
      .loadPageProduct(page + 1, size, search, order, sort)
      .then(res => {
        setProductList(productList.concat(res.results));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const searchText = searchNow => {
    setPage(0);
    setSearch(searchNow);

    productService
      .loadPageProduct(0, size, searchNow, order, sort)
      .then(res => {
        setProductList(res.results);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.ContainerView}>
        <View style={styles.MenuView}>
          <Menu navigation={navigation} />
        </View>
        <View style={styles.FlatListView}>
          <TextInput
            style={styles.Input}
            onChangeText={value => {
              searchText(value);
            }}
            placeholder="Buscar"
          />
          <FlatListProduct
            productList={productList}
            loadMoreItemPage={loadMoreItemPage}
            setModalRemoveVisible={setModalRemove}
            setProductRemove={setProductRemove}
            navigation={navigation}
          />
        </View>
      </View>
      <ModalComponent
        title={'Remover produto'}
        message={`Deseja remover produto: ${productRemove.name} com id: ${productRemove.id}?`}
        modalVisible={modalRemove}
        onConfirm={() => {
          productService
            .remove(productRemove.id)
            .then(_ => {
              const newList = productList.filter(
                item => item.id != productRemove.id,
              );
              setProductList(newList);
              setModalRemove(false);
              Toast.show({
                type: 'success',
                text1: 'Removido',
                text2: `Produto:${productRemove.name} com id: ${productRemove.id}, removido com sucesso. `,
              });
            })
            .catch(error => {
              console.log(Object.keys(error.response));
              console.log(error);
              console.log(error.response.data.message);
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
                  text2: 'Ocorreu um erro inesperado.',
                });
              }
              setModalRemove(false);
            });
        }}
        onCancel={() => setModalRemove(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ContainerView: {display: 'flex', height: '100%'},
  MenuView: {flex: 1},

  FlatListView: {flex: 9},
  Input: {
    borderColor: '#000',
    borderWidth: 1,
    margin: 15,
    fontSize: 18,
  },
});

export default ProductListScreen;
