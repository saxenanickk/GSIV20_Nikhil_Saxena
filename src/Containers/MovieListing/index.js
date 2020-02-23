/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Button,
} from 'react-native';
import {getAllUpcomingMovies, getGenres} from '../../actions';
import {connect} from 'react-redux';
import MovieCard from '../../Components/MovieCard';
import {
  GSynergyTextInputRegular,
  GSynergyTextRegular,
} from '../../Components/GSynergyText';
import {searchInMovies} from '../../Utils';

const {width, height} = Dimensions.get('window');
const BATCH_SIZE = 16;
const NUM_COLUMNS = 2;
const THUMBNAIL_WIDTH = width / NUM_COLUMNS;

class MovieListing extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchResults: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(getGenres());
    this.makeRemoteRequest(1, true, false);
  }

  makeRemoteRequest = async (page, isLoading = false, isRefreshing = false) => {
    const {total_pages, dispatch} = this.props;

    if (total_pages && this.props.page > total_pages && !isRefreshing) {
      dispatch({type: 'IS_LOADING', payload: false});
    } else {
      dispatch(getAllUpcomingMovies({page, isLoading, isRefreshing}));
    }
  };

  handleLoadMore = () => {
    const {page} = this.props;
    this.makeRemoteRequest(page + 1, true, false);
  };

  handleRefresh = () => {
    this.makeRemoteRequest(1, false, true);
  };

  renderItem = ({item, index}) => {
    const {genres} = this.props;
    return (
      <MovieCard
        thumbnail={true}
        onPress={() =>
          this.props.navigation.navigate('Movie Details', {
            movieId: item.id,
          })
        }
        itemWidth={THUMBNAIL_WIDTH}
        genres={genres}
        item={item}
      />
    );
  };

  renderFooter = () => {
    const {isLoading} = this.props;

    if (!isLoading) {
      return null;
    }

    return <ActivityIndicator style={{marginVertical: 24}} size="large" />;
  };

  getItemLayout = (data, index) => ({
    length: THUMBNAIL_WIDTH,
    offset: THUMBNAIL_WIDTH * index,
    index,
  });

  onChangeText = text => {
    const {movies} = this.props;

    const tempData = movies.slice();
    let tempResults = searchInMovies(tempData, text);
    this.setState({searchQuery: text, searchResults: tempResults});
  };

  noMatchFoundError = () => {
    const {searchQuery, searchResults} = this.state;

    if (searchQuery.length && !searchResults.length) {
      console.log('Hello');
      return (
        <View style={{paddingHorizontal: 10}}>
          <GSynergyTextRegular color={'red'}>
            {'No match found. All data is being shown.'}
          </GSynergyTextRegular>
        </View>
      );
    }
    return null;
  };

  render() {
    const {isRefreshing, isLoading, error, movies} = this.props;
    const {searchResults, searchQuery} = this.state;

    // Data provider to render Flatlist
    let listData = movies;
    // If data is being searched then search results list is our main data provider
    if (searchQuery.length && searchResults.length) {
      listData = searchResults;
    }

    if (isLoading && !movies.length) {
      return <ActivityIndicator style={{marginVertical: 24}} size="large" />;
    }

    if (error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16}}>{error.message}</Text>
          <Button
            onPress={() => this.makeRemoteRequest(1, true, false)}
            title="Try Again"
          />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View>
          <GSynergyTextInputRegular
            style={{
              backgroundColor: '#ffffff',
              padding: 10,
              borderWidth: 3,
              borderColor: '#dfdfdf',
              borderRadius: height / 50,
              margin: 10,
            }}
            onChangeText={this.onChangeText}
            value={searchQuery}
            placeholder={'Search here'}
          />
          {this.noMatchFoundError()}
        </View>
        <FlatList
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          data={listData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={this.getItemLayout}
          maxToRenderPerBatch={BATCH_SIZE}
          windowSize={BATCH_SIZE}
          numColumns={NUM_COLUMNS}
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.handleRefresh}
            />
          }
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1}
          ListEmptyComponent={this.renderEmptyComponent}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.main.movies,
  page: state.main.page,
  error: state.main.error,
  isLoading: state.main.isLoading,
  isRefreshing: state.main.isRefreshing,
  total_pages: state.main.total_pages,
  genres: state.main.genres,
});

export default connect(mapStateToProps)(MovieListing);
