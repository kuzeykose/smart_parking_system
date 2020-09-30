import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native';

import {
  EmailText,
  PasswordText,
  EmailInput,
  PasswordInput,
  Container,
  HelloText,
  HelloTextSmall,
  SignInButton,
  SignInText,
  NewUserText,
  ShowRegisterButton,
  CreateAccountText
} from './style'

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (

    <Container>
      <View style={{}}>
        <HelloText>Welcome back!</HelloText>
        <HelloTextSmall>Sign in to continue</HelloTextSmall>
        <View>
          <View>
            <EmailText>Email</EmailText>
            <EmailInput
              value={email}
              onChange={emailText => setEmail(emailText)}
            />
          </View>
          <View>
            <PasswordText>Password</PasswordText>
            <PasswordInput
              secureTextEntry
              value={password}
              onChange={passwordText => setPassword(passwordText)}
            />
          </View>
        </View>
        <SignInButton>
          <SignInText>Sign in</SignInText>
        </SignInButton>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <NewUserText>I'm a new user.</NewUserText>
        <ShowRegisterButton>
          <CreateAccountText onPress={() => navigation.navigate('Register')}>Create an account</CreateAccountText>
        </ShowRegisterButton>
      </View>
    </Container>
  );
};

export default LoginPage;
