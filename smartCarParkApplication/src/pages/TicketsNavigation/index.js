import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import ActiveTicket from '../ActiveTicket';
import HistoryTicket from '../HistoryTicket';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const TicketNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Active" component={ActiveTicket} />
      <Tab.Screen name="History" component={HistoryTicket} />
    </Tab.Navigator>
  );
};

export default TicketNavigation;
