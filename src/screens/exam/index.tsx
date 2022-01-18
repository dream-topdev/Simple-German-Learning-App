import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import {
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

interface ExamProps {}

export const ExamScreen: React.FC<ExamProps> = props => {
  const [problems] = useProblems();

  React.useEffect(() => {
    console.log(problems);
  }, [problems])

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

  return (
    <SafeAreaView style={styles.container}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c6c82',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  desc: {
    textAlign: 'center',
    color: 'white'
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
    width: '100%',
    alignItems: 'center'
  },
  suggest: {
    flexDirection: 'row',
    marginTop: 50,
    width: '100%'
  }
});
