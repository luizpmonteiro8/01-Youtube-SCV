import React from 'react';
import {PureComponent} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {convertAmericanFromBrazil} from '../../components/common/util/formatNumber';

export class FlatListProduct extends PureComponent {
  render() {
    return (
      <FlatList
        data={this.props.productList}
        renderItem={({item, index}) => (
          <RenderItem
            item={item}
            index={index}
            setModalRemoveVisible={this.props.setModalRemoveVisible}
            setProductRemove={this.props.setProductRemove}
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
    console.log(this.props.item);
    return (
      <View style={styles.ItemRender} key={this.props.item.id}>
        <View style={styles.BodyItemRender}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.push(
                'ProductRegistration',
                this.props.item,
              );
            }}>
            {/* <Text style={styles.TextItemRender}>Index:{this.props.index}</Text> */}
            <Text style={styles.TextItemRender}>Id:{this.props.item.id}</Text>
            <Text style={styles.TextItemRender}>
              Nome:{this.props.item.name}
            </Text>
            <Text style={styles.TextItemRender}>
              Preço de venda: R$
              {convertAmericanFromBrazil(this.props.item.priceSale)}
            </Text>
            <Text style={styles.TextItemRender}>
              Unidade: {this.props.item.unity.name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ActionItemRender}>
          <TouchableOpacity
            onPress={() => {
              this.props.setProductRemove(this.props.item);
              this.props.setModalRemoveVisible(true);
            }}>
            <View style={styles.ViewCollapse}>
              <Icon name="trash-o" size={35} color="#000" />
            </View>
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
  BodyItemRender: {flex: 8},
  ActionItemRender: {flex: 2},
});
