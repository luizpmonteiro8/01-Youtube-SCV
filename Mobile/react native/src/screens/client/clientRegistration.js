/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useClientService} from '../../app/services/client.services';
import {Input} from '../../components/common/input';
import Menu from '../../components/menu';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {cpfMask} from '../../components/common/util/cpfMask';
import {useCountryIbgeService} from '../../app/services/countryIbge.services';
import {SelectList} from 'react-native-dropdown-select-list';
import {useViaCepService} from '../../app/services/viaCep.services';
import {cepMask} from '../../components/common/util/cepMask';

const ClientRegistrationScreen = ({navigation, route}) => {
  const initialValues = {id: null, name: '', cpf: '', address: undefined};
  const [client, setClient] = useState({
    id: null,
    name: '',
    cpf: '',
    address: undefined,
  });

  const [country, setCountry] = useState([]);

  const clientService = useClientService();
  const countryService = useCountryIbgeService();
  const cepService = useViaCepService();

  useEffect(() => {
    countryService.getCountry().then(res => {
      const countryList = res.map(name => {
        return {key: name, value: name};
      });
      setCountry(countryList);
    });

    if (route.params) {
      setClient(route.params);
    }
  }, []);

  const saveOrUpdateClient = values => {
    if (Number(values.id) > 0) {
      delete values.address.id;
      delete values.address.sellerId;
      delete values.address.clientId;

      clientService
        .update(values)
        .then(_ => {
          Toast.show({
            type: 'success',
            text1: 'Atualizado',
            text2: 'Atualizado com sucesso.',
          });
          navigation.push('ClientList');
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
      clientService
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
        initialValues={(initialValues, client)}
        enableReinitialize={true}
        onSubmit={values => {
          saveOrUpdateClient(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Campo obrigatório.')
            .trim('Campo obrigatório.'),
          cpf: Yup.string().trim().required('Campo obrigatório.'),
          address: Yup.object().shape({
            zipCode: Yup.string().trim().required('Campo obrigatório.'),
            street: Yup.string().trim().required('Campo obrigatório.'),
            number: Yup.string().trim().required('Campo obrigatório.'),
            district: Yup.string().trim().required('Campo obrigatório.'),
            state: Yup.string().trim().required('Campo obrigatório.'),
            country: Yup.string().trim().required('Campo obrigatório.'),
          }),
        })}>
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          resetForm,
        }) => (
          <View style={styles.ContainerView}>
            <Input label="Id" value={values.id} disabled={true} />
            <Input
              label="Nome"
              placeholder="Digite o nome"
              value={values.name}
              onChange={handleChange('name')}
              error={touched.name && errors.name ? errors.name : ''}
            />
            <Input
              label="Cpf"
              placeholder="Digite o cpf"
              value={values.cpf}
              onChange={e => {
                setFieldValue('cpf', cpfMask(e));
              }}
              error={touched.cpf && errors.cpf ? errors.cpf : ''}
            />
            <View style={styles.DropDownView}>
              <Text style={styles.LabelText}>País</Text>
              <SelectList
                boxStyles={
                  touched.address && errors.address?.country
                    ? {borderColor: '#F00', borderWidth: 2}
                    : styles.DropDownBox
                }
                setSelected={val => {
                  setFieldValue('address', {
                    ...values.address,
                    country: val,
                  });
                }}
                defaultOption={{
                  key: values.address?.country,
                  value: values.address?.country,
                }}
                data={country}
                placeholder="Selecione o país"
                search={false}
              />
              {touched.address && errors.address && errors.address.country && (
                <Text style={styles.ErrorText}>{errors.address.country}</Text>
              )}
            </View>
            <Input
              label="Cep"
              placeholder="Digite o cep"
              value={values.address?.zipCode}
              onChange={e => {
                setFieldValue('address', {
                  ...values.address,
                  zipCode: cepMask(e),
                });
                if (e.length === 9) {
                  cepService.getAddress(e).then(resp => {
                    setFieldValue('address', {
                      ...values.address,
                      district: resp.district,
                      state: resp.state,
                      street: resp.street,
                      zipCode: resp.zipCode,
                    });
                  });
                }
              }}
            />

            <Input label="Rua" value={values.address?.street} disabled={true} />
            <Input
              label="Número"
              value={values.address?.number}
              onChange={e => {
                setFieldValue('address', {...values.address, number: e});
              }}
            />
            <Input
              label="Complemento"
              placeholder="Digite o complemento"
              value={values.address?.complement}
              onChange={e => {
                setFieldValue('address', {...values.address, complement: e});
              }}
            />
            <Input
              label="Bairro"
              value={values.address?.district}
              disabled={true}
            />
            <Input
              label="Estado"
              value={values.address?.state}
              disabled={true}
            />

            <View style={styles.ButtonView}>
              <TouchableOpacity
                onPress={() => {
                  resetForm();
                  setClient(initialValues);
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
  DropDownView: {
    margin: 15,
  },
  DropDownBox: {
    borderColor: '#000',
    borderRadius: 0,
    borderWidth: 2,
  },
  LabelText: {fontSize: 20, color: '#000'},
  ErrorText: {color: '#ff0000', fontSize: 18},
});

export default ClientRegistrationScreen;
