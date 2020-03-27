import React, { useContext } from 'react';
import Navigator from '../routes/drawer';
import { Container } from 'native-base';
import Auth from '../components/authentication';
import Loading from '../components/loading'
import { AppContext } from '../contexts/appContext'


const AppContainer = () => {

  const { state } = useContext(AppContext)

  return (
    <Container>
      {state.loggedin === "loading" && <Loading></Loading>}
      {state.loggedin === false && <Auth />}
      {state.loggedin === true && <Navigator />}
    </Container>
  );
};

export default AppContainer;