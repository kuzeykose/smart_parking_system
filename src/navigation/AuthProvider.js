import React, { useEffect, createContext, useState } from 'react';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserContext = React.createContext()

const AuthProvider = (props) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [licensePlate, setLicensePlate] = useState("")
  const [userInformation, setUserInformation] = useState({})

  const currentUserUid = Auth().currentUser.uid

  useEffect(() => {
    firestore().collection('users').doc(`${currentUserUid}`)
      .get()
      .then(snapShot => {
        setUserInformation(snapShot.data())
      })
  })


  const signIn = (email, password) => {
    Auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  const register = (fullName, licensePlate, email, password) => {
    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        let userUid = cred.user.uid
        const users = firestore().collection("users").doc(userUid)
        users.set({
          name: fullName,
          licensePlate: licensePlate,
          email: email,
          userUid: userUid
        })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  const logOut = () => {
    Auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <UserContext.Provider
      value={{
        email: email,
        password: password,
        fullName: fullName,
        licensePlate: licensePlate,
        setEmail: setEmail,
        setPassword: setPassword,
        setFullName: setFullName,
        setLicensePlate: setLicensePlate,
        setPassword: setPassword,
        signIn: signIn,
        logOut: logOut,
        register: register,
        userInformation: userInformation
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
};

export { AuthProvider, UserContext }