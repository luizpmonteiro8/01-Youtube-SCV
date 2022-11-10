import React, {useState} from 'react';
import type {Node} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Menu: () => Node = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.backGround}>
          <Text style={styles.TextMenu}>SCV</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Icon name="menu" size={50} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.Modal}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Icon name="close" size={50} color="#fff" />
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backGround: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#c4cbd7',
    height: 80,
  },

  TextMenu: {
    fontSize: 35,
    fontWeight: '600',
  },
  Modal: {
    backgroundColor: '#000',
    height: '100%',
    width: '85%',
  },
});

export default Menu;
