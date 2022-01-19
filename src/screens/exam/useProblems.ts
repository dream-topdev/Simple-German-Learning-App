import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { ProblemModel } from '../../model/ProblemModel';
export default function useProblems(): Array<ProblemModel> {
  const [lists, setLists] = useState<Array<ProblemModel>>([]);
  useEffect(() => {
    firestore()
      .collection('GuessingEn2De')
      .onSnapshot((snapshot) => {
        const rawLists = snapshot.docs.map((doc) => doc.data());
        const problemList = rawLists.map((item) => ({
          id: String(item.id),
          example: String(item.example),
          problem: item.problem.map(
            (prob: { de: string; en: string; gap: boolean | undefined }) => ({
              de: prob.de,
              en: prob.en,
              gap: prob.gap ? prob.gap : false,
            }),
          ),
          suggest: item.suggest as string[],
        })) as Array<ProblemModel>;
        setLists(problemList);
      });
  }, []);
  return lists;
}
