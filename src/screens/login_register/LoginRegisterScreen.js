import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import navigationOptions, {
  NAVIGATION_PARAMS,
  VIEW_MODE,
} from './navigationOptions';
import {COLOR} from 'react-native-material-ui';
import {Input, Button} from 'react-native-elements';

const APP_NAME = 'Swagger';
const LOGIN_SUBTITLE = 'Login';
const REGISTER_SUBTITLE = 'Register';

class LoginRegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = navigationOptions;

  getSubtitle = () => {
    const {navigation} = this.props;
    switch (navigation.getParam(NAVIGATION_PARAMS.VIEW_MODE)) {
      case VIEW_MODE.LOGIN:
        return LOGIN_SUBTITLE;
      case VIEW_MODE.REGISTER:
        return REGISTER_SUBTITLE;
    }
  };

  render() {
    return (
      <View style={styles.layout}>
        <Text style={styles.appTitle}>{APP_NAME}</Text>
        <TextField
          placeholder="Email Address"
          icon="email"
          inputType="email-address"
        />
        <TextField placeholder="Password" icon="lock" hideText={true} />
        <ContinueButton title={this.getSubtitle()} />
      </View>
    );
  }
}

const TextField = React.memo(({placeholder, icon, inputType, hideText}) => (
  <Input
    inputContainerStyle={styles.inputContainerStyle}
    containerStyle={styles.containerStyle}
    leftIcon={{
      name: icon,
      type: 'material-community',
      color: COLOR.white,
      size: 18,
    }}
    secureTextEntry={hideText}
    inputStyle={styles.inputStyle}
    autoFocus={false}
    keyboardType={inputType}
    errorStyle={styles.inputErrorStyle}
    autoCorrect={false}
    blurOnSubmit={false}
    placeholderTextColor={COLOR.grey200}
    placeholder={placeholder}
    selectionColor={COLOR.white}
  />
));

const ContinueButton = React.memo(({title, onPress}) => (
  <Button
    title={title}
    titleStyle={styles.buttonTitleStyle}
    buttonStyle={styles.buttonStyle}
    type="outline"
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
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: COLOR.white,
    fontSize: 16,
  },
  containerStyle: {
    marginBottom: 16,
    width: 280,
  },
  inputContainerStyle: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLOR.white,
    height: 45,
  },
  inputErrorStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: COLOR.red300,
  },
  appTitle: {
    fontSize: 48,
    marginBottom: 48,
    color: COLOR.white,
  },
  buttonTitleStyle: {
    color: COLOR.blue400,
    width: 240,
  },
  buttonStyle: {
    backgroundColor: COLOR.white,
    borderRadius: 40,
    marginBottom: 16,
    width: 260,
  },
});

export default LoginRegisterScreen;
