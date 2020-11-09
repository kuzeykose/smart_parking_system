import React, { useState } from 'react';
import Auth from '@react-native-firebase/auth';
import axios from 'axios'

const UserContext = React.createContext()

const AuthProvider = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [licensePlate, setLicensePlate] = useState("")
  const [userCreated, setUserCreated] = useState(false)

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

  // Pass parameters to server for register
  const register = async (fullName, licensePlate, email, password) => {
    const response = await axios.post('http://localhost:3000/api/user/register', {
      fullName,
      licensePlate,
      email,
      password
    }).catch(function (error) {
      console.log(error);
    })
    return response.data
  }

  const passwordChange = (email) => {
    axios.post('http://localhost:3000/api/user/forgotpassword', {
      email
    }).catch(function (error) {
      console.log(error);
    })
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
        register: register,
        userCreated: userCreated,
        setUserCreated: setUserCreated,
        passwordChange: passwordChange
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
};

export { AuthProvider, UserContext }