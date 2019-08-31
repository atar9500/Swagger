import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import navigationOptions, {
  NAVIGATION_PARAMS,
  VIEW_MODE,
} from './navigationOptions';
import {COLOR} from 'react-native-material-ui';
import {Input, Button} from 'react-native-elements';
import {validateEmail, validatePassword} from '../../utils/loginUtils';
import {
  selectUserToken,
  selectLoginError,
  selectErrorMessage,
  selectIsLogin,
} from '../../redux/reducers/userReducer';
import {createStructuredSelector} from 'reselect';
import {loginUser, registerUser} from '../../redux/actions';
import Modal from 'react-native-modal';
import {ROUTES} from '../../routes';

const APP_NAME = 'Swagger';
const LOGIN_SUBTITLE = 'Login';
const REGISTER_SUBTITLE = 'Register';
const LOGIN_LOADING_TEXT = 'Logging you in...';
const REGISTER_LOADING_TEXT = 'Registering...';

class LoginRegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedEmail: '',
      typedPassword: '',
      emailError: '',
      passwordError: '',
      requestSent: false,
    };
  }

  static navigationOptions = navigationOptions;

  static getDerivedStateFromProps(props, state) {
    if (props.isError && state.requestSent) {
      return {passwordError: props.errorMessage, requestSent: false};
    }
    return null;
  }

  componentDidUpdate() {
    const {navigation} = this.props;
    if (this.props.isLogin) {
      navigation.replace(ROUTES.HOME);
    }
  }

  getSubtitle = () => {
    const {navigation} = this.props;
    switch (navigation.getParam(NAVIGATION_PARAMS.VIEW_MODE)) {
      case VIEW_MODE.LOGIN:
        return LOGIN_SUBTITLE;
      case VIEW_MODE.REGISTER:
        return REGISTER_SUBTITLE;
    }
  };

  getLoadingText = () => {
    const {navigation} = this.props;
    switch (navigation.getParam(NAVIGATION_PARAMS.VIEW_MODE)) {
      case VIEW_MODE.LOGIN:
        return LOGIN_LOADING_TEXT;
      case VIEW_MODE.REGISTER:
        return REGISTER_LOADING_TEXT;
    }
  };

  onEmailType = text => this.setState({typedEmail: text, emailError: ''});

  onPasswordType = text =>
    this.setState({typedPassword: text, passwordError: ''});

  onContinue = () => {
    if (!validateEmail(this.state.typedEmail)) {
      this.setState({emailError: 'Invalid email address'});
      return;
    }
    if (!validatePassword(this.state.typedPassword)) {
      this.setState({passwordError: 'Password must contain 8-16 characters'});
      return;
    }
    const {navigation, login, register} = this.props;
    switch (navigation.getParam(NAVIGATION_PARAMS.VIEW_MODE)) {
      case VIEW_MODE.LOGIN:
        login(this.state.typedEmail, this.state.typedPassword);
        break;
      case VIEW_MODE.REGISTER:
        register(this.state.typedEmail, this.state.typedPassword);
        break;
    }
    this.setState({requestSent: true, emailError: '', passwordError: ''});
  };

  render() {
    return (
      <View style={styles.layout}>
        <Loading
          visible={this.state.requestSent}
          text={this.getLoadingText()}
        />
        <Text style={styles.appTitle}>{APP_NAME}</Text>
        <TextField
          placeholder="Email Address"
          icon="email"
          inputType="email-address"
          onType={this.onEmailType}
          value={this.state.typedEmail}
          error={this.state.emailError}
        />
        <TextField
          placeholder="Password"
          icon="lock"
          hideText={true}
          onType={this.onPasswordType}
          value={this.state.typedPassword}
          error={this.state.passwordError}
        />
        <ContinueButton title={this.getSubtitle()} onPress={this.onContinue} />
      </View>
    );
  }
}

const TextField = React.memo(
  ({placeholder, icon, inputType, hideText, onType, error, value}) => (
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
      onChangeText={onType}
      errorMessage={error}
      value={value}
    />
  ),
);

const ContinueButton = React.memo(({title, onPress}) => (
  <Button
    title={title}
    titleStyle={styles.buttonTitleStyle}
    buttonStyle={styles.buttonStyle}
    type="outline"
    onPress={onPress}
  />
));

const Loading = React.memo(({visible, text}) => (
  <Modal
    style={{margin: 0}}
    isVisible={visible}
    animationIn="fadeIn"
    animationOut="fadeOut">
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={COLOR.white} />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  </Modal>
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
    fontWeight: 'bold',
    fontSize: 12,
    padding: 4,
    color: COLOR.white,
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
  loadingModal: {margin: 0},
  loading: {
    flex: 1,
    backgroundColor: COLOR.blue400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: COLOR.white,
    fontSize: 18,
  },
});

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken,
  isError: selectLoginError,
  errorMessage: selectErrorMessage,
  isLogin: selectIsLogin,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginUser(email, password)),
  register: (email, password) => dispatch(registerUser(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginRegisterScreen);
