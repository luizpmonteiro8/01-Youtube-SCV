/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Menu from '../../components/menu';
import {useCategoryService} from '../../app/services/category.services';
import Toast from 'react-native-toast-message';
import {FlatListCategory} from './flat-list';
import ModalComponent from '../../components/common/modal';

const CategoryListScreen: () => Node = ({navigation}) => {
  const categoryService = useCategoryService();
  const [categoryList, setCategoryList] = useState([]);
  const [modalRemove, setModalRemove] = useState(false);
  const [categoryRemove, setCategoryRemove] = useState({});

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [sort, setSort] = useState('id');

  useEffect(() => {
    categoryService
      .loadPageCategory(page, size, search, order, sort)
      .then(res => {
        setCategoryList(res.results);
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
  }, []);

  const loadMoreItemPage = () => {
    setPage(page + 1);

    categoryService
      .loadPageCategory(page + 1, size, search, order, sort)
      .then(res => {
        setCategoryList(categoryList.concat(res.results));
      })
      .catch(err => {});
  };

  const searchText = searchNow => {
    setPage(0);
    setSearch(searchNow);

    categoryService
      .loadPageCategory(0, size, searchNow, order, sort)
      .then(res => {
        setCategoryList(res.results);
      })
      .catch(err => {});
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
          <FlatListCategory
            categoryList={categoryList}
            loadMoreItemPage={loadMoreItemPage}
            setModalRemoveVisible={setModalRemove}
            setCategoryRemove={setCategoryRemove}
            navigation={navigation}
          />
        </View>
      </View>
      <ModalComponent
        title={'Remover categoria'}
        message={`Deseja remover categoria: ${categoryRemove.name} com id: ${categoryRemove.id}?`}
        modalVisible={modalRemove}
        onConfirm={() => {
          categoryService
            .remove(categoryRemove.id)
            .then(_ => {
              const newList = categoryList.filter(
                item => item.id != categoryRemove.id,
              );
              setCategoryList(newList);
              setModalRemove(false);
              Toast.show({
                type: 'success',
                text1: 'Removido',
                text2: `Categoria:${categoryRemove.name} com id: ${categoryRemove.id}, removido com sucesso. `,
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

export default CategoryListScreen;
