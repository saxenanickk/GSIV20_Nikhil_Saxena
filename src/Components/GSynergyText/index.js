/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Platform, TextInput} from 'react-native';

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

export const GSynergyTextInputRegular = ({
  size,
  color,
  style,
  placeholder,
  value,
  onChangeText,
  multiline,
  numberOfLines,
  ellipsizeMode,
  editable,
  inputRef,
  ...restProps
}) => (
  <TextInput
    {...restProps}
    style={[
      {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: size,
        color: color,
        margin: 0,
        padding: 0,
      },
      style,
    ]}
    underlineColorAndroid={'transparent'}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    multiline={multiline}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}
    editable={editable}
  />
);
