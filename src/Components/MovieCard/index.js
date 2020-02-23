/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, Text, Dimensions} from 'react-native';
import MovieThumbnail from '../MovieThumbnail';

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
        elevation: 5,
        backgroundColor: '#ffffff',
        borderRadius: 8,
      }}>
      <View style={{flex: 0.7}}>
        <MovieThumbnail item={item} />
      </View>
      <View style={{flex: 0.3}}>
        <Text>{item.title}</Text>
        <Text>{item.release_date}</Text>
        {genres !== null ? (
          <Text numberOfLines={1} ellipsizeMode={'tail'}>
            {item.genre_ids.map((genreId, id) => `${genres[genreId]}, `)}
          </Text>
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);

export default MovieCard;
