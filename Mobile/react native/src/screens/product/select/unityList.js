/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {FlatListUnity} from './flat-list';
import {useUnityService} from '../../../app/services/unity.services';

const UnityListSelect: () => Node = ({navigation}) => {
  const unityService = useUnityService();
  const [unityList, setUnityList] = useState([]);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [sort, setSort] = useState('id');

  useEffect(() => {
    unityService
      .loadPageUnity(page, size, search, order, sort)
      .then(res => {
        setUnityList(res.results);
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
            navigation={navigation}
          />
        </View>
      </View>
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

export default UnityListSelect;
