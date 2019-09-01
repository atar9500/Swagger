import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {COLOR} from 'react-native-material-ui';
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
      <Card
        title={title}
        titleStyle={styles.title}
        containerStyle={styles.layout}>
        <View style={styles.imageWrapper} onLayout={this.onLayout}>
          <FastImage
            style={{
              width: this.state.imageSize,
              height: this.state.imageSize,
            }}
            source={{uri: imageUrl}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  layout: {flex: 1, flexDirection: 'column', borderRadius: 8},
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
