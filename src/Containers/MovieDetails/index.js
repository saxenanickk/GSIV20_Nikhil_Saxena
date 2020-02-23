/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {getMovieDetails, saveMovieDetails} from '../../actions';
import {
  GSynergyTextRegular,
  GSynergyTextBold,
} from '../../Components/GSynergyText';
import MovieThumbnail from '../../Components/MovieThumbnail';
import {
  renderGenres,
  renderYear,
  renderDirector,
  renderCast,
} from '../../Utils';

const {width, height} = Dimensions.get('window');

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.movieId = props.route.params.movieId;
  }

  componentDidMount() {
    this.props.dispatch(getMovieDetails({movieId: this.movieId}));
  }

  componentWillUnmount() {
    this.props.dispatch(saveMovieDetails(null));
  }

  render() {
    const {error, details} = this.props;

    if (error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <GSynergyTextRegular style={{fontSize: 16}}>
            {error.message}
          </GSynergyTextRegular>
          <Button
            onPress={() => this.makeRemoteRequest(1, true, false)}
            title="Try Again"
          />
        </View>
      );
    }

    if (details !== null) {
      const {title, genres, credits, overview, runtime, release_date} = details;

      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: width, height: height / 1.5}}>
            <MovieThumbnail item={details} />
          </View>
          <View style={{flex: 0.3, padding: 10}}>
            <GSynergyTextBold
              color={'#4A4A4A'}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {title}
            </GSynergyTextBold>
            {genres.length ? (
              <GSynergyTextRegular
                color={'#4A4A4A'}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {`${renderGenres(genres)}`}
              </GSynergyTextRegular>
            ) : null}
            <View style={{marginVertical: height / 100}}>
              <GSynergyTextRegular
                color={'#4A4A4A'}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {`${renderYear(release_date)} | ${runtime} minutes | ${
                  credits && credits.crew.length
                    ? renderDirector(credits.crew)
                    : 'NA'
                }`}
              </GSynergyTextRegular>
              <GSynergyTextRegular color={'#4A4A4A'}>
                {`Cast: ${
                  credits && credits.cast.length
                    ? renderCast(credits.cast)
                    : 'NA'
                }`}
              </GSynergyTextRegular>
            </View>
            <GSynergyTextRegular color={'#1951A8'}>
              {`Description: ${overview ? overview : 'NA'}`}
            </GSynergyTextRegular>
          </View>
        </ScrollView>
      );
    }

    return <ActivityIndicator style={{marginVertical: 24}} size="large" />;
  }
}

const mapStateToProps = state => ({
  error: state.main.error,
  isLoading: state.main.isLoading,
  details: state.main.details,
});

export default connect(mapStateToProps)(MovieDetails);
