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
    axios.post('http://localhost:3000/api/user', {
      currentUserUid
    }).then(res => {
      setUserInformation(res.data)
    }).catch(function (error) {
      console.log(error);
    })
  }, [currentUserUid])

  const userBook = (parkId) => {
    axios.post('http://localhost:3000/api/book', {
      parkId,
      currentUserUid,
      checkOutTime,
      checkInTime,
      checkInDate
    }).then(res => {
      console.log(res.data);
    }).catch(function (error) {
      console.log(error);
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
        userBook: userBook,
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
        userHistoryParkData: userHistoryParkData,
      }}>
      { props.children}
    </FirebaseContext.Provider >
  )
};

export { FirebaseProvider, FirebaseContext }
