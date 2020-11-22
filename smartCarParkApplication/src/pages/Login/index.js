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
  CreateAccountText,
  ForgetPasswordText,
  ForgetPassword
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
                    onChange={text => user.setEmail(text.nativeEvent.text)}
                  />
                </View>
                <View>
                  <PasswordText>Password</PasswordText>
                  <PasswordInput
                    secureTextEntry
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => user.setPassword(e.nativeEvent.text)}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <SignInButton onPress={() => { user.signIn(user.email, user.password) }}>
                  <SignInText>Sign in</SignInText>
                </SignInButton>
                <ForgetPassword onPress={() => { navigation.navigate('Forgot Password') }}>
                  <ForgetPasswordText>Forgot Password</ForgetPasswordText>
                </ForgetPassword>
              </View>
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
