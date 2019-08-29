import {createStackNavigator, createAppContainer} from 'react-navigation';
import InitialScreen from '../screens/initial/InitialScreen';
import LoginRegisterScreen from '../screens/login_register/LoginRegisterScreen';

export const ROUTES = {
  INITIAL: 'Initial',
  LOGIN_REGISTER: 'LoginRegister',
};

const InitialNavigator = createStackNavigator(
  {
    [ROUTES.INITIAL]: {
      screen: InitialScreen,
    },
    [ROUTES.LOGIN_REGISTER]: {
      screen: LoginRegisterScreen,
    },
  },
  {navigationOptions: {header: null}},
);

const AppNavigator = createStackNavigator({
  InitialNavigator: {
    screen: InitialNavigator,
  },
});

export default createAppContainer(AppNavigator);
