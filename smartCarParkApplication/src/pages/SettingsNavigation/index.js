import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../EditProfile';
import SettingsOptions from '../../components/SettingsOptions'
import ChangePassword from '../ChangePassword'
import AddCar from '../AddCar'
import Vehicles from '../Vehicles'
import Notification from '../../components/Notification'


import {
  SafeAreaView,
  Button,
  TouchableHighlight,
  View
} from 'react-native';

const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsOptions} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
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
      <Stack.Screen name="Add Car" component={AddCar} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;