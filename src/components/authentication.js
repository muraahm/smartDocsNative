import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import AnimatedTextInput from './animatedTextInput'
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

const runTiming = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
const buttonOpacity = new Value(1);
const onStateChange = event([
  {
    nativeEvent: ({ state }) =>
      block([
        cond(
          eq(state, State.END),
          set(buttonOpacity, runTiming(new Clock(), 1, 0))
        )
      ])
  }
]);

const onCloseX = event([
  {
    nativeEvent: ({ state }) =>
      block([
        cond(
          eq(state, State.END),
          set(buttonOpacity, runTiming(new Clock(), 0, 1))
        )
      ])
  }
]);

const buttonY = interpolate(buttonOpacity, {
  inputRange: [0, 1],
  outputRange: [100, 0],
  extrapolate: Extrapolate.CLAMP
});
const bgY = interpolate(buttonOpacity, {
  inputRange: [0, 1],
  outputRange: [-height / 3, 0],
  extrapolate: Extrapolate.CLAMP
});
const textInputZindex = interpolate(buttonOpacity, {
  inputRange: [0, 1],
  outputRange: [1, -1],
  extrapolate: Extrapolate.CLAMP
});
const textInputY = interpolate(buttonOpacity, {
  inputRange: [0, 1],
  outputRange: [0, 100],
  extrapolate: Extrapolate.CLAMP
});
const textInputOpacity = interpolate(buttonOpacity, {
  inputRange: [0, 1],
  outputRange: [1, 0],
  extrapolate: Extrapolate.CLAMP
});


const Auth = () => {

  const [buttonAction, setButtonAction] = useState('');

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-end'
    }}>
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
      <View style={{ height: height / 3, justifyContent: 'center' }}>
        <TapGestureHandler onHandlerStateChange={onStateChange} >

          <Animated.View
            style={{
              ...styles.button,
              opacity: buttonOpacity,
              transform: [{ translateY: buttonY }]
            }}
          >
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setButtonAction('SIGN IN')}>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold' }}
              >SIGN IN</Text>
            </TouchableOpacity>
          </Animated.View>
        </TapGestureHandler>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: 'black',
              opacity: buttonOpacity,
              transform: [{ translateY: buttonY }]
            }}
          >
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setButtonAction('REGISTER')}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                REGISTER
            </Text>
            </TouchableOpacity>
          </Animated.View>
        </TapGestureHandler>
        <AnimatedTextInput
          textInputZindex={textInputZindex}
          textInputY={textInputY}
          textInputOpacity={textInputOpacity}
          onCloseX={onCloseX}
          buttonAction={buttonAction}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  touchableOpacity: {
    height: 60,
    width: width - 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Auth;