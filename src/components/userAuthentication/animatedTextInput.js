import React, { useContext } from 'react';
import Animated from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, Content } from 'native-base';
import { AuthContext } from '../../contexts/authContext';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

//import screen dimensions to control view and animation
const { height, width } = Dimensions.get('window');

const AnimatedTextInput = (props) => {

  //destructure values from the auth context
  const { form, setForm, authHelperFunction } = useContext(AuthContext);

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
          <Text style={{ fontSize: 15 }}>X</Text>
        </Animated.View>
      </TapGestureHandler>

      <Animated.View style={styles.formContentView}>
        <Content enableAutomaticScroll={false}>
          {props.buttonAction === "REGISTER" &&
            <RegisterForm form={form} setForm={setForm} />}
          {props.buttonAction === "SIGN IN" &&
            <LoginForm form={form} setForm={setForm} />}
        </Content>
        <TapGestureHandler onHandlerStateChange={({ nativeEvent }) => authHelperFunction(nativeEvent, props.buttonAction)}>
          <Animated.View style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.buttonAction}</Text>
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>
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
  formContentView: {
    height: height / 3.5
  }
});

export default AnimatedTextInput;
