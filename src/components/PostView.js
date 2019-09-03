import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLOR} from 'react-native-material-ui';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';

class PostView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {imageSize: 0};
  }

  onLayout = ({nativeEvent}) => {
    const {layout} = nativeEvent;
    this.setState({imageSize: layout.width});
  };

  render() {
    const {
      postId,
      title,
      imageUrl,
      userId,
      createdAt,
      updatedAt,
      isMyPost,
    } = this.props;
    return (
      <Card containerStyle={styles.layout}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.imageWrapper} onLayout={this.onLayout}>
          <FastImage
            style={{
              width: this.state.imageSize,
              height: this.state.imageSize,
            }}
            source={{uri: imageUrl, priority: FastImage.priority.normal}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 8,
    borderColor: COLOR.grey400,
    backgroundColor: COLOR.white,
    margin: 16,
    padding: 0,
  },
  imageWrapper: {width: '100%'},
  title: {
    color: COLOR.grey900,
    fontWeight: 'bold',
    fontSize: 22,
    margin: 16,
  },
});

PostView.propTypes = {
  postId: PropTypes.number,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  userId: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  isMyPost: PropTypes.bool,
};

export default PostView;
