import React from 'react';
import Navigator from './routes/drawer';
import {Container} from 'native-base';

const HelloWorldApp = () => {
  return (
    <Container>
      <Navigator />
    </Container>
  );
};

export default HelloWorldApp;
