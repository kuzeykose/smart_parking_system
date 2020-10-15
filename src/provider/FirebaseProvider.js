import React, { createContext, useState, useEffect } from 'react';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { checkAvailableStatus } from './FirebaseProviderHelpers/checkAvailableStatus'
import { writeArrayBookData } from './FirebaseProviderHelpers/writeArrayBookData'

const FirebaseContext = createContext(null)

const FirebaseProvider = (props) => {
  //get parkId for send Firestore specific position
  const [checkInTime, setCheckInTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkOutTime, setCheckOutTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [userInformation, setUserInformation] = useState({})
  const [slotAvaliblityInformation, setSlotAvaliblityInformation] = useState(null)


  const currentUserUid = Auth().currentUser.uid
  // user select check Date Time
  const onChangeCheckInTime = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setCheckInTime(currentDate);
  }

  const onChangeCheckOutTime = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setCheckOutTime(currentDate);
  }

  const onChangeCheckInDate = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setCheckInDate(currentDate);
  }

  useEffect(() => {
    firestore().collection('users').doc(`${currentUserUid}`)
      .get()
      .then(snapShot => {
        setUserInformation(snapShot.data())
      })
  })

  // set Firebase car - parks slots from taking data from user -> (car - parks / { parkId } / parking - slot)
  const writeFirebaseUserBook = (parkId) => {
    const userDocument = firestore().collection('car-parks').doc(parkId).collection('parking-slots')
    var date = checkInDate.toLocaleDateString().split("/")
    var myCheckOutDate = date.join("-")
    //get document in firebase and set slotAvaliblity with empty/available/notAvailable
    const hello = userDocument.get().then(querySnapshot => {
      var slotAvaliblity = querySnapshot.docs.map(doc => {
        return checkAvailableStatus(doc, checkInTime, checkOutTime, checkInDate)
      })

      const allEqual = slotAvaliblity => slotAvaliblity.every(v => v === "notAvailable");

      for (let i = 0; i < slotAvaliblity.length; i++) {
        if (slotAvaliblity[i] === undefined || slotAvaliblity[i] === 'empty') {
          writeArrayBookData(userDocument, myCheckOutDate, checkInTime, checkOutTime, currentUserUid, i, querySnapshot) //write firebase
          break
        }
      }

      return allEqual
    }).catch(function (error) {
      console.log("Error getting document:", error);
    })
    console.log(hello);
  }

  const logOut = () => {
    Auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <FirebaseContext.Provider
      value={{
        writeFirebaseUserBook: writeFirebaseUserBook,
        onChangeCheckInTime: onChangeCheckInTime,
        onChangeCheckOutTime: onChangeCheckOutTime,
        onChangeCheckInDate: onChangeCheckInDate,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        checkInDate: checkInDate,
        userInformation: userInformation,
        logOut: logOut,
        setSlotAvaliblityInformation: setSlotAvaliblityInformation,
        slotAvaliblityInformation: slotAvaliblityInformation
      }}>
      { props.children}
    </FirebaseContext.Provider >
  )
};

export { FirebaseProvider, FirebaseContext }
