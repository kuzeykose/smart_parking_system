import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import { Alert } from "react-native";
import Auth from '@react-native-firebase/auth';


import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const [user, setUser] = useState();
  // const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    if (user) {
      if (user.emailVerified) {
        setUser(user);
        // if (initializing) setInitializing(false);
      } else {
        Alert.alert(
          "Email Varification",
          "We are sending mail!",
          [
            {
              text: "Send Again",
              onPress: () => console.log("Send Again"),
              style: "destructive"
            },
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
  });

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
