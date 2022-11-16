/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUnityService} from '../../app/services/unity.services';
import {Input} from '../../components/common/input';
import Menu from '../../components/menu';
import Toast from 'react-native-toast-message';

const UnityRegistrationScreen = ({navigation, route}) => {
  const unityService = useUnityService();
  const [unity, setUnity] = useState({id: null, name: ''});
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (route.params) {
      setUnity(route.params);
    }
  }, []);

  const handleSubmit = () => {
    setTouched(true);
    if (unity.name !== '') {
      saveOrUpdateUnity();
    }
  };

  const saveOrUpdateUnity = () => {
    if (Number(unity.id) > 0) {
      unityService
        .update(unity)
        .then(_ => {
          Toast.show({
            type: 'success',
            text1: 'Atualizado',
            text2: 'Atualizado com sucesso.',
          });
          navigation.push('UnityList');
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
      delete unity.id;
      unityService
        .create(unity)
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: `Criado unidade com id:${res.id}.`,
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
          value={unity.id}
          onChange={() => {}}
        />

        <Input
          label="Nome"
          placeholder="Digite um nome"
          error={touched && unity.name == '' ? 'Campo obrigatório' : ''}
          value={unity.name}
          onChange={e => {
            unity.name = e;
            setUnity({...unity});
          }}
        />
      </View>
      <View style={styles.ButtonView}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.ButtonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUnity({id: null, name: ''});
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

export default UnityRegistrationScreen;
