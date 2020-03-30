import React, { useContext } from 'react';
import Navigator from '../routes/drawer';
import { Container } from 'native-base';
import Authentication from '../components/userAuthentication/authentication';
import Loading from '../components/userAuthentication/loading'
import { AppContext } from '../contexts/appContext/appCtx'


const AppContainer = () => {

  const { state } = useContext(AppContext)

  return (
    <Container>
      {state.loggedin === "loading" && (<Loading />)}
      {state.loggedin === false && (<Authentication />)}
      {state.loggedin === true && (<Navigator />)}
    </Container>
  );
};

export default AppContainer;