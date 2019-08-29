export const NAVIGATION_PARAMS = {
  VIEW_MODE: 'view_mode',
};

export const VIEW_MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export const navigationParams = ({isLogin = true}) => ({
  [NAVIGATION_PARAMS.VIEW_MODE]: isLogin ? VIEW_MODE.LOGIN : VIEW_MODE.REGISTER,
});

const navigationOptions = () => ({header: null});

export default navigationOptions;
