import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import TicketsNavigation from '../TicketsNavigation';
import TicketDetails from '../TicketDetails';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Tickets = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator headerMode="none" >
        <Stack.Screen name="TicketNavigation" component={TicketsNavigation} />
        <Stack.Screen name="TicketDetails" component={TicketDetails} />
      </Stack.Navigator >
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Tickets;
