import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import { Alert } from "react-native";

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import VerificationStack from './VerificationStack'

const Routes = () => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
  });


  return (
    <NavigationContainer>
      {user ? <AppStack user={user} /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
