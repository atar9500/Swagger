import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

const LoadingModal = React.memo(
  ({visible, text, backgroundColor, tintColor}) => (
    <Modal
      style={styles.loadingModal}
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <View style={[styles.loading, {backgroundColor: backgroundColor}]}>
        <ActivityIndicator size="large" color={tintColor} />
        <Text style={styles.loadingText}>{text}</Text>
      </View>
    </Modal>
  ),
);

const styles = StyleSheet.create({
  loadingModal: {margin: 0},
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 18,
  },
});

export default LoadingModal;
