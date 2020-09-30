import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  CustomText,
  PasswordInput,
  Container,
  EmailInput,
  HelloText,
  HelloTextSmall,
  SignInButton,
  SignInText
} from './style'

const Register = () => {
  const [plaque, setPlaque] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container>
      <View>
        <HelloText>Welcome!</HelloText>
        <HelloTextSmall>Sign up to get start</HelloTextSmall>
      </View>
      <View style={{ marginTop: 50 }}>
        <View>
          <View>
            <CustomText>Name</CustomText>
            <EmailInput
              value={email}
              onChange={emailText => setEmail(emailText)}
            />
          </View>
          <View>
            <CustomText>Plaque</CustomText>
            <EmailInput
              value={email}
              onChange={emailText => setEmail(emailText)}
            />
          </View>
          <View>
            <CustomText>Email</CustomText>
            <EmailInput
              value={email}
              onChange={emailText => setEmail(emailText)}
            />
          </View>
          <View>
            <CustomText>Password</CustomText>
            <PasswordInput
              secureTextEntry
              value={password}
              onChange={passwordText => setPassword(passwordText)}
            />
          </View>
        </View>
        <SignInButton>
          <SignInText>Sign up</SignInText>
        </SignInButton>
      </View>



    </Container >
  );
};

export default Register;
