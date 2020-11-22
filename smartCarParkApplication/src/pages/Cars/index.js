import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import imagePeople from '../../imagePeople.jpg'

import {
  Card,
  CardText,
  AddCar,
  AddCarText
} from './style'

import {
  SafeAreaView,
  Text,
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const Cars = ({ navigation }) => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <AddCar onPress={() => navigation.navigate('Add Car')}>
        <AddCarText>
          Add Car
        </AddCarText>
      </AddCar>
      <Card>
        <CardText>Kia</CardText>
        <CardText>34 ES 2673</CardText>
        <CardText>Kuzey Araba</CardText>
      </Card>
    </SafeAreaView>
  );
};

export default Cars;