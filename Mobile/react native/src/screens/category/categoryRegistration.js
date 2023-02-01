/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCategoryService} from '../../app/services/category.services';
import {Input} from '../../components/common/input';
import Menu from '../../components/menu';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';

const CategoryRegistrationScreen = ({navigation, route}) => {
  const initialValues = {id: null, name: ''};
  const [category, setCategory] = useState({id: null, name: ''});

  const categoryService = useCategoryService();

  useEffect(() => {
    if (route.params) {
      setCategory(route.params);
    }
  }, []);

  const saveOrUpdateCategory = values => {
    if (Number(values.id) > 0) {
      categoryService
        .update(values)
        .then(_ => {
          Toast.show({
            type: 'success',
            text1: 'Atualizado',
            text2: 'Atualizado com sucesso.',
          });
          navigation.push('CategoryList');
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
      delete values.id;
      categoryService
        .create(values)
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
      <Formik
        initialValues={(initialValues, category)}
        enableReinitialize={true}
        onSubmit={values => {
          saveOrUpdateCategory(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Campo obrigatório.')
            .trim('Campo obrigatório.'),
        })}>
        {({handleChange, handleSubmit, values, errors, touched, resetForm}) => (
          <View style={styles.ContainerView}>
            <Input label="Id" value={values.id} disabled={true} />
            <Input
              label="Nome"
              placeholder="Digite o nome"
              value={values.name}
              onChange={handleChange('name')}
              error={touched.name && errors.name ? errors.name : ''}
            />

            <View style={styles.ButtonView}>
              <TouchableOpacity
                onPress={() => {
                  resetForm();
                  setCategory(initialValues);
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
    marginRight: 15,
    borderWidth: 1,
    color: '#fff',
    fontSize: 18,
  },
});

export default CategoryRegistrationScreen;
