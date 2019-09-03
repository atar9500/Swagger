import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import navigationOptions, {
  NAVIGATION_PARAMS,
  VIEW_MODE,
} from './navigationOptions';
import {COLOR} from 'react-native-material-ui';
import {Button} from 'react-native-elements';
import {validateEmail, validatePassword} from '../../utils/loginUtils';
import {
  selectUserToken,
  selectLoginError,
  selectLoginErrorMessage,
  selectIsLogin,
} from '../../redux/reducers/userReducer';
import {createStructuredSelector} from 'reselect';
import {loginUser, registerUser} from '../../redux/actions';
import {ROUTES} from '../../routes';
import TextField from '../../components/TextField';
import LoadingModal from '../../components/LoadingModal';

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
        <LoadingModal
          visible={this.state.requestSent}
          text={this.getLoadingText()}
          backgroundColor={COLOR.blue400}
          tintColor={COLOR.white}
        />
        <Text style={styles.appTitle}>{APP_NAME}</Text>
        <TextField
          placeholder="Email Address"
          icon="email"
          inputType="email-address"
          onType={this.onEmailType}
          value={this.state.typedEmail}
          error={this.state.emailError}
          style={styles.inputStyle}
          tintColor={COLOR.white}
        />
        <TextField
          placeholder="Password"
          icon="lock"
          hideText={true}
          onType={this.onPasswordType}
          value={this.state.typedPassword}
          error={this.state.passwordError}
          style={styles.inputStyle}
          tintColor={COLOR.white}
        />
        <ContinueButton title={this.getSubtitle()} onPress={this.onContinue} />
      </View>
    );
  }
}

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
    marginBottom: 16,
    width: 280,
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

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken,
  isError: selectLoginError,
  errorMessage: selectLoginErrorMessage,
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
