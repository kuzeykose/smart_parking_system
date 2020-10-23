import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'

import {
  Container,
  LogOutButton,
  LogOutText,
  UserInformationText,
  Description,
  InitialInformationText,
  UserIdText
} from './style'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import { FirebaseContext } from '../../provider/FirebaseProvider';

const Settings = () => {
  const value = useContext(FirebaseContext);
  console.log(value.userInformation.name);
  // Name: {value.userInformation.name}
  return (
    <SafeAreaView>
      <Container>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Description>
            <UserInformationText>Name:</UserInformationText>
            <InitialInformationText>{value.userInformation.name}</InitialInformationText>
          </Description>
          <Description>
            <UserInformationText>Email:</UserInformationText>
            <InitialInformationText>{value.userInformation.email}</InitialInformationText>
          </Description>
          <Description>
            <UserInformationText>License Plate:</UserInformationText>
            <InitialInformationText>{value.userInformation.licensePlate}</InitialInformationText>
          </Description>
        </View>
        <View>
          <Description style={{ marginBottom: 20 }}>
            <UserInformationText>User id:</UserInformationText>
            <UserIdText>{value.userInformation.userUid}</UserIdText>
          </Description>
          <LogOutButton title={"logout"} onPress={value.logOut}>
            <LogOutText>Log Out</LogOutText>
          </LogOutButton>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Settings;
