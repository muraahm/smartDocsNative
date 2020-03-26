import React, { useContext, useState } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { AppContext } from '../contexts/appContext';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';


const { height, width } = Dimensions.get('window');

const AnimatedTextInput = (props) => {

  const { login, register } = useContext(AppContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(true);

  const auth = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END && error === false) {
      if (props.buttonAction === "SIGN IN") {
        console.log('login')
        // login(email, password)
      }
      if (props.buttonAction === "REGISTER") {
        console.log('register')
        // register(name, email, password)
      }
      setName('')
      setEmail('')
      setPassword('')
    }
  };


  const close = () => {
    setName('')
    setEmail('')
    setPassword('')
    Keyboard.dismiss()
  };

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
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => close()}>
            <Text style={{ fontSize: 15 }}>X</Text>
          </TouchableOpacity>
        </Animated.View>
      </TapGestureHandler>

      {props.buttonAction === "REGISTER" && (
        <RegisterForm
          name={name}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          setError={setError}>
        </RegisterForm>)}
      {props.buttonAction === "SIGN IN" && (
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setError={setError}>
        </LoginForm>)}

      <TapGestureHandler onHandlerStateChange={auth}>
        <Animated.View style={styles.button}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.buttonAction}</Text>
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  )
};

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
    shadowOpacity: 0.2
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
  },
  touchableOpacity: {
    height: 40,
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default AnimatedTextInput;
