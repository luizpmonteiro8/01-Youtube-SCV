import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Input} from '../../components/common/input';
import Menu from '../../components/menu';

const UnityRegistrationScreen = ({navigation}) => {
  const [unity, setUnity] = useState({id: null, name: ''});

  return (
    <ScrollView>
      <View style={styles.MenuView}>
        <Menu navigation={navigation} />
      </View>
      <View>
        <Input
          label="Disabled"
          placeholder=""
          error=""
          disabled={true}
          onChange={() => {}}
        />
        <Input
          label="Normal"
          placeholder="Digite um nome"
          error=""
          onChange={() => {}}
        />
        <Input
          label="Erro"
          placeholder="Digite um nome"
          error="Campo obrigatório"
          onChange={() => {}}
        />
        <Input
          label="Password"
          placeholder="Digite um nome"
          password={true}
          onChange={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default UnityRegistrationScreen;
