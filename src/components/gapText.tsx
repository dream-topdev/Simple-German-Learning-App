import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
  let gapColors : string[] =  ['transparent', 'transparent'];
  if (state == GapState.NONE)
    gapColors = ['#fff', '#fff'];
  else if (state == GapState.CORRECT)
    gapColors = ['#08DAE8', '#45E9E8'];
  else if (state == GapState.WRONG)
    gapColors = ['#F97789', '#FF938E'];
  
  return (
    <LinearGradient colors={gapColors} style={styles.container}>
      <Text
        style={state != GapState.NONE ? styles.gapTextNormal : styles.gapText}
      >
        {text}
      </Text>
    </LinearGradient>
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
