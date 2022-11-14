import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Menu from '../components/menu';

const ProductListScreen: () => Node = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Menu navigation={navigation} />
        <View>
          <Text style={{fontSize: 28}}>Produto lista</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ProductListScreen;
