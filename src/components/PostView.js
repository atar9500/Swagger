import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLOR} from 'react-native-material-ui';

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
    const {title, uri} = this.props;
    return (
      <View style={styles.layout} onLayout={this.onLayout}>
        <Text style={styles.title}>{title}</Text>
        <FastImage
          style={[
            styles.image,
            {width: this.state.imageSize, height: this.state.imageSize},
          ]}
          source={{
            uri: uri,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    flexDirection: 'column',
  },
  image: {
    backgroundColor: 'red',
  },
  title: {
    color: COLOR.grey900,
    fontWeight: 'bold',
    fontSize: 22,
    margin: 16,
  },
});

export default PostView;
