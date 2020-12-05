import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import TicketsNavigation from '../TicketsNavigation';
import TicketDetails from '../TicketDetails';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tickets = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TicketNavigation" component={TicketsNavigation} />
      <Stack.Screen name="TicketDetails" component={TicketDetails} />
    </Stack.Navigator>
  );
};

export default Tickets;
