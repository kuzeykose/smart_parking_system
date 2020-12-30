import React, { useContext, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { FirebaseContext } from '../../provider/FirebaseProvider';
import { items } from '../../assets/carModels'
import {
  CarInputView,
  InfoText,
  CarTextInput,
  Container,
  SaveButton,
  SaveButtonText
} from './style'

import {
  View,
  StyleSheet,
} from 'react-native';

const AddCar = ({ navigation: { goBack } }) => {
  const value = useContext(FirebaseContext);
  const [selectedCarmodel, setSelectedCarModel] = useState("")
  const [carName, setCarName] = useState("")
  const [licensePlate, setlicensePlate] = useState("")

  return (
    <Container>
      <View>
        <CarInputView>
          <InfoText>Name</InfoText>
          <CarTextInput
            onChange={(text) => { setCarName(text.nativeEvent.text) }}
          ></CarTextInput>
        </CarInputView>
        <CarInputView>
          <InfoText>License plate</InfoText>
          <CarTextInput
            onChange={(text) => { setlicensePlate(text.nativeEvent.text) }}
          ></CarTextInput>
        </CarInputView>
        <CarInputView>
          <InfoText>Brand</InfoText>
          <RNPickerSelect
            onValueChange={(car) => { setSelectedCarModel(car) }}
            items={items}
            style={pickerSelectStyles}
          />
        </CarInputView>
      </View>
      <SaveButton onPress={() => {
        value.addCar(carName, licensePlate, selectedCarmodel)
        goBack()
      }}>
        <SaveButtonText>
          Save
      </SaveButtonText>
      </SaveButton>
    </Container>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 330,
    backgroundColor: '#efeff0',
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: 330,
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

export default AddCar;