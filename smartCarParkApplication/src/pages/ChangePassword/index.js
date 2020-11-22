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

const ChangePassword = () => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <Text>Change Password</Text>
    </SafeAreaView>
  );
};

export default ChangePassword;