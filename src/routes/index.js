import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import InitialScreen from '../screens/initial/InitialScreen';
import LoginRegisterScreen from '../screens/login_register/LoginRegisterScreen';
import LoadingScreen from '../screens/loading/LoadingScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AddPostScreen from '../screens/add_post/AddPostScreen';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {COLOR} from 'react-native-material-ui';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ROUTES = {
  LOADING: 'Loding',
  INITIAL: 'Initial',
  LOGIN_REGISTER: 'LoginRegister',
  DASHBOARD: 'Dashboard',
  ADD_POST: 'add_post',
  HOME: 'Home',
};

const tabBarIcon = name => ({tintColor}) => (
  <MaterialIcons
    style={{backgroundColor: 'transparent'}}
    name={name}
    color={tintColor}
    size={24}
  />
);

const DashboardNavigator = createStackNavigator(
  {
    [ROUTES.DASHBOARD]: {
      screen: DashboardScreen,
    },
  },
  {
    navigationOptions: {
      title: 'Dashboard',
      tabBarIcon: tabBarIcon('dashboard'),
    },
  },
);

const HomeNavigator = createMaterialBottomTabNavigator(
  {
    DashboardNavigator: {screen: DashboardNavigator},
  },
  {
    navigationOptions: {header: null},
    initialRouteName: 'DashboardNavigator',
    activeTintColor: COLOR.blue400,
    inactiveTintColor: COLOR.grey400,
    barStyle: {backgroundColor: COLOR.white},
  },
);

const AppNavigator = createStackNavigator(
  {
    [ROUTES.LOADING]: {
      screen: LoadingScreen,
    },
    [ROUTES.INITIAL]: {
      screen: InitialScreen,
    },
    [ROUTES.LOGIN_REGISTER]: {
      screen: LoginRegisterScreen,
    },
    [ROUTES.HOME]: {
      screen: HomeNavigator,
    },
    [ROUTES.ADD_POST]: {
      screen: AddPostScreen,
    },
  },
  {navigationOptions: {header: null}},
);

export default createAppContainer(AppNavigator);
