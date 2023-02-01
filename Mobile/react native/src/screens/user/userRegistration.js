import React from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import {Input} from '../../components/common/input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import {useUserService} from '../../app/services/user.services';

const UserRegistrationScreen: () => Node = ({navigation}) => {
  const userService = useUserService();

  const initialValues = {email: '', password: '', name: ''};

  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          userService
            .create(values.name, values.email, values.password)
            .then(_ =>
              Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Usuário criado com sucesso.',
              }),
            )
            .catch(error =>
              Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: `${error.response.data.message}`,
              }),
            );
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .trim('Campo obrigatório.')
            .email('Email inválido.')
            .required('Campo obrigatório.'),
          password: Yup.string()
            .trim('Campo obrigatório.')
            .required('Campo obrigatório.')
            .min(8, 'Deve conter no mínimo 8 caracteres.'),
          name: Yup.string()
            .trim('Campo obrigatório.')
            .required('Campo obrigatório.'),
        })}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View style={styles.ContainerView}>
            <Text style={styles.Title}>Cadastro de usuário</Text>
            <Input
              label="Nome"
              placeholder="Digite o nome"
              value={values.name}
              onChange={handleChange('name')}
              error={touched.name && errors.name ? errors.name : ''}
            />
            <Input
              label="Email"
              placeholder="Digite o email"
              value={values.email}
              onChange={handleChange('email')}
              error={touched.email && errors.email ? errors.email : ''}
            />
            <Input
              label="Senha"
              password={true}
              placeholder="Digite a senha"
              value={values.password}
              onChange={handleChange('password')}
              error={touched.password && errors.password ? errors.password : ''}
            />

            <View style={styles.Row}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Login');
                }}>
                <Text style={styles.ButtonTextCancel}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.ButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ContainerView: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },

  Title: {
    fontSize: 22,
    color: '#000',
    alignSelf: 'center',
  },

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

  Row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },

  Text: {
    fontSize: 16,
    color: '#000',
  },
});

export default UserRegistrationScreen;
