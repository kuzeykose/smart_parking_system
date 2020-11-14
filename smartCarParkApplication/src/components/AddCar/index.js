import React, { useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  InformationCard
} from './style'

import {
  SafeAreaView,
  Text,
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const Notification = () => {
  const value = useContext(FirebaseContext);

  const state = {
    language: 'java',
  };
  return (
    <SafeAreaView>
      <Text>Add Car</Text>

      <Picker
        selectedValue={state.language}
        style={{}}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </SafeAreaView >
  );
};

export default Notification;