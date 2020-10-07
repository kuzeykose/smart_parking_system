import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider'

import Auth from '@react-native-firebase/auth';
import Ticket from '../../components/Ticket'

import { Container } from './style'

import { SafeAreaView, ScrollView } from 'react-native';

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
    <SafeAreaView>
      <ScrollView>
        <Container>
          {allTickets}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tickets;
