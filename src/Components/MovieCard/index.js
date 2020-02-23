/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, Platform, Dimensions} from 'react-native';
import MovieThumbnail from '../MovieThumbnail';
import {GSynergyTextRegular} from '../GSynergyText';

const {height} = Dimensions.get('window');

const MovieCard = ({item, genres, itemWidth, onPress}) => (
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
        margin: 8,
        ...Platform.select({
          android: {elevation: 5},
          ios: {
            shadowOffset: {width: 1, height: 1},
            shadowColor: 'grey',
            shadowOpacity: 0.2,
          },
        }),
        backgroundColor: '#ffffff',
        borderRadius: 8,
      }}>
      <View style={{flex: 0.7}}>
        <MovieThumbnail item={item} />
      </View>
      <View style={{flex: 0.3}}>
        <GSynergyTextRegular
          color={'#1951AB'}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {item.title}
        </GSynergyTextRegular>
        <GSynergyTextRegular
          color={'#4A4A4A'}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {item.release_date}
        </GSynergyTextRegular>
        {genres !== null ? (
          <GSynergyTextRegular numberOfLines={1} ellipsizeMode={'tail'}>
            {item.genre_ids.map((genreId, id) => `${genres[genreId]}, `)}
          </GSynergyTextRegular>
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);

export default MovieCard;
