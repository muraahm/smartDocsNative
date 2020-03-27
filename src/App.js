import React from 'react';
import Container from './components/container'
import AppContextProvider from './contexts/appContext';

const App = () => {

  return (
    <AppContextProvider>
      <Container/>
    </AppContextProvider>
  );
};

export default App;
