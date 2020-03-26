import React, { useContext, useState } from 'react';
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, TouchableOpacity, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import { Text, Content } from 'native-base';
import { AppContext } from '../contexts/appContext';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';


const { height, width } = Dimensions.get('window');

const AnimatedTextInput = (props) => {

  const { login, register } = useContext(AppContext)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ name: false, email: false, password: false });

  // regex patterns
  const patterns = {
    name: /^[a-zA-Z ]+$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^[\d\w@-]{8,20}$/i,
  };

  const auth = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {

      //handle login API call
      if (props.buttonAction === "SIGN IN") {
        login(email, password)
          .then(() => {
            setEmail('')
            setPassword('')
          })
          .catch((e) => {
            console.log("Error:", e)
          })
      };

      // handle register API call
      if (props.buttonAction === "REGISTER") {
        if ( //if passes regex tests
          patterns.name.test(name) &&
          patterns.email.test(email) &&
          patterns.password.test(password)
        ) {
          register(name, email, password)
            .then(() => {
              setName('')
              setEmail('')
              setPassword('')
              setError({ ...error, name: false, email: false, password: false })
            })
            .catch((e) => {
              console.log("Error:", e)
            });
        }
        else { // if didn't pass regex tests
          setError({
            name: !patterns.name.test(name),
            email: !patterns.email.test(email),
            password: !patterns.password.test(password)
          });
        };
      };
    };
  };


  const close = () => {
    setName('')
    setEmail('')
    setPassword('')
    setError({ ...error, name: false, email: false, password: false })
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
      <ScrollView>
        {props.buttonAction === "REGISTER" && (
          <RegisterForm
            name={name}
            email={email}
            password={password}
            error={error}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}>
          </RegisterForm>
        )}
        {props.buttonAction === "SIGN IN" && (
          <LoginForm
            email={email}
            password={password}
            error={error}
            setEmail={setEmail}
            setPassword={setPassword}>
          </LoginForm>)}
      </ScrollView>

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
    zIndex: 1000,
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
