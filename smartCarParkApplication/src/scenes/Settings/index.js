import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../../components/EditProfile';
import Options from '../../components/Options'

const Stack = createStackNavigator();

const Settings = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Options} />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default Settings;