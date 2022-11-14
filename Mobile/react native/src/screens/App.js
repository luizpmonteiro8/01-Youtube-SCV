import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnityListScreen from './unity/unityList';
import ProductListScreen from './productList';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UnityList"
          component={UnityListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
