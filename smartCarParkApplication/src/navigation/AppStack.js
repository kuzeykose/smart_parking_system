import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FirebaseProvider } from '../provider/FirebaseProvider'

import MapPage from '../scenes/MapPage'
import Settings from '../scenes/Settings'
import Tickets from '../scenes/Tickets'

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <FirebaseProvider>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MapPage} />
        <Tab.Screen name="Tickets" component={Tickets} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </FirebaseProvider>
  );
}

export default AppStack;