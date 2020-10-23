import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Ticket from '../../components/Ticket'
import firestore, { firebase } from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import { Container, CustomButton } from './style'
import { SafeAreaView, ScrollView, Button } from 'react-native';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PrivateValueStore } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const Tickets = () => {

  return (
    <ScrollView>
      {/* {allTickets} */}
    </ScrollView>
  );
};

export default Tickets;

// <Button
// onPress={() => {
//   value.setCancel([inf.checkInDate, inf.checkInTime, inf.checkOutTime])
// }}
// title="Cancel" color='red' />