import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Map from '../components/Map'
import PaymentPage from '../pages/PaymentPage'
import SelectVehicle from '../pages/SelectVehicle'
import SelectPaymentMethod from '../pages/SelectPaymentMethod'

import AddPaymentMethod from '../pages/AddPaymentMethod'
import AddCar from '../pages/AddCar'

import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const Homepage = () => {

  const headerStyle = {
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerLeftContainerStyle: {
      paddingLeft: 20
    },
    headerRightContainerStyle: {
      paddingRight: 20
    },
    headerTintColor: '#000',
    headerBackTitle: ' ',
    headerBackImage: () => <Icon name="keyboard-backspace" size={30} color="#292929" />,
    headerTitleStyle: {
      fontWeight: '400',
    },
  }

  return (
    <View style={styles.container}>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Map}
          options={{
            headerShown: false, // change this to `false`
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentPage}
          options={headerStyle}
        />

        <Stack.Screen
          name="Select Vehicle"
          component={SelectVehicle}
          options={headerStyle}
        />

        <Stack.Screen
          name="Select Payment Method"
          component={SelectPaymentMethod}
          options={headerStyle}
        />

        <Stack.Screen
          name="Add Payment Method"
          component={AddPaymentMethod}
          options={headerStyle}
        />
        <Stack.Screen
          name="Add Car"
          component={AddCar}
          options={headerStyle}
        />
      </Stack.Navigator>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Homepage;