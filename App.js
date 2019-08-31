import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import {COLOR} from 'react-native-material-ui';
import {createStore} from 'redux';
import reducers from './src/redux/reducers';
import middlewares from './src/redux/middlewares';
import {getInitialStore} from './src/utils/localStorageManager';

const store = createStore(reducers, middlewares);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {store: store};
  }

  componentWillMount() {
    const self = this;
    getInitialStore()
      .then(savedStore =>
        self.setState({store: createStore(reducers, savedStore, middlewares)}),
      )
      .catch(() => console.error('Failed getting initial state.'));
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.blue400} />
        <Routes />
      </Provider>
    );
  }
}

export default App;
