import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider';

import {
  Text,
  View,
  Button
} from 'react-native';

import {
  Container,
  HelloText,
  HelloTextSmall
} from './style'

const VerificationMail = () => {
  const value = useContext(FirebaseContext);
  return (
    <Container>
      <View>
        <HelloText>Sorry!</HelloText>
        <HelloTextSmall>We are sending an email for verification.</HelloTextSmall>
      </View>
      <View>
        <Button title="Go to Sign In" onPress={() => { value.logOut() }} />
      </View>
    </Container>
  );
};

export default VerificationMail;
