import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../EditProfile';
import SettingsOptions from '../../components/SettingsOptions'
import ChangePassword from '../ChangePassword'
import AddCar from '../AddCar'
import Vehicles from '../Vehicles'
import Notification from '../../components/Notification'
import PaymentMethods from '../PaymentMethods'
import AddPaymentMethod from '../AddPaymentMethod'

import {
  TouchableHighlight,
  View
} from 'react-native';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsNavigation = () => {

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
    <Stack.Navigator >
      <Stack.Screen
        name="Settings"
        component={SettingsOptions}
      />

      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={headerStyle}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={headerStyle}
      />

      <Stack.Screen
        name="Vehicles"
        component={Vehicles}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeftContainerStyle: {
            paddingLeft: 20
          },
          headerRightContainerStyle: {
            paddingRight: 20
          },
          headerRight: () => (
            <TouchableHighlight onPress={() => { navigation.navigate('Add Car') }}>
              <View>
                <Icon name="add" size={30} color="#292929" />
              </View>
            </TouchableHighlight>
          ),
          headerTintColor: '#000',
          headerBackTitle: ' ',
          headerBackImage: () => <Icon name="keyboard-backspace" size={30} color="#292929" />,
          headerTitleStyle: {
            fontWeight: '400',
          },
        })
        }
      />
      <Stack.Screen
        name="Add Car"
        component={AddCar}
        options={headerStyle}
      />

      <Stack.Screen
        name="Payment Methods"
        component={PaymentMethods}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeftContainerStyle: {
            paddingLeft: 20
          },
          headerRightContainerStyle: {
            paddingRight: 20
          },
          headerRight: () => (
            <TouchableHighlight onPress={() => { navigation.navigate('Add Payment Method') }}>
              <View>
                <Icon name="add" size={30} color="#292929" />
              </View>
            </TouchableHighlight>
          ),
          headerTintColor: '#000',
          headerBackTitle: ' ',
          headerBackImage: () => <Icon name="keyboard-backspace" size={30} color="#292929" />,
          headerTitleStyle: {
            fontWeight: '400',
          },
        })
        }
      />

      <Stack.Screen
        name="Add Payment Method"
        component={AddPaymentMethod}
        options={headerStyle}
      />

      <Stack.Screen
        name="Notification"
        component={Notification}
        options={headerStyle}
      />





    </Stack.Navigator>
  );
};

export default SettingsNavigation;