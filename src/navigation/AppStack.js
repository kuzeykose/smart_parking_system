import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import MapPage from '../scenes/MapPage'
import Settingspage from '../scenes/Settingspage'

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MapPage} />
      <Tab.Screen name="Settings" component={Settingspage} />
    </Tab.Navigator>
  );
}

export default AppStack;