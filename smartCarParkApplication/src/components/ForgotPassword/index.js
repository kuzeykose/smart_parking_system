import React, { useState, useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'

import {
  View,
} from 'react-native';

import {
  Container,
  HelloText,
  HelloTextSmall,
  EmailInput,
  SendButton,
  ButtonText
} from './style'

const ForgotPassword = () => {
  const value = useContext(UserContext)
  return (
    <Container>
      <View>
        <HelloText>Forgot Password</HelloText>
        <HelloTextSmall>Please enter your email adress to change password.</HelloTextSmall>
      </View>
      <View style={{ marginTop: 75 }}>
        <EmailInput
          placeholder="Email"
          value={value.email}
          onChange={text => value.setEmail(text.nativeEvent.text)}
        />
      </View>
      <SendButton onPress={() => { value.passwordChange(value.email) }}>
        <ButtonText>Send Email</ButtonText>
      </SendButton>
    </Container>
  );
};

export default ForgotPassword;
