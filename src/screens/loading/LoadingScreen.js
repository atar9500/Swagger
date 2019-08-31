import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {COLOR} from 'react-native-material-ui';
import {selectIsLogin} from '../../redux/reducers/userReducer';
import {connect} from 'react-redux';
import navigationOptions from './navigationOptions';
import {createStructuredSelector} from 'reselect';
import {ROUTES} from '../../routes';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = navigationOptions;

  componentDidUpdate() {
    const {navigation} = this.props;
    if (this.props.isLogin === true) {
      navigation.replace(ROUTES.HOME);
    } else if (this.props.isLogin === false) {
      navigation.replace(ROUTES.INITIAL);
    }
  }

  render() {
    return (
      <View style={styles.parent}>
        <ActivityIndicator size="large" color={COLOR.white} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.blue400,
  },
});

const mapStateToProps = createStructuredSelector({
  isLogin: selectIsLogin,
});

export default connect(mapStateToProps)(LoadingScreen);
