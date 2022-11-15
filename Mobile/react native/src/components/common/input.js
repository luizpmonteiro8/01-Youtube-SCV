import React from 'react';

import {StyleSheet, Text, TextInput, View} from 'react-native';
interface Props {
  label: text;
  placeholder: text;
  error: text;
  keyboardType?: text;
  onChange: () => Void;
  password: boolean;
  disabled: boolean;
}

export const Input = ({
  label,
  placeholder,
  error,
  keyboardType = 'default',
  onChange,
  password = false,
  disabled = false,
}: Props) => {
  return (
    <View style={styles.Container}>
      <View style={styles.LabelView}>
        <Text style={styles.LabelText}>{label}</Text>
      </View>
      <View style={styles.InputView}>
        <TextInput
          style={
            error
              ? styles.InputTextError
              : disabled
              ? styles.DisabledInput
              : styles.InputText
          }
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChange}
          secureTextEntry={password}
          editable={!disabled}
        />
      </View>
      {error && (
        <View style={styles.ErrorView}>
          <Text style={styles.ErrorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {margin: 0, paddingHorizontal: 15, paddingVertical: 5},
  LabelView: {margin: 0},
  InputView: {margin: 0},
  ErrorView: {margin: 0},
  LabelText: {fontSize: 20, color: '#000'},
  InputText: {fontSize: 18, borderColor: '#000', borderWidth: 2},
  DisabledInput: {borderColor: '#a7a7a7', borderWidth: 2},
  ErrorText: {color: '#ff0000', fontSize: 18},
  InputTextError: {fontSize: 18, borderColor: '#ff0000', borderWidth: 2},
});
