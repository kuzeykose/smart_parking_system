import React from 'react';
import { UserContext } from '../../navigation/AuthProvider'

import {
  Container,
  LogOutButton,
  LogOutText,
  UserInformationText
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

const Settings = () => {
  return (
    <UserContext.Consumer>
      {user =>
        <SafeAreaView>
          <Container>
            <View>
              <UserInformationText>
                Name: {}
              </UserInformationText>
              <UserInformationText>
                Email: {}
              </UserInformationText>
              <UserInformationText>
                UserId: {}
              </UserInformationText>
            </View>
            <LogOutButton title={"logout"} onPress={user.logOut}>
              <LogOutText>Log Out</LogOutText>
            </LogOutButton>
          </Container>
        </SafeAreaView>
      }
    </UserContext.Consumer>


  );
};

export default Settings;
