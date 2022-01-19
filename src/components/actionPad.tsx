import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Colors
} from '../consts';

export enum ActionPadState {
  NONE = 'none',
  READY = 'ready',
  CORRECT = 'correct',
  WRONG = 'wrong'
}

interface ActionPadProps {
  label: string,
  answer: string,
  state: ActionPadState,
  onPress: Function
}

export const ActionPad = ({
  label,
  state,
  answer,
  onPress,
}: ActionPadProps) => {
  let containerColors : string[] =  ['transparent', 'transparent'];
  if (state == ActionPadState.NONE || state == ActionPadState.READY)
    containerColors = ['transparent', 'transparent'];
  else if (state == ActionPadState.CORRECT)
    containerColors = ['#08DAE8', '#45E9E8'];
  else if (state == ActionPadState.WRONG)
    containerColors = ['#F97789', '#FF938E'];
  
  let buttonColors : string[] =  ['transparent', 'transparent'];
  if (state == ActionPadState.NONE)
    buttonColors = ['transparent', 'transparent'];
  else if (state == ActionPadState.READY)
    buttonColors = ['#08DAE8', '#45E9E8'];
  else
    buttonColors = ['#FFFFFE', '#FFFFFD'];
  let buttonTextStyle = {
    ...styles.buttonText,
    ...(state == ActionPadState.NONE ? styles.buttonTextNone:{}),
    ...(state == ActionPadState.READY ? styles.buttonTextReady:{}),
    ...(state == ActionPadState.CORRECT? styles.buttonTextCorrect:{}),
    ...(state == ActionPadState.WRONG ? styles.buttonTextWrong:{}),
  };

  return (
    <LinearGradient colors={containerColors} style={styles.container}>
      <View style={styles.descContainer}>
        {state == ActionPadState.CORRECT && <Text style={styles.descText}>Greate Job!</Text>}
        {state == ActionPadState.WRONG && <Text style={styles.descText}>Answer: <Text style={styles.answerText}>{answer}</Text></Text>}
        {(state == ActionPadState.CORRECT || state == ActionPadState.WRONG) && <Image source={require("../assets/flag.png")}/>}
      </View>
      <TouchableOpacity
        onPress={() => onPress()}
      >
        <LinearGradient colors={buttonColors} style={styles.button}>
          <Text style={buttonTextStyle}>
            {label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingHorizontal: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  descContainer: {
    marginVertical: 20,
    paddingHorizontal: 25,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  descText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '700'
  },
  answerText: {
    fontSize: 18,
    fontWeight: 'normal'
  },
  containerNone: {
  },
  containerCorrect: {
    backgroundColor: Colors.correct
  },
  containerWrong: {
    backgroundColor: Colors.wrong
  },
  button: {
    width: '100%',
    borderWidth: 0,
    borderRadius: 25,
    backgroundColor: Colors.button,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonNone: {

  },
  buttonReady: {
    backgroundColor: Colors.correct
  },
  buttonResult: {    
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  buttonTextNone: {

  },
  buttonTextReady: {
    color: 'white'
  },
  buttonTextCorrect: {
    color: Colors.correct
  },
  buttonTextWrong: {
    color: Colors.wrong
  }
});
