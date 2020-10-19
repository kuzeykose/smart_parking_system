import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

// import { AuthProvider } from '../navigation/AuthProvider'

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Providers;