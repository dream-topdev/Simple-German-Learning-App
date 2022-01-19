import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Colors
} from '../consts';

interface SuggestTextProps {
  text: string,
  selected: boolean,
  disabled: boolean,
  onPress: Function,
}

export const SuggestText = ({
  text,
  selected,
  disabled,
  onPress
}: SuggestTextProps) => {
  let containerStyle = {};
  if (selected)
    containerStyle = {
      ...styles.container,
      backgroundColor: '#6392A6'
    };
  else if (disabled)
    containerStyle = {
      ...styles.container,
      backgroundColor: '#9FB5C0'
    }
  else
    containerStyle = styles.container;

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={disabled}
      onPress={() => onPress()}
    >
      <Text
        style={[styles.gapText, {color: selected ? 'transparent':Colors.primary}]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
SuggestText.defaultProps = {
  text: "",
  selected: false,
  disabled: false,
  onPress: () => {}
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gapText: {
    color: Colors.primary,
    fontSize: 18,
  },
});
