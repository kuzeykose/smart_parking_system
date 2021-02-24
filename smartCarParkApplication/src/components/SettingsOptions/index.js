import React, { useContext } from 'react';

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
  List,
  InformationCard,
  UserEmailText
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
            <View>
              <UserInformationText>{value.userInformation.name}</UserInformationText>
              <UserEmailText>{value.userInformation.email}</UserEmailText>
            </View>
          </TopView>

          <List>
            <TouchbaleListItem onPress={() => navigation.navigate('Edit Profile')}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="account-circle" size={30} color="#151338" />
                <TouchbaleListItemText>Edit Profile</TouchbaleListItemText>
              </View>
              <Icon name="arrow-forward-ios" size={25} color="#151338" />
            </TouchbaleListItem>

            <TouchbaleListItem onPress={() => navigation.navigate('Change Password')}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="lock" size={30} color="#151338" />
                <TouchbaleListItemText>Change Password</TouchbaleListItemText>
              </View>
              <Icon name="arrow-forward-ios" size={25} color="#151338" />
            </TouchbaleListItem>

            <TouchbaleListItem onPress={() => navigation.navigate('Vehicles')}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="directions-car" size={30} color="#151338" />
                <TouchbaleListItemText>Vehicles</TouchbaleListItemText>
              </View>
              <Icon name="arrow-forward-ios" size={25} color="#151338" />
            </TouchbaleListItem>

            <TouchbaleListItem onPress={() => navigation.navigate('Payment Methods')}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="payment" size={30} color="#151338" />
                <TouchbaleListItemText>Payment methods</TouchbaleListItemText>
              </View>
              <Icon name="arrow-forward-ios" size={25} color="#151338" />
            </TouchbaleListItem>


          </List>
          <List style={{ marginTop: 20 }}>
            <TouchbaleListItem onPress={() => navigation.navigate('Notification')}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="notifications" size={30} color="#151338" />
                <TouchbaleListItemText>Notification</TouchbaleListItemText>
              </View>
              <Icon name="arrow-forward-ios" size={25} color="#151338" />
            </TouchbaleListItem>
            <TouchbaleListItem onPress={value.logOut}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="exit-to-app" size={30} color="#FF3B30" />
                <LogOutText>Log Out</LogOutText>
              </View>
            </TouchbaleListItem>
          </List>

        </View>
      </Container>
    </SafeAreaView>
  );
};

export default Options