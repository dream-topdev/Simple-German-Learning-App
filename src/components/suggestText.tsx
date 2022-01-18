import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Colors
} from '../consts';

interface SuggestTextProps {
  text: string,
  onPress: Function,
}

export const SuggestText = ({
  text,
  onPress
}: SuggestTextProps) => {

  return (
    <TouchableOpacity style={styles.container}>
      <Text
        style={styles.gapText}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
SuggestText.defaultProps = {
  text: "",
  onPress: () => {}
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
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
