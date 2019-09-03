import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import navigationOptions, {NAVIGATION_PARAMS} from './navigationOptions';
import {COLOR} from 'react-native-material-ui';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import TextField from '../../components/TextField';
import Fab from '../../components/Fab';
import {Button} from 'react-native-elements';
import LoadingModal from '../../components/LoadingModal';
import toastMaker from '../../utils/toastMaker';
import {addPost} from '../../redux/actions';
import {
  selectUploadSuccess,
  selectPostError,
  selectPostUnauthorized,
} from '../../redux/reducers/postReducer';
import {selectUserToken} from '../../redux/reducers/userReducer';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

const IMAGE_TEXT_PLACEHOLDER = 'No photo selected';
const IMAGE_PICKER_CONFIG = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class AddPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {imageSize: 0, typedTitle: '', uri: null, requestSent: false};
  }

  static navigationOptions = navigationOptions;

  componentDidUpdate(prevProps) {
    const {navigation} = this.props;
    if (this.props.unauthorized) {
    } else if (this.props.uploadSuccess && !prevProps.uploadSuccess) {
      toastMaker('Post Uploaded!');
      const refreshFeed = navigation.getParam(
        NAVIGATION_PARAMS.REFRESH_FEED,
        () => null,
      );
      refreshFeed();
      navigation.goBack();
    } else if (!!this.props.errorMessage) {
      toastMaker(this.props.errorMessage);
    }
  }

  onLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    this.setState({imageSize: layout.width});
  };

  onTitleType = text => this.setState({typedTitle: text});

  onImagePickerResult = ({error, didCancel, data}) => {
    if (error) {
      console.log(`ImagePicker Error: ${error}`);
      toastMaker('Something went wrong, please try again');
    } else if (!didCancel) {
      this.setState({uri: `data:image/jpeg;base64,${data}`});
    }
  };

  openPicker = () =>
    ImagePicker.showImagePicker(IMAGE_PICKER_CONFIG, this.onImagePickerResult);

  onPostClick = () =>
    this.props.uploadPost(
      this.props.userToken,
      this.state.typedTitle,
      this.state.uri,
    );

  render() {
    return (
      <View style={styles.layout} onLayout={this.onLayout}>
        <StatusBar
          barStyle={this.state.requestSent ? 'light-content' : 'dark-content'}
          backgroundColor={this.state.requestSent ? COLOR.blue400 : COLOR.white}
        />
        <LoadingModal
          visible={this.state.requestSent}
          text="Adding post..."
          backgroundColor={COLOR.blue400}
          tintColor={COLOR.white}
        />
        <View style={styles.layout}>
          <TextField
            placeholder="Say something about this post..."
            icon="tooltip-text-outline"
            onType={this.onTitleType}
            value={this.state.typedTitle}
            style={styles.inputStyle}
            tintColor={COLOR.blue400}
          />
          <ChosenImage size={this.state.imageSize} uri={this.state.uri} />
          <Fab
            name="plus"
            type="material-community"
            color={COLOR.blue400}
            onPress={this.openPicker}
          />
        </View>
        <Button
          title="Continue"
          buttonStyle={styles.continueButton}
          titleStyle={styles.continueText}
          containerStyle={styles.continueLayout}
          disabledStyle={styles.continueButtonDisabled}
          disabledTitleStyle={styles.continueText}
          disabled={!this.state.uri || !this.state.typedTitle}
          onPress={this.onPostClick}
        />
      </View>
    );
  }
}

const ChosenImage = React.memo(({size, uri}) => (
  <View style={[styles.imagePlaceholder, {height: size, width: size}]}>
    <FastImage
      style={{height: size, width: size}}
      source={{uri: uri}}
      resizeMode={FastImage.resizeMode.contain}
    />
    {!uri && !!size && (
      <View style={styles.placeholder}>
        <Text style={styles.textPlaceholder}>{IMAGE_TEXT_PLACEHOLDER}</Text>
      </View>
    )}
  </View>
));

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLOR.grey100,
  },
  imagePlaceholder: {
    backgroundColor: COLOR.grey300,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  textPlaceholder: {
    textAlign: 'center',
    fontSize: 22,
    color: COLOR.grey900,
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    marginVertical: 32,
    width: 360,
  },
  continueLayout: {
    width: '100%',
    borderRadius: 0,
  },
  continueButtonDisabled: {
    backgroundColor: COLOR.blue200,
    borderRadius: 0,
  },
  continueButton: {backgroundColor: COLOR.blue400, borderRadius: 0},
  continueText: {fontSize: 22, color: COLOR.white},
});

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken,
  uploadSuccess: selectUploadSuccess,
  errorMessage: selectPostError,
  unauthorized: selectPostUnauthorized,
});

const mapDispatchToProps = dispatch => ({
  uploadPost: (token, title, url) => dispatch(addPost(token, title, url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPostScreen);
