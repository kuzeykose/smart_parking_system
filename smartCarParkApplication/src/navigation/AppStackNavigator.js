import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FirebaseContext } from '../provider/FirebaseProvider'

import Icon from 'react-native-vector-icons/MaterialIcons';
import MapPage from '../scenes/MapPage'
import Settings from '../scenes/Settings'
import Tickets from '../scenes/Tickets'

const Tab = createBottomTabNavigator();

const AppStackNavigator = () => {
  const value = useContext(FirebaseContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MapPage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={Tickets}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmarks" color={color} size={size} />
          ),
          tabBarBadge: value.userActiveParkData.length,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}

export default AppStackNavigator;