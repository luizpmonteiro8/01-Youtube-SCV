import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Menu from '../components/menu';

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Menu />
        <View />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
