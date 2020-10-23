import React, { createContext, useState, useEffect } from 'react';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios'

import { checkAvailableStatus } from './FirebaseProviderHelpers/checkAvailableStatus'
import { writeArrayBookDataAvailable, writeArrayBookDataEmpty } from './FirebaseProviderHelpers/writeArrayBookData'

const FirebaseContext = createContext(null)

const FirebaseProvider = (props) => {
  //get parkId for send Firestore specific position
  const [checkInTime, setCheckInTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkOutTime, setCheckOutTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [userInformation, setUserInformation] = useState({})
  const [slotAvaliblityInformation, setSlotAvaliblityInformation] = useState(null)
  const [userHistoryParkData, setUserHistoryParkData] = useState([])


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

  const allNotAvailable = arr => arr.every(v => v === "notAvailable") // check all element in slotAvaliblity are they notAvailable?

  // useEffect(() => {
  //   firestore().collection('users').doc(`${currentUserUid}`)
  //     .get()
  //     .then(snapShot => {
  //       setUserInformation(snapShot.data())
  //     })
  // })

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(function (response) {
        console.log(response.data);
      })
  }, [currentUserUid])

  useEffect(() => {
    axios.post('http://localhost:3000/user', {
      currentUserUid
    }).then(res => {
      setUserInformation(res.data)
    }).catch(function (error) {
      console.log(error);
    })
  }, [currentUserUid])

  useEffect(() => {
    axios.post('http://localhost:3000/user/ticket', {
      currentUserUid
    }).then(res => {
      setUserHistoryParkData(res.data)
    }).catch(function (error) {
      console.log(error);
    })
  }, [currentUserUid])


  // set Firebase car - parks slots from taking data from user -> (car - parks / { parkId } / parking - slot)
  const writeFirebaseUserBook = (parkId) => {
    const userDocument = firestore().collection('car-parks').doc(parkId).collection('parking-slots')
    var date = checkInDate.toLocaleDateString().split("/")
    var myCheckOutDate = date.join("-")
    //get document in firebase and set slotAvaliblity with empty/available/notAvailable
    userDocument.get().then(querySnapshot => {
      var slotAvaliblity = querySnapshot.docs.map(doc => {
        return checkAvailableStatus(doc, checkInTime, checkOutTime, checkInDate)
      })
      console.log(slotAvaliblity);

      for (let i = 0; i < slotAvaliblity.length; i++) {
        if (slotAvaliblity[i] === undefined) {
          writeArrayBookDataAvailable(userDocument, myCheckOutDate, checkInTime, checkOutTime, currentUserUid, i, querySnapshot) //write firebase
          break
        } else if (slotAvaliblity[i] === 'empty') {
          writeArrayBookDataEmpty(userDocument, myCheckOutDate, checkInTime, checkOutTime, currentUserUid, i, querySnapshot)
          break
        }
      }

      if (allNotAvailable(slotAvaliblity)) {
        console.log("sorry no available");
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    })

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
        slotAvaliblityInformation: slotAvaliblityInformation,
        userHistoryParkData: userHistoryParkData
      }}>
      { props.children}
    </FirebaseContext.Provider >
  )
};

export { FirebaseProvider, FirebaseContext }
