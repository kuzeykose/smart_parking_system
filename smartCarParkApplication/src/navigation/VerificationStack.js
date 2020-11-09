import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import VerificationMail from '../components/VerificationMail'

const Stack = createStackNavigator();

const VerificationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Email Verification" component={VerificationMail} />
    </Stack.Navigator>
  );
};

export default VerificationStack;