import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import Homepage from "./src/scenes/MapPage";
import Settingspage from "./src/scenes/Settingspage.js";
import Authentication from "./src/scenes/Authentication"

import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createBottomTabNavigator();


const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Authentication />
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Homepage} />
        <Tab.Screen name="Settings" component={Settingspage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;


// <NavigationContainer>
// <Tab.Navigator>
//   <Tab.Screen name="Home" component={Homepage} />
//   <Tab.Screen name="Settings" component={Settingspage} />
// </Tab.Navigator>
// </NavigationContainer>