import React from 'react';
import {Container} from 'native-base';
import AppHeader from './components/header';
import Navigator from './routes/homeStack';

const HelloWorldApp = () => {
  return (
    <Navigator />
    // <Container>
    //   <AppHeader />
    // </Container>
  );
};

export default HelloWorldApp;
