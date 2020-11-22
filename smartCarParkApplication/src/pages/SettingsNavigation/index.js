import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../EditProfile';
import SettingsOptions from '../../components/SettingsOptions'
import ChangePassword from '../ChangePassword'
import AddCar from '../AddCar'
import Cars from '../Cars'
import Notification from '../../components/Notification'

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsOptions} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Cars" component={Cars} />
      <Stack.Screen name="Add Car" component={AddCar} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;