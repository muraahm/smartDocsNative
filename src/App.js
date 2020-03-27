import React from 'react';
import Container from './components/container'
import AppContextProvider from './contexts/appContext';
import AuthContextProvider from './contexts/authContext'

const App = () => {

  return (
    <AppContextProvider>
      <AuthContextProvider>
        <Container />
      </AuthContextProvider>
    </AppContextProvider>
  );
};

export default App;
