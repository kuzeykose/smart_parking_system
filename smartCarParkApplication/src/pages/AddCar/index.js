import React, { useContext, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

import {
  InformationCard
} from './style'

import {
  View,
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const AddCar = () => {
  const value = useContext(FirebaseContext);

  return (
    <View style={styles.scrollContainer}>
      <Text>Select a car</Text>
      <RNPickerSelect
        onValueChange={(car) => { value.setSelectedCarModel(car) }}
        items={value.carModels}
        style={pickerSelectStyles}
      />
    </View>

  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
});

export default AddCar;