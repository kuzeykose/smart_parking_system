import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

const UserContext = React.createContext()
const AuthProvider = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signInFunc = (email, password) => {
    auth()
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

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  return (
    <UserContext.Provider
      value={{
        email: email,
        password: password,
        setEmail: setEmail,
        setPassword: setPassword,
        signInFunc: signInFunc,
        logOut: logOut
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
};

export { AuthProvider, UserContext }