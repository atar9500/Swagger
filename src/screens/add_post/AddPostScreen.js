import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import navigationOptions from './navigationOptions';
import {COLOR} from 'react-native-material-ui';
import FastImage from 'react-native-fast-image';
// import {
//   selectPosts,
//   selectFeedError,
//   selectFeedErrorMessage,
// } from '../../redux/reducers/postReducer';
// import {connect} from 'react-redux';
// import {createStructuredSelector} from 'reselect';
// import {getAllPosts} from '../../redux/actions';

const IMAGE_TEXT_PLACEHOLDER = 'Click the edit button below to add an image';

class AddPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {imageSize: 0};
  }

  static navigationOptions = navigationOptions;

  onLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    this.setState({imageSize: layout.width});
  };

  render() {
    return (
      <View style={styles.layout} onLayout={this.onLayout}>
        <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />
        <ChosenImage size={this.state.imageSize} />
      </View>
    );
  }
}

const ChosenImage = React.memo(({size, uri}) =>
  uri ? (
    <FastImage
      style={{
        backgroundColor: 'red',
        width: size,
        height: size,
      }}
      source={{uri: uri}}
      resizeMode={FastImage.resizeMode.contain}
    />
  ) : (
    <View style={[styles.imagePlaceholder, {height: size, width: size}]}>
      <Text style={styles.textPlaceholder}>{IMAGE_TEXT_PLACEHOLDER}</Text>
    </View>
  ),
);

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: COLOR.grey100,
  },
  imagePlaceholder: {
    backgroundColor: COLOR.grey300,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  textPlaceholder: {textAlign: 'center', fontSize: 22, color: COLOR.grey900},
});

// const mapStateToProps = createStructuredSelector({
//   posts: selectPosts,
//   isError: selectFeedError,
//   errorMessage: selectFeedErrorMessage,
//   userToken: selectUserToken,
// });

// const mapDispatchToProps = dispatch => ({
//   refreshFeed: token => dispatch(getAllPosts(token)),
// });

export default AddPostScreen;
