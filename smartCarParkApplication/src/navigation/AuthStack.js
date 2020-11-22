import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../components/ForgotPassword'


const Stack = createStackNavigator();

const AuthStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;