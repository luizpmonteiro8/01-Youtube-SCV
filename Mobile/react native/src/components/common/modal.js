import React from 'react';
import type {Node} from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';

interface Props {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  modalVisible: boolean;
}

const ModalComponent: () => Node = ({
  title,
  message,
  onConfirm,
  onCancel,
  modalVisible,
}: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.Container}>
        <View style={styles.ModalTitle}>
          <Text style={styles.ModalTitleText}>{title}</Text>
        </View>
        <View style={styles.ModalMessage}>
          <Text style={styles.ModalMessageText}>{message}</Text>
        </View>
        <View style={styles.ModalButton}>
          <View style={styles.ModalButtonConfirm}>
            <Button color={'red'} title="Ok" onPress={onConfirm} />
          </View>
          <Button title="Cancelar" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
    height: 220,
    backgroundColor: '#c4cbd7',
    borderRadius: 5,
    padding: 15,
    position: 'absolute',
    bottom: 0,
    marginBottom: 15,
  },
  ModalTitle: {alignItems: 'center'},
  ModalTitleText: {fontSize: 28, fontWeight: 'bold'},
  ModalButton: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ModalMessageText: {fontSize: 18},
  ModalButtonConfirm: {marginRight: 15},
});

export default ModalComponent;
