import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Ticket from '../../components/Ticket'
import { Container } from './style'
import firestore, { firebase } from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import { SafeAreaView, ScrollView } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Component } from 'react';

const Tab = createMaterialTopTabNavigator();

const Tickets = () => {
  const value = useContext(FirebaseContext);

  const allTickets = value.userHistoryParkData.map((inf, index) => {
    return <Ticket
      parkName={inf.parkName}
      date={inf.checkInDate}
      time={inf.checkInTime + " - " + inf.checkOutTime}
      parkSlotName={inf.parkSlot}
      key={index}
    />
  }
  );

  return (
    <ScrollView>
      {allTickets}
    </ScrollView>
  );
};

export default Tickets;
