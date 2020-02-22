import React from 'react';
import {View, Text} from 'react-native';

export default class MovieListing extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Movie Listing Screen</Text>
      </View>
    );
  }
}
