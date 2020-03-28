import React, { useContext } from 'react';
import Navigator from '../routes/drawer';
import { Container } from 'native-base';
import Auth from '../components/authentication';
import Loading from '../components/loading'
import { AppContext } from '../contexts/appContext'
import Animated, { Easing } from 'react-native-reanimated';

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate
} = Animated;


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