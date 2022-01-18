import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import {
  Colors
} from '../consts';

interface DeTextProps {
  de: string,
  en: string,
  isPop: boolean,
  onPress: Function
}

export const DeText = ({
  de,
  en,
  isPop,
  onPress,
}: DeTextProps) => {

  return (
    <View style={styles.card}>      
      <Popover
        from={(
          <TouchableOpacity>
            <Text style={styles.dottedUnderline}>{de}</Text>
          </TouchableOpacity>
        )}
        //isVisible={isPop}
        backgroundStyle={{backgroundColor: 'transparent'}}
        placement={PopoverPlacement.TOP}
      >
        <Text style={styles.popoverText}>{en}</Text>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    paddingHorizontal: 5,
    marginHorizontal: 5
  },
  dottedUnderline: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 18,
    borderBottomWidth: 2,
    paddingBottom: 2,
    borderStyle: 'dotted',
    borderColor: 'white'
  },
  popoverText: {
    color: Colors.primary,
    fontSize: 18,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
