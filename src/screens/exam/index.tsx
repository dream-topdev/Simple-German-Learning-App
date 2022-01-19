import * as React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import {
  Layout,
  Text,
  Button
} from '@ui-kitten/components';
import useProblems from './useProblems';
import { DeText } from '../../components/deText';
import { GapState, GapText } from '../../components/gapText';
import { SuggestText } from '../../components/suggestText';
import { Colors } from '../../consts';
import { ActionPad, ActionPadState } from '../../components/actionPad';
import { ProblemModel, DeEnPair } from '../../model/ProblemModel';

interface ExamProps {}

interface GapInfor {
  text: string,
  correctAnswer: string,
  state: GapState,  
}

const intialGapInfor: GapInfor = {
  text: "",
  correctAnswer: "",
  state: GapState.NONE
}

export const ExamScreen: React.FC<ExamProps> = props => {
  const problems = useProblems();
  const [currProblem, setCurrentProblem] = React.useState<ProblemModel|null>(null);
  const [currIndex, setCurrentIndex] = React.useState(0);
  const [gapInfor, setGapInfor] = React.useState<GapInfor>(intialGapInfor);
  const [finished, setFinished] = React.useState(false);
  const [correctCount, setCorrectCount]  = React.useState(0);

  React.useEffect(() => {
    if (!problems)
      return;
    setCurrentProblem(problems[currIndex]);
  }, [problems])

  React.useEffect(() => {    
    if (!currProblem)
      return;
    
    const gap: DeEnPair|undefined = currProblem.problem.find((item:DeEnPair) => item.gap == true);
    if (gap)
      setGapInfor({
        ...gapInfor,        
        text: "",
        state: GapState.NONE,
        correctAnswer: gap.de
      });
    else
      console.error("There is error on problem. Can't find gap.");
  }, [currProblem]);

  const onPressSuggest = (text: string) => {
    setGapInfor({
      ...gapInfor,
      text: text
    })
  }

  const onPressContinue = () => {
    if (!currProblem)
      return;
    const gap: DeEnPair|undefined = currProblem.problem.find((item:DeEnPair) => item.gap == true);
    if (gapInfor.text != "") {
      if (gapInfor.state != GapState.NONE) // load next problem
      {
        if (currIndex + 1 < problems.length) {
          setCurrentIndex(currIndex + 1);
          setCurrentProblem(problems[currIndex + 1]);
        }
        else {
          setFinished(true);
        }
        return;
      }
      if (gap == undefined) // error in the problem
        return;
      if (gapInfor.text == gap.de) { // use select correct answer
        setGapInfor({
          ...gapInfor,
          state: GapState.CORRECT
        })
        setCorrectCount(correctCount + 1);
        console.log("correct");
      }
      else {
        setGapInfor({
          ...gapInfor,
          state: GapState.WRONG
        })
        console.log("wrong");
      }
    }
  }

  const onPressTryAgain = () => {
    setCurrentIndex(0);
    setCurrentProblem(problems[0]);
    setFinished(false);
    setGapInfor(intialGapInfor);
    setCorrectCount(0);
  }

  const Example = (props:any) => {
    if (!currProblem)
      return <View style={styles.exampleContainer}/>;
    
    const example = currProblem.example;
    const wordList = example.split(/(\[\[.+?\]\])/).filter(Boolean)
    const textList = wordList.map((w: string) => {
      if (w.startsWith("[[") == true)
        return (
          <Text 
            key={w}
            style={styles.boldUnderline}
            category="h3"
            status="basic"
          >
            {w.replace(/\[|\]/g, '')}
          </Text>
        )
      else
        return (
          <Text 
            key={w}
            style={styles.example}
            category="h3"
            status="basic"
          >
          {w.trim()}
          </Text>
        )          
    })
    return (
      <View
        style={styles.exampleContainer}
      >
        {textList}
      </View>
    )
  }

  const Problem = (props:any) => {
    if (currProblem == null)
      return (
        <View
            style={styles.problem}
          />
      );
    const wordList = currProblem.problem.map((item:DeEnPair, index: number) => {
      if (item.gap == true)
        return <GapText key={item.de + index} text={gapInfor.text} state={gapInfor.state}/>
      return (
        <DeText key={item.de + index} en={item.en} de={item.de} isPop={true} onPress={()=>{}}/>
      )
    });
    return (
      <View
          style={styles.problem}
        >
          {wordList}
      </View>
    )
  }

  const Suggest = (props:any) => {
    if (currProblem == null)
      return (
        <View
            style={styles.suggest}
          />
      );
    const suggestList = currProblem.suggest.map((item: string) => (      
      <SuggestText
        key={item}
        text={item}
        selected={gapInfor.text == item}
        disabled={gapInfor.state != GapState.NONE}
        onPress={() => onPressSuggest(item)}
      />
    ))
    return (      
      <View
        style={styles.suggest}
      >
        {suggestList}
      </View>
    )
  }

  const getActionPadState = () => {
    if (gapInfor.text == "")
      return ActionPadState.NONE;
    else if (gapInfor.state == GapState.NONE)
      return ActionPadState.READY;
    else if (gapInfor.state == GapState.CORRECT)
      return ActionPadState.CORRECT;
    return ActionPadState.WRONG;
  }

  return (
    <SafeAreaView style={styles.container}>
      {finished == false ? (
        <Layout
          style={styles.board}
        >
          <Text style={styles.desc}>Fill in the missing word</Text>
          <Example/>
          <Problem/>
          <Suggest/>
          <View style={styles.buttonPad}>
            <ActionPad
              label="CONTINUE"
              answer={gapInfor.correctAnswer}
              state={getActionPadState()}
              onPress={onPressContinue}
            />
          </View>
        </Layout>
      ) : (
        <Layout style={styles.board}>
          <Text category="h3" style={styles.endLabel}>
            Thanks for your time.
          </Text>
          <Text category="h1" style={styles.endScore}>
            Result score: {Math.round(correctCount / (problems ? problems.length : 1) * 100)}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressTryAgain()}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </Layout>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  board: {
    flex: 1,
    marginTop: 100,
    paddingTop: 50,
    backgroundColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
    justifyContent: 'space-between'
  },
  desc: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 30
  },
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  exampleContainer: {
    flexDirection: 'row'
  },
  example: {
    color: 'white',
    marginRight: 10,
  },
  boldUnderline: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',    
    marginRight: 10,
  },
  problem: {
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggest: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  buttonPad: {
    width: '100%',
  },
  endLabel: {
    marginTop: 50,
    color: 'white'
  }, 
  endScore: {
    color: 'white',
    fontWeight: 'bold'
  },   
  button: {
    width: 200,
    borderWidth: 0,
    borderRadius: 25,
    backgroundColor: Colors.button,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});
