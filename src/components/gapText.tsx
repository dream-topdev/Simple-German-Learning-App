import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  Colors
} from '../consts';

export enum GapState {
  NONE = 'none',
  CORRECT = 'correct',
  WRONG = 'wrong'
}

interface GapTextProps {
  text: string,
  state: GapState,
}

export const GapText = ({
  text,
  state,
}: GapTextProps) => {

  const Gap = () => {
    return (
      <View style={styles.underline}>
      </View>
    );
  }
  if (text == "")
    return <Gap/>
  let gapStyle = {
    ...styles.container,    
    ...(state == GapState.NONE ? styles.containerNone:{}),
    ...(state == GapState.CORRECT ? styles.containerCorrect:{}),
    ...(state == GapState.WRONG ? styles.containerWrong:{}),
  };
  return (
    <View style={gapStyle}>
      <Text
        style={state != GapState.NONE ? styles.gapTextNormal : styles.gapText}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    paddingHorizontal: 5,
    marginHorizontal: 5
  },
  underline: {
    alignSelf: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    width: 100
  },
  gapText: {
    color: Colors.primary,
    fontSize: 18,
  },
  gapTextNormal: {
    color: 'white',
    fontSize: 18,
  },
  container: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  containerNone: {
    backgroundColor: 'white',
  },
  containerCorrect: {
    backgroundColor: '#00DEE9',    
  },
  containerWrong: {
    backgroundColor: '#FF818C',
  }
});
