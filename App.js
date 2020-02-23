/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieListing from './src/Containers/MovieListing';
import MovieDetails from './src/Containers/MovieDetails';
import {Provider} from 'react-redux';
import store from './src/store';

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
          <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Movie Listing" component={MovieListing} />
              <Stack.Screen
                name="Movie Details"
                options={{headerBackTitle: 'Back'}}
                component={MovieDetails}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}
