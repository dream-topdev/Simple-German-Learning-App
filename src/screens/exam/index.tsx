import * as React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import useProblems from './useProblems';
import { DeText } from '../../components/deText';
import { GapState, GapText } from '../../components/gapText';
import { SuggestText } from '../../components/suggestText';
import { Colors } from '../../consts';
import { ActionPad, ActionPadState } from '../../components/actionPad';

interface ExamProps {}

export const ExamScreen: React.FC<ExamProps> = props => {
  const [problems] = useProblems();

  React.useEffect(() => {
    console.log(problems);
  }, [problems])

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

  return (
    <SafeAreaView style={styles.container}>
      <Layout
        style={styles.board}
      >
        <Text style={styles.desc}>Fill in the missing word</Text>
        <Text 
          style={styles.example}
          category="h3"
          status="basic"
        >
          The <Text category="h3" style={styles.boldUnderline}>House</Text> is small.
        </Text>
        <View
          style={styles.problem}
        >
          <DeText en="The" de="Das" isPop={true} onPress={()=>{}}/>
          <DeText en="The" de="Das" isPop={true} onPress={()=>{}}/>
          <GapText text={""} state={GapState.NONE}/>
        </View>
        <View
          style={styles.suggest}
        >
          <SuggestText text="Text"/>
          <SuggestText text="Staf"/>
          <SuggestText text="Bereiden"/>
          <SuggestText text="House"/>
        </View>
        <View style={styles.buttonPad}>
          <ActionPad label="CONTINUE" answer={"House"} state={ActionPadState.CORRECT} onPress={() => {}}/>
        </View>
      </Layout>
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
  example: {
    color: 'white'
  },
  boldUnderline: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  problem: {
    flexDirection: 'row',
    marginTop: 50,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggest: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 50,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  buttonPad: {
    width: '100%',
  }
});
