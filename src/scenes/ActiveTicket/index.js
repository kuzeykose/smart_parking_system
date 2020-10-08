import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Ticket from '../../components/Ticket'
import { Container } from './style'
import { SafeAreaView, ScrollView } from 'react-native';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Tickets = () => {
  const value = useContext(FirebaseContext);
  const allTickets = value.bookedParkHistory.map((inf, index) => {
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

    </ScrollView>
  );
};

export default Tickets;
