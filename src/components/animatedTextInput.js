import React from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler, TextInput } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const AnimatedTextInput = (props) => {

  const auth = () => {
    if (props.buttonAction === "SIGN IN") {
      console.log('signin')
    }
    if (props.buttonAction === "REGISTER") {
      console.log('REGISTER')
    }
  }

  return (
    <Animated.View style={{
      zIndex: props.textInputZindex,
      opacity: props.textInputOpacity,
      transform: [{ translateY: props.textInputY }],
      height: height / 3,
      ...StyleSheet.absoluteFill,
      top: null,
      justifyContent: 'center'
    }}>
      <TapGestureHandler onHandlerStateChange={props.onCloseX} >
        <Animated.View style={styles.closeButton} >
          <Animated.Text style={{ fontSize: 15 }}>X</Animated.Text>
        </Animated.View>
      </TapGestureHandler>
      <TextInput
        placeholder="EMAIL"
        style={styles.textInput}
        placeholderTextColor="black"
      />
      <TextInput
        placeholder="PASSWORD"
        style={styles.textInput}
        placeholderTextColor="black"
      />
      <TapGestureHandler onHandlerStateChange={auth} >
      <Animated.View style={styles.button}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.buttonAction}</Text>
      </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
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
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)'
  },
  closeButton: {
    height: 40,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 50,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  }
});

export default AnimatedTextInput;
