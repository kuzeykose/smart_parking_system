import React, { useState, useContext } from 'react';
import {
  Text,
  View
} from 'react-native';
import { UserContext } from '../../navigation/AuthProvider'

import {
  CustomText,
  PasswordInput,
  Container,
  CustomInput,
  HelloText,
  HelloTextSmall,
  SignUpButton,
  SignUpText
} from './style'

const Register = (props) => {
  return (
    <UserContext.Consumer>
      {
        user =>
          <Container>
            <View>
              <HelloText>Welcome!</HelloText>
              <HelloTextSmall>Sign up to get start</HelloTextSmall>
            </View>
            <View style={{ marginTop: 50 }}>
              <View>
                <View>
                  <CustomText>Full Name</CustomText>
                  <CustomInput
                    value={user.fullName}
                    onChange={text => user.setFullName(text.nativeEvent.text)}
                  />
                </View>
                <View>
                  <CustomText>License Plate</CustomText>
                  <CustomInput
                    value={user.licensePlate}
                    onChange={text => user.setLicensePlate(text.nativeEvent.text)}
                  />
                </View>
                <View>
                  <CustomText>Email</CustomText>
                  <CustomInput
                    value={user.email}
                    onChange={text => user.setEmail(text.nativeEvent.text)}
                  />
                </View>
                <View>
                  <CustomText>Password</CustomText>
                  <PasswordInput
                    secureTextEntry
                    value={user.password}
                    onChange={text => user.setPassword(text.nativeEvent.text)}
                  />
                </View>
              </View>
              <SignUpButton onPress={() => {
                user.register(user.fullName, user.licensePlate, user.email, user.password)

              }}>
                <SignUpText>Sign up</SignUpText>
              </SignUpButton>
            </View>
          </Container >
      }

    </UserContext.Consumer>
  );
};

export default Register;
