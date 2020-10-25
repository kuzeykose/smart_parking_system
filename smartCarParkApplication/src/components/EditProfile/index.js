import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import imagePeople from '../../imagePeople.jpg'

import {
  Container,
  LogOutButton,
  LogOutText,
  UserInformationText,
  Description,
  InitialInformationText,
  UserIdText,
  TopView,

  InformationCard
} from './style'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  Platform
} from 'react-native';

import { FirebaseContext } from '../../provider/FirebaseProvider';

const EditProfile = () => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <TopView>
        <Image
          source={imagePeople}
          style={{
            width: 125,
            height: 125,
            borderRadius: 400 / 2,
          }}
        />
      </TopView>
      <InformationCard>
        <UserInformationText>Name:</UserInformationText>
        <InitialInformationText>{value.userInformation.name}</InitialInformationText>
      </InformationCard>
      <InformationCard>
        <UserInformationText>Email:</UserInformationText>
        <InitialInformationText>{value.userInformation.email}</InitialInformationText>
      </InformationCard>
      <InformationCard>
        <UserInformationText>License Plate:</UserInformationText>
        <InitialInformationText>{value.userInformation.licensePlate}</InitialInformationText>
      </InformationCard>
    </SafeAreaView>
  );
};

export default EditProfile;


// <Container>
// <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
//   <Description>
//     <UserInformationText>Name:</UserInformationText>
//     <InitialInformationText>{value.userInformation.name}</InitialInformationText>
//   </Description>
//   <Description>
//     <UserInformationText>Email:</UserInformationText>
//     <InitialInformationText>{value.userInformation.email}</InitialInformationText>
//   </Description>
//   <Description>
//     <UserInformationText>License Plate:</UserInformationText>
//     <InitialInformationText>{value.userInformation.licensePlate}</InitialInformationText>
//   </Description>
// </View>
// <View>
//   <Description style={{ marginBottom: 20 }}>
//     <UserInformationText>User id:</UserInformationText>
//     <UserIdText>{value.userInformation.userUid}</UserIdText>
//   </Description>
//   <LogOutButton title={"logout"} onPress={value.logOut}>
//     <LogOutText>Log Out</LogOutText>
//   </LogOutButton>
// </View>
// </Container>