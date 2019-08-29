import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import navigationOptions from './navigationOptions';
import {COLOR} from 'react-native-material-ui';
import {Button} from 'react-native-elements';
import {ROUTES} from '../../routes';
import {navigationParams} from '../login_register/navigationOptions';

class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = navigationOptions;

  moveToLoginRegister = isLogin =>
    this.props.navigation.navigate(
      ROUTES.LOGIN_REGISTER,
      navigationParams({isLogin: isLogin}),
    );

  onLoginClick = () => this.moveToLoginRegister(true);

  onRegisterClick = () => this.moveToLoginRegister(false);

  render() {
    return (
      <View style={styles.layout}>
        <Text style={styles.appTitle}>Swagger</Text>
        <EntranceButton title="Login" onPress={this.onLoginClick} />
        <EntranceButton title="Register" onPress={this.onRegisterClick} />
      </View>
    );
  }
}

const EntranceButton = React.memo(({title, onPress}) => (
  <Button
    title={title}
    titleStyle={styles.buttonTitleStyle}
    buttonStyle={styles.buttonStyle}
    onPress={onPress}
  />
));

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.blue400,
  },
  buttonTitleStyle: {
    color: COLOR.blue400,
    width: 240,
  },
  buttonStyle: {
    backgroundColor: COLOR.white,
    borderRadius: 40,
    marginBottom: 16,
    width: 240,
  },
  appTitle: {
    fontSize: 48,
    marginBottom: 48,
    color: COLOR.white,
  },
});

export default InitialScreen;
