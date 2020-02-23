/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, Platform, Dimensions} from 'react-native';
import MovieThumbnail from '../MovieThumbnail';
import {GSynergyTextRegular} from '../GSynergyText';

const {height} = Dimensions.get('window');

const renderGenres = (genre_ids, genres) => {
  let tempGenreList = [];
  genre_ids.map((genreId, id) => tempGenreList.push(genres[genreId]));

  return tempGenreList.join(', ');
};

const MovieCard = ({item, genres, thumbnail, itemWidth, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={{
      width: itemWidth,
      height: height / 3.25,
    }}
    onPress={onPress}>
    <View
      style={{
        flex: 1,
        margin: height / 100,
        ...Platform.select({
          android: {elevation: 5},
          ios: {
            shadowOffset: {width: 1, height: 1},
            shadowColor: 'grey',
            shadowOpacity: 0.2,
          },
        }),
        backgroundColor: '#ffffff',
        borderRadius: height / 100,
      }}>
      <View style={{flex: 0.7}}>
        <MovieThumbnail thumbnail={thumbnail} item={item} />
      </View>
      <View style={{flex: 0.3, padding: 5}}>
        <GSynergyTextRegular
          color={'#1951AB'}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {item.title}
        </GSynergyTextRegular>
        <GSynergyTextRegular
          size={height / 70}
          color={'#4A4A4A'}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {item.release_date}
        </GSynergyTextRegular>
        {genres !== null ? (
          <GSynergyTextRegular
            size={height / 70}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {renderGenres(item.genre_ids, genres)}
          </GSynergyTextRegular>
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);

export default MovieCard;
