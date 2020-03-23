import React from 'react';
import Navigator from './routes/drawer';
import { Container } from 'native-base';
import Auth from './components/authentication';
import AsyncStorage from '@react-native-community/async-storage';

// AsyncStorage.setItem('token', '123456');
// const value = AsyncStorage.getItem('token');
// console.log(value);

const App = () => {
  const loggedin = true;
  return (
    <Container>
      {!loggedin && <Auth />}
      {loggedin && <Navigator />}
    </Container>
  );
};

export default App;
