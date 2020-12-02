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
  const [carModels, setCarModels] = useState([])
  const [selectedCarModel, setSelectedCarModel] = useState()
  const [editProfileName, setEditProfileName] = useState("")
  const [editProfileEmail, setEditProfileEmail] = useState("")
  const [searchItem, setSearchItem] = useState("")
  const [selectedCarPark, setSelectedCarPark] = useState(null)

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
      setUserActiveParkData(res.data)
    }).catch(function (error) {
      console.log(error);
    })
  }, [trigeredActiveBooked])

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/car')
  //     .then(res => {
  //       setCarModels(res.data)
  //     }).catch(function (error) {
  //       console.log(error);
  //     })
  // }, [])

  // useEffect(() => {
  //   axios.post('http://localhost:3000/api/car/selected-car', {
  //     selectedCarModel
  //   })
  //     .then(res => {
  //       console.log(res.data);
  //     }).catch(function (error) {
  //       console.log(error);
  //     })
  // }, [selectedCarModel])

  useEffect(() => {
    console.log(searchItem)
    axios.post('http://localhost:3000/api/carpark', {
      searchItem
    }).then(res => {
      const dataRetype = {
        parkId: res.data.ParkID,
        kapasite: res.data.Kapasitesi,
        ilce: res.data.Ilce,
        latitude: parseFloat(res.data.Latitude),
        parkAdi: res.data.ParkAdi,
        longitude: parseFloat(res.data.Longitude)
      }
      setSelectedCarPark(dataRetype)
    }).catch(function (error) {
      console.log(error);
    })
  }, [searchItem])

  const userBook = async (parkId, latitude, longitude) => {
    const response = await axios.post('http://localhost:3000/api/book/bookslot', { //returns slotsAreNotAvailable or completed
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

  const userUnbook = (parkId, checkInDateTicket, checkInTimeTicket, checkOutTimeTicket, parkSlot, docId) => {
    axios.post('http://localhost:3000/api/book/bookcancelation', {
      parkId,
      currentUserUid,
      checkInDateTicket,
      checkInTimeTicket,
      checkOutTimeTicket,
      currentUserUid,
      parkSlot,
      docId
    }).then(res => {
      setTrigeredActiveBooked({})
    }).catch(function (error) {
      console.log(error);
    })
  }

  const changePassword = (email) => {
    axios.post('http://localhost:3000/api/user/forgotpassword', {
      email
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
        userHistoryParkData: userHistoryParkData,
        userActiveParkData: userActiveParkData,
        setEditProfileName: setEditProfileName,
        setEditProfileEmail: setEditProfileEmail,
        setTrigeredActiveBooked: setTrigeredActiveBooked,
        userUnbook: userUnbook,
        carModels: carModels,
        setSelectedCarModel: setSelectedCarModel,
        setSearchItem: setSearchItem,
        searchItem: searchItem,
        selectedCarPark: selectedCarPark,
        setSelectedCarPark: setSelectedCarPark,
        changePassword: changePassword
      }}>
      { props.children}
    </FirebaseContext.Provider >
  )
};

export { FirebaseProvider, FirebaseContext }
