import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import navigationOptions from './navigationOptions';
import {COLOR} from 'react-native-material-ui';
import {Icon} from 'react-native-elements';
import Fab from '../../components/Fab';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = navigationOptions;

  addPost = () => {};

  render() {
    return (
      <View style={styles.layout}>
        <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />
        <Fab
          name="image-plus"
          type="material-community"
          color={COLOR.blue400}
          onPress={this.addPost}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.grey100,
  },
});

export default DashboardScreen;
