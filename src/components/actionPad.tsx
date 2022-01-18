import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
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
  let padStyle = {
    ...styles.container,    
    ...(state == ActionPadState.NONE || state == ActionPadState.READY? styles.containerNone:{}),
    ...(state == ActionPadState.CORRECT ? styles.containerCorrect:{}),
    ...(state == ActionPadState.WRONG ? styles.containerWrong:{}),
  };
  let buttonStyle = {
    ...styles.button,    
    ...(state == ActionPadState.NONE ? styles.buttonNone:{}),
    ...(state == ActionPadState.READY ? styles.buttonReady:{}),
    ...(state == ActionPadState.CORRECT || state == ActionPadState.WRONG ? styles.buttonResult:{}),
  };
  let buttonTextStyle = {
    ...styles.buttonText,
    ...(state == ActionPadState.NONE ? styles.buttonTextNone:{}),
    ...(state == ActionPadState.READY ? styles.buttonTextReady:{}),
    ...(state == ActionPadState.CORRECT? styles.buttonTextCorrect:{}),
    ...(state == ActionPadState.WRONG ? styles.buttonTextWrong:{}),
  };

  return (
    <View style={padStyle}>
      <View style={styles.descContainer}>
        {state == ActionPadState.CORRECT && <Text style={styles.descText}>Greate Job!</Text>}
        {state == ActionPadState.WRONG && <Text style={styles.descText}>Answer: <Text style={styles.answerText}>{answer}</Text></Text>}
        {(state == ActionPadState.CORRECT || state == ActionPadState.WRONG) && <Image source={require("../assets/flag.png")}/>}
      </View>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => onPress()}
      >
        <Text style={buttonTextStyle}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingHorizontal: 30,
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
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
    fontSize: 16,
    fontWeight: '700'
  },
  answerText: {
    fontSize: 15,
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
