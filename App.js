import React, {Component} from 'react';
import {StatusBar, Fragment, View} from 'react-native';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import {COLOR} from 'react-native-material-ui';
import {createStore} from 'redux';

let store = createStore(() => ({}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.blue400} />
        <Routes />
      </Provider>
    );
  }
}

export default App;
