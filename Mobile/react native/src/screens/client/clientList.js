/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Menu from '../../components/menu';
import {useClientService} from '../../app/services/client.services';
import Toast from 'react-native-toast-message';
import {FlatListClient} from './flat-list';
import ModalComponent from '../../components/common/modal';

const ClientListScreen: () => Node = ({navigation}) => {
  const clientService = useClientService();
  const [clientList, setClientList] = useState([]);
  const [modalRemove, setModalRemove] = useState(false);
  const [clientRemove, setClientRemove] = useState({});

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [sort, setSort] = useState('id');

  useEffect(() => {
    clientService
      .loadPageClient(page, size, search, order, sort)
      .then(res => {
        setClientList(res.results);
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

    clientService
      .loadPageClient(page + 1, size, search, order, sort)
      .then(res => {
        setClientList(clientList.concat(res.results));
      })
      .catch(err => {});
  };

  const searchText = searchNow => {
    setPage(0);
    setSearch(searchNow);

    clientService
      .loadPageClient(0, size, searchNow, order, sort)
      .then(res => {
        setClientList(res.results);
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
          <FlatListClient
            clientList={clientList}
            loadMoreItemPage={loadMoreItemPage}
            setModalRemoveVisible={setModalRemove}
            setClientRemove={setClientRemove}
            navigation={navigation}
          />
        </View>
      </View>
      <ModalComponent
        title={'Remover unidades'}
        message={`Deseja remover unidade: ${clientRemove.name} com id: ${clientRemove.id}?`}
        modalVisible={modalRemove}
        onConfirm={() => {
          clientService
            .remove(clientRemove.id)
            .then(_ => {
              const newList = clientList.filter(
                item => item.id != clientRemove.id,
              );
              setClientList(newList);
              setModalRemove(false);
              Toast.show({
                type: 'success',
                text1: 'Removido',
                text2: `Unidade:${clientRemove.name} com id: ${clientRemove.id}, removido com sucesso. `,
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

export default ClientListScreen;
