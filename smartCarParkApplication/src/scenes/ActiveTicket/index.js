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

  const value = useContext(FirebaseContext);
  const currentUserUid = Auth().currentUser.uid
  const [activeBooked, setActiveBooked] = useState([])

  useEffect(() => {
    firestore().collection('users').doc(`${currentUserUid}`).collection('activeBookedPark')
      .get()
      .then(snapShot => {
        let myArray = []
        snapShot.forEach(doc => {
          myArray.push(doc.data())
        })
        setActiveBooked(myArray)
      })
  }, [activeBooked])
  //   firestore().collection('users').doc(`${currentUserUid}`).collection('activeBookedPark')
  //     .get()
  //     .then(snapShot => {
  //       let myArray = []
  //       snapShot.forEach(doc => {
  //         myArray.push(doc.data())
  //       })
  //       setActiveBooked(myArray)
  //     })
  // }, [activeBooked])


  const allTickets = activeBooked.map((inf, index) => {
    return (
      <Container>
        <Ticket
          parkName={inf.parkName}
          date={inf.checkInDate}
          time={inf.checkInTime + " - " + inf.checkOutTime}
          parkSlotName={inf.parkSlot}
          key={index}
        />
      </Container>
    )
  }
  );

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