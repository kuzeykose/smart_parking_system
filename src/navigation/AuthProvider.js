import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

const UserContext = React.createContext()
class AuthProvider extends React.Component {
  state = {
    email: '',
    password: ''
  }

  setEmail = (email) => {
    this.setState({ email })
  }

  setPassword = (password) => {
    this.setState({ password })
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          email: this.state.email,
          password: this.state.password,
          setEmail: this.setEmail,
          setPassword: this.setPassword,

        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }

};

export { AuthProvider, UserContext }