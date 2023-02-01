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
import {useLoginService} from '../../app/services/login.services';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import {Input} from '../../components/common/input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

const LoginScreen: () => Node = ({navigation}) => {
  const loginService = useLoginService();

  const initialValues = {email: '', password: ''};

  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          loginService
            .login(values.email, values.password)
            .then(async resp => {
              await AsyncStorage.setItem('accessToken', resp.accessToken);
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
                  text2: `${'Ocorreu um erro inesperado.'}`,
                });
              }
            });
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Email inválido.')
            .trim('Campo obrigatório.')
            .required('Campo obrigatório.'),
          password: Yup.string()
            .required('Campo obrigatório.')
            .trim('Campo obrigatório.')
            .min(8, 'Deve conter no mínimo 8 caracteres.'),
        })}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View style={styles.ContainerView}>
            <Text style={styles.Title}>SCV</Text>
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
            <Button onPress={handleSubmit} title="Enviar" />
            <View style={styles.Row}>
              <Text style={styles.Text}>Esqueceu a senha?</Text>

              <TouchableOpacity
                onPress={() => navigation.push('UserRegistration')}>
                <Text style={styles.ButtonText}>Cadastrar nova conta</Text>
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
    alignSelf: 'center',
    fontSize: 40,
    color: '#000',
  },

  ButtonText: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#198754',
    borderColor: '#198754',
    borderWidth: 1,
    color: '#fff',
    fontSize: 16,
  },

  Row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  Text: {
    fontSize: 16,
    color: '#000',
  },
});

export default LoginScreen;
