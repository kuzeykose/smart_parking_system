import React, { useState, useContext } from 'react';
import {
  Text,
  View
} from 'react-native';

import { UserContext } from '../../navigation/AuthProvider'

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
  return (
    <UserContext.Consumer>
      {
        user =>
          <Container>
            <View>
              <HelloText>Welcome back!</HelloText>
              <HelloTextSmall>Sign in to continue</HelloTextSmall>
              <View>
                <View>
                  <EmailText>Email</EmailText>
                  <EmailInput
                    placeholder="Email"
                    value={user.email}
                    onChange={text => user.setEmail(text)}
                  />
                </View>
                <View>
                  <PasswordText>Password</PasswordText>
                  <PasswordInput
                    secureTextEntry
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => user.setPassword(e.text)}
                  />
                </View>
              </View>
              <SignInButton onPress={() => { }}>
                <SignInText>Sign in</SignInText>
              </SignInButton>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <NewUserText>I'm a new user.</NewUserText>
              <ShowRegisterButton>
                <CreateAccountText onPress={() => navigation.navigate('Register')}>Create an account</CreateAccountText>
              </ShowRegisterButton>
            </View>
          </Container>}
    </UserContext.Consumer>
  );
};

export default LoginPage;
