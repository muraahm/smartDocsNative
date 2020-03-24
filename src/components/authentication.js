import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
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

const dragX = new Value(0);
const dragY = new Value(0);
const gestureState = new Value(-1);
const onGestureEvent = event([
  {
    nativeEvent: {
      translationX: dragX,
      translationY: dragY,
      state: gestureState,
    },
  },
]);
const buttonOpacity = new Value(1);
const bgY = interpolate(buttonOpacity, {
  inputRange: [0, 1],
  outputRange: [-height / 3, 0],
  extrapolate: Extrapolate.CLAMP
});

console.log('state',gestureState)


const Auth = () => {
  return (
    <TapGestureHandler
      maxPointers={1}
      minDist={10}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: bgY }]
          }}
        >
          <Image
            source={require('../assets/login.png')}
            style={{ flex: 1, height: null, width: null }}
          />
        </Animated.View>
    </TapGestureHandler>
  );
};

export default Auth;