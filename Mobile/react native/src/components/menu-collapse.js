import React from 'react';
import type {Node} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Collapse from './common/collapse';

interface Props {
  navigation: any;
}

const MenuCollapse: () => Node = ({navigation}: Props) => {
  return (
    <View>
      <Collapse title="Cadastro">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UnityRegistration');
          }}>
          <View style={styles.ViewCollapse}>
            <Icon name="arrow-right" size={25} color="#fff" />
            <Text style={styles.TextCollapse}>Unidades</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProductRegistration');
          }}>
          <View style={styles.ViewCollapse}>
            <Icon name="arrow-right" size={25} color="#fff" />
            <Text style={styles.TextCollapse}>Produtos</Text>
          </View>
        </TouchableOpacity>
      </Collapse>
      <Collapse title="Listagem">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UnityList');
          }}>
          <View style={styles.ViewCollapse}>
            <Icon name="arrow-right" size={25} color="#fff" />
            <Text style={styles.TextCollapse}>Unidades</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProductList');
          }}>
          <View style={styles.ViewCollapse}>
            <Icon name="arrow-right" size={25} color="#fff" />
            <Text style={styles.TextCollapse}>Produtos</Text>
          </View>
        </TouchableOpacity>
      </Collapse>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewCollapse: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextCollapse: {
    padding: 15,
    fontSize: 18,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    width: '90%',
  },
});

export default MenuCollapse;
