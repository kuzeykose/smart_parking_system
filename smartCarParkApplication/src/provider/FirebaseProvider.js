import React, { createContext, useState, useEffect } from 'react';
import Auth from '@react-native-firebase/auth';
import axios from 'axios'

const FirebaseContext = createContext(null)

const FirebaseProvider = (props) => {
  //get parkId for send Firestore specific position
  const [checkInTime, setCheckInTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkOutTime, setCheckOutTime] = useState(new Date(2020, 1, 1, 0, 0, 0))
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [userInformation, setUserInformation] = useState({})
  const [userHistoryParkData, setUserHistoryParkData] = useState([])
  const [userActiveParkData, setUserActiveParkData] = useState([])
  const [trigeredActiveBooked, setTrigeredActiveBooked] = useState()
  const [editProfileName, setEditProfileName] = useState("")
  const [editProfileEmail, setEditProfileEmail] = useState("")

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
    axios.get('http://localhost:3000/')
      .then(function (response) {
        console.log(response.data);
      })
  }, [])

  //get saved data in database
  useEffect(() => {
    axios.post('http://localhost:3000/api/user', {
      currentUserUid
    }).then(res => {
      setUserInformation(res.data.information)
      setUserHistoryParkData(res.data.history)
      setUserActiveParkData(res.data.active)
    }).catch(function (error) {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    axios.post('http://localhost:3000/api/ticket', {
      currentUserUid
    }).then(res => {
      console.log(res.data);
      setUserActiveParkData(res.data)
    }).catch(function (error) {
      console.log(error);
    })
    setTrigeredActiveBooked(null)
  }, [trigeredActiveBooked])

  const userBook = async (parkId, latitude, longitude) => {
    const response = await axios.post('http://localhost:3000/api/book', { //returns slotsAreNotAvailable or completed
      parkId,
      latitude,
      longitude,
      currentUserUid,
      checkOutTime,
      checkInTime,
      checkInDate
    }).catch(function (error) {
      console.log(error);
    })
    return response.data
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
        userHistoryParkData: userHistoryParkData,
        userActiveParkData: userActiveParkData,
        setEditProfileName: setEditProfileName,
        setEditProfileEmail: setEditProfileEmail,
        setTrigeredActiveBooked: setTrigeredActiveBooked
      }}>
      { props.children}
    </FirebaseContext.Provider >
  )
};

export { FirebaseProvider, FirebaseContext }
