import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FirebaseProvider } from '../provider/FirebaseProvider'

import AppStackNavigator from './AppStackNavigator'
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <FirebaseProvider>
      <AppStackNavigator />
    </FirebaseProvider>
  );
}

export default AppStack;