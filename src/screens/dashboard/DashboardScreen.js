import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, FlatList} from 'react-native';
import navigationOptions from './navigationOptions';
import {COLOR} from 'react-native-material-ui';
import Fab from '../../components/Fab';
import {
  selectPosts,
  selectFeedError,
  selectFeedErrorMessage,
} from '../../redux/reducers/feedReducer';
import PostView from '../../components/PostView';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getAllPosts} from '../../redux/actions';
import {selectUserToken} from '../../redux/reducers/userReducer';
import {ROUTES} from '../../routes';
import {NAVIGATION_PARAMS as ADD_POST_PARAMS} from '../add_post/navigationOptions';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isRefreshing: false};
  }

  static navigationOptions = navigationOptions;

  componentDidMount() {
    this.refreshFeed();
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts !== prevProps.posts) {
      this.setState({isRefreshing: false});
    }
  }

  addPost = () =>
    this.props.navigation.navigate(ROUTES.ADD_POST, {
      [ADD_POST_PARAMS.REFRESH_FEED]: this.refreshFeed,
    });

  refreshFeed = () => {
    this.props.refreshFeed(this.props.userToken);
    this.setState({isRefreshing: true});
  };

  renderPost = ({item}) => (
    <PostView
      postId={item.post_id}
      title={item.title}
      imageUrl={item.image_url}
      userId={item.user_id}
      createdAt={item.created_at}
      updatedAt={item.updated_at}
      isMyPost={item.is_my_post}
    />
  );

  render() {
    return (
      <View style={styles.layout}>
        <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />
        <FlatList
          style={styles.list}
          data={this.props.posts}
          renderItem={this.renderPost}
          onRefresh={this.refreshFeed}
          refreshing={this.state.isRefreshing}
        />
        <Fab
          name="image-plus"
          type="material-community"
          color={COLOR.blue400}
          onPress={this.addPost}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.grey100,
  },
  list: {
    flex: 1,
  },
});

const mapStateToProps = createStructuredSelector({
  posts: selectPosts,
  isError: selectFeedError,
  errorMessage: selectFeedErrorMessage,
  userToken: selectUserToken,
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: token => dispatch(getAllPosts(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardScreen);
