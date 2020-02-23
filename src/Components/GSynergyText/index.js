/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Platform} from 'react-native';

export const GSynergyTextRegular = props => (
  <Text
    {...props}
    style={[
      {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: props.size,
        color: props.color,
      },
      props.style,
    ]}
    numberOfLines={props.numberOfLines}
    ellipsizeMode={props.ellipsizeMode}>
    {props.children}
  </Text>
);

export const GSynergyTextBold = props => (
  <Text
    {...props}
    style={[
      {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontWeight: 'bold',
        fontSize: props.size,
        color: props.color,
      },
      props.style,
    ]}
    numberOfLines={props.numberOfLines}
    ellipsizeMode={props.ellipsizeMode}>
    {props.children}
  </Text>
);
