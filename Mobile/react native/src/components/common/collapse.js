import React from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Collapse as CollapseReact,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

interface Props {
  title: string;
  children: React.Node;
}

const Collapse: () => Node = ({title, children}: Props) => {
  return (
    <CollapseReact style={styles.CollapseView}>
      <CollapseHeader>
        <View style={styles.CollapseHeader}>
          <Icon style={styles.TextHeaderIcon} name="arrow-forward" size={35} />
          <Text style={styles.TextTitle}>{title}</Text>
        </View>
      </CollapseHeader>
      <CollapseBody>{children}</CollapseBody>
    </CollapseReact>
  );
};

const styles = StyleSheet.create({
  CollapseView: {
    paddingHorizontal: 18,
    marginTop: 25,
  },
  CollapseHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextHeaderIcon: {
    fontSize: 28,
    color: '#fff',
  },
  TextTitle: {
    fontSize: 28,
    color: '#fff',
  },
});

export default Collapse;
