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
import Collapse from './common/collapse';
import MenuCollapse from './menu-collapse';

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
}

interface MenuProps {
  navigation: any;
}

const Menu: () => Node = ({navigation}: MenuProps) => {
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
        <ModalView
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const ModalView = ({modalVisible, setModalVisible, navigation}: ModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.ModalBody}>
        <View style={styles.ModalCloseButton}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Icon name="close" size={50} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <MenuCollapse navigation={navigation} />
        </View>
      </View>
    </Modal>
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
  ModalBody: {
    backgroundColor: '#191A1B',
    height: '100%',
  },
  ModalCloseButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
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

export default Menu;
