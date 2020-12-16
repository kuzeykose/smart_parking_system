import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Map from '../components/Map'
import PaymentPage from '../pages/PaymentPage'
import SelectVehicle from '../pages/SelectVehicle'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const Homepage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Map}
          options={{
            headerShown: false, // change this to `false`
          }}
        />
        <Stack.Screen name="Payment" component={PaymentPage} />
        <Stack.Screen name="Select Vehicle" component={SelectVehicle} />
      </Stack.Navigator>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Homepage;
