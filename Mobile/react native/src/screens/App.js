/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnityListScreen from './unity/unityList';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import UnityRegistrationScreen from './unity/unityRegistration';
import ProductListScreen from './product/productList';
import ProductRegistrationScreen from './product/productRegistration';
import UnityListSelect from './product/select/unityList';
import LoginScreen from './login/login';
import UserRegistrationScreen from './user/userRegistration';
import CategoryListScreen from './category/categoryList';
import CategoryRegistrationScreen from './category/categoryRegistration';
import CategoryListSelect from './product/select/categoryList';
import ClientRegistrationScreen from './client/clientRegistration';
import ClientListScreen from './client/clientList';

const Stack = createNativeStackNavigator();

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green', height: 'auto'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 20,
        fontWeight: '400',
      }}
      text1NumberOfLines={2}
      text2Style={{
        fontSize: 18,
      }}
      text2NumberOfLines={2}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red', height: 'auto'}}
      text1Style={{
        fontSize: 20,
      }}
      text1NumberOfLines={2}
      text2Style={{
        fontSize: 18,
      }}
      text2NumberOfLines={2}
    />
  ),
};

const App: () => Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserRegistration"
            component={UserRegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UnityList"
            component={UnityListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CategoryList"
            component={CategoryListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ClientList"
            component={ClientListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UnityRegistration"
            component={UnityRegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CategoryRegistration"
            component={CategoryRegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductRegistration"
            component={ProductRegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ClientRegistration"
            component={ClientRegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UnityListSelect"
            component={UnityListSelect}
            options={{headerShown: false, presentation: 'modal'}}
          />
          <Stack.Screen
            name="CategoryListSelect"
            component={CategoryListSelect}
            options={{headerShown: false, presentation: 'modal'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
