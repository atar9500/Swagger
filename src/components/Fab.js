import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const Fab = React.memo(({color, type, name, onPress}) => (
  <Icon
    name={name}
    type={type}
    color={color}
    size={28}
    reverse
    raised
    containerStyle={styles.fab}
    onPress={onPress}
  />
));

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 999,
  },
});

export default Fab;
