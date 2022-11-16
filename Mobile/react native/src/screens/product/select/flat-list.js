import React from 'react';
import {PureComponent} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class FlatListUnity extends PureComponent {
  render() {
    return (
      <FlatList
        data={this.props.unityList}
        renderItem={({item, index}) => (
          <RenderItem
            item={item}
            index={index}
            navigation={this.props.navigation}
          />
        )}
        keyExtractor={(item, index) => item.name + index}
        onEndReached={() => {
          this.props.loadMoreItemPage();
        }}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

class RenderItem extends PureComponent {
  render() {
    return (
      <View style={styles.ItemRender} key={this.props.item.id}>
        <View style={styles.BodyItemRender}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(
                'ProductRegistration',
                this.props.item,
              );
            }}>
            {/* <Text style={styles.TextItemRender}>Index:{this.props.index}</Text> */}
            <Text style={styles.TextItemRender}>Id:{this.props.item.id}</Text>
            <Text style={styles.TextItemRender}>
              Nome:{this.props.item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ItemRender: {
    padding: 15,
    borderBottomColor: '#191A1B',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextItemRender: {
    fontSize: 18,
  },
  BodyItemRender: {flex: 1},
});
