import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import imagePeople from '../../imagePeople.jpg'

import {
  InformationCard
} from './style'

import {
  SafeAreaView,
  Text,
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const Cars = () => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <Text>Cars</Text>
    </SafeAreaView>
  );
};

export default Cars;