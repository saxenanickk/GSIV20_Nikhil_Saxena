/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieListing from './src/Containers/MovieListing';
import MovieDetails from './src/Containers/MovieDetails';

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Movie Listing" component={MovieListing} />
            <Stack.Screen name="Movie Details" component={MovieDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
