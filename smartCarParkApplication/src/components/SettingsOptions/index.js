import React, { useContext } from 'react';
import { UserContext } from '../../navigation/AuthProvider'
import imagePeople from '../../imagePeople.jpg'

import {
  Container,
  LogOutButton,
  LogOutText,
  UserInformationText,
  ImageView,
  TouchbaleListItem,
  TouchbaleListItemText,
  TopView,
  ListName,
  InformationCard
} from './style'

import {
  SafeAreaView,
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { FirebaseContext } from '../../provider/FirebaseProvider';

const Options = ({ navigation }) => {
  const value = useContext(FirebaseContext);
  return (
    <SafeAreaView>
      <Container>
        <View>
          <TopView>
            <ImageView>
              <Image
                source={imagePeople}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 400 / 2,
                }}
              />
            </ImageView>
            <View>
              <UserInformationText>{value.userInformation.name}</UserInformationText>
              <UserInformationText>{value.userInformation.email}</UserInformationText>
            </View>
          </TopView>

          <ListName>Account</ListName>
          <TouchbaleListItem onPress={() => navigation.navigate('Edit Profile')}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="person" size={30} color="#292929" />
              <TouchbaleListItemText>Edit Profile</TouchbaleListItemText>
            </View>
            <Icon name="arrow-forward-ios" size={30} color="#292929" />
          </TouchbaleListItem>
          <TouchbaleListItem onPress={() => navigation.navigate('Change Password')}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="lock" size={30} color="#292929" />
              <TouchbaleListItemText>Change Password</TouchbaleListItemText>
            </View>
            <Icon name="arrow-forward-ios" size={30} color="#292929" />
          </TouchbaleListItem>
          <TouchbaleListItem onPress={() => navigation.navigate('Cars')}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="directions-car" size={30} color="#292929" />
              <TouchbaleListItemText>Cars</TouchbaleListItemText>
            </View>
            <Icon name="arrow-forward-ios" size={30} color="#292929" />
          </TouchbaleListItem>
          <ListName>Notification</ListName>
          <TouchbaleListItem onPress={() => navigation.navigate('Notification')}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="notifications" size={30} color="#292929" />
              <TouchbaleListItemText>Notification</TouchbaleListItemText>
            </View>
            <Icon name="arrow-forward-ios" size={30} color="#292929" />
          </TouchbaleListItem>
        </View>
        <LogOutButton title={"logout"} onPress={value.logOut}>
          <LogOutText>Log Out</LogOutText>
        </LogOutButton>
      </Container>
    </SafeAreaView>
  );
};

export default Options