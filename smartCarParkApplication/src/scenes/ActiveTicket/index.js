import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../provider/FirebaseProvider'
import Ticket from '../../components/Ticket'
import firestore, { firebase } from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import { Container, CustomButton } from './style'
import { SafeAreaView, ScrollView, Button } from 'react-native';

const Tickets = () => {
  const value = useContext(FirebaseContext);
  const allTickets = value.userActiveParkData.map((inf, index) => {
    return <Ticket
      parkName={inf.parkName}
      date={inf.checkInDate}
      time={inf.checkInTime + " - " + inf.checkOutTime}
      parkSlotName={inf.parkSlot}
      key={index}
    />
  }
  )
  return (
    <ScrollView>
      {allTickets}
    </ScrollView>
  );
};

export default Tickets;

// <Button
// onPress={() => {
//   value.setCancel([inf.checkInDate, inf.checkInTime, inf.checkOutTime])
// }}
// title="Cancel" color='red' />