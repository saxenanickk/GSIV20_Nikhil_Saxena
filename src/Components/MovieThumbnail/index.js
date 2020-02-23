/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {IMAGE_PATH} from '../../Api/SERVER_BASE_URL';
import {MOVIEDB} from '../../Assets';

const MovieThumbnail = ({item}) => {
  try {
    const {poster_path, backdrop_path} = item;

    let uri = null;

    if (poster_path) {
      uri = IMAGE_PATH + poster_path;
    } else if (backdrop_path) {
      uri = IMAGE_PATH + backdrop_path;
    }

    if (uri) {
      return (
        <Image
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
          source={{uri: uri}}
          style={{
            flex: 1,
            height: undefined,
            width: undefined,
          }}
          resizeMode="cover"
        />
      );
    }
    throw new Error();
  } catch (error) {
    return (
      <Image
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        source={MOVIEDB}
        style={{
          flex: 1,
          height: undefined,
          width: undefined,
        }}
        resizeMode="cover"
      />
    );
  }
};

export default MovieThumbnail;
