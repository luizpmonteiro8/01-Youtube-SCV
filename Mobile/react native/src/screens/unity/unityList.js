/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Menu from '../../components/menu';
import {useUnityService} from '../../app/services/unity.services';

import {FlatListUnity} from './flat-list';
import ModalComponent from '../../components/common/modal';

const UnityListScreen: () => Node = ({navigation}) => {
  const unityService = useUnityService();
  const [unityList, setUnityList] = useState([]);
  const [modalRemove, setModalRemove] = useState(false);
  const [unityRemove, setUnityRemove] = useState({});

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [sort, setSort] = useState('name');

  useEffect(() => {
    unityService
      .loadPageUnity()
      .then(res => {
        setUnityList(res.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const loadMoreItemPage = () => {
    setPage(page + 1);

    unityService
      .loadPageUnity(page + 1, size, search, order, sort)
      .then(res => {
        setUnityList(unityList.concat(res.results));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const searchText = searchNow => {
    setPage(0);
    setSearch(searchNow);

    unityService
      .loadPageUnity(0, size, searchNow, order, sort)
      .then(res => {
        setUnityList(res.results);
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
          <FlatListUnity
            unityList={unityList}
            loadMoreItemPage={loadMoreItemPage}
            setModalRemoveVisible={setModalRemove}
            setUnityRemove={setUnityRemove}
          />
        </View>
      </View>
      <ModalComponent
        title={'Remover unidades'}
        message={`Deseja remover unidade: ${unityRemove.name} com id: ${unityRemove.id}?`}
        modalVisible={modalRemove}
        onConfirm={() => {
          unityService
            .remove(unityRemove.id)
            .then(_ => {
              const newList = unityList.filter(
                item => item.id != unityRemove.id,
              );
              setUnityList(newList);
              setModalRemove(false);
            })
            .catch(error => {
              console.log(Object.keys(error.response));
              console.log(error);
              console.log(error.response.data.message);
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

export default UnityListScreen;
