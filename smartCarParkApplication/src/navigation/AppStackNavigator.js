import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FirebaseContext } from '../provider/FirebaseProvider'

import Icon from 'react-native-vector-icons/MaterialIcons';
import MapPage from '../pages/MapPage'
import SettingsNavigation from '../pages/SettingsNavigation'
import TicketsNavigation from '../pages/TicketHome'

const Tab = createBottomTabNavigator();

const AppStackNavigator = () => {
  const value = useContext(FirebaseContext);

  return (
    <Tab.Navigator

      tabBarOptions={{
        activeTintColor: '#42CBC8',
        inactiveTintColor: '#ffffff',
        labelStyle: {
          fontSize: 14,
          marginTop: -7,
          marginBottom: -20
        },
        style: {
          position: 'absolute',
          activeTintColor: '#e91e63',
          backgroundColor: '#151338',
          borderRadius: 330,
          height: 60,
          margin: 10,
          marginBottom: 20
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={MapPage}
        options={{
          headerLayoutPreset: 'center',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} style={{ textAlignVertical: 'center' }} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={TicketsNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmarks" color={color} size={size} />
          ),
          tabBarBadge: value.userActiveParkData.length,
        }}
      />
      <Tab.Screen
        name="Account"
        component={SettingsNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppStackNavigator;