import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FirebaseProvider } from '../provider/FirebaseProvider'

import VerificationStack from './VerificationStack'

import AppStackNavigator from './AppStackNavigator'
const Tab = createBottomTabNavigator();

const AppStack = (props) => {

  const AppPage = (user) => {
    let page
    if (user) {
      if (user.emailVerified === true) {
        page = <AppStackNavigator />
      } else {
        page = <VerificationStack />
      }
    }
    return page
  }

  return (
    <FirebaseProvider>
      {AppPage(props.user)}
    </FirebaseProvider>
  );
}

export default AppStack;