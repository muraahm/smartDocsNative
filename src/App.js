import React from 'react';
import Container from './components/container'
import AppContextProvider from './contexts/appContext/appCtx';
import AuthContextProvider from './contexts/authContext/authCtx'

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
