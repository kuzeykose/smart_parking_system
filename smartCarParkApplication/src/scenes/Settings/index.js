import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../../components/EditProfile';
import SettingsOptions from '../../components/SettingsOptions'
import ChangePassword from '../../components/ChangePassword'
import Cars from '../../components/Cars'
import Notification from '../../components/Notification'

const Stack = createStackNavigator();

const Settings = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsOptions} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Cars" component={Cars} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default Settings;