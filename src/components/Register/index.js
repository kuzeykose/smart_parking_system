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
  EmailInput,
  HelloText,
  HelloTextSmall,
  SignInButton,
  SignInText
} from './style'

const Register = (props) => {
  // const [plaque, setPlaque] = useState();
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

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
                  <CustomText>Name</CustomText>
                  <EmailInput
                    value={user.email}
                    onChange={() => { }}
                  />
                </View>
                <View>
                  <CustomText>License Plate</CustomText>
                  <EmailInput
                    value={user.email}
                    onChange={() => { }}
                  />
                </View>
                <View>
                  <CustomText>Email</CustomText>
                  <EmailInput
                    value={user.email}
                    onChange={(e) => user.setEmail(e.text)}
                  />
                </View>
                <View>
                  <CustomText>Password</CustomText>
                  <PasswordInput
                    secureTextEntry
                    value={user.password}
                    onChange={(e) => user.setPassword(e.text)}
                  />
                </View>
              </View>
              <SignInButton onPress={() => { }}>
                <SignInText>Sign up</SignInText>
              </SignInButton>
            </View>
          </Container >
      }

    </UserContext.Consumer>
  );
};

export default Register;
