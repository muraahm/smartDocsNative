import React, { useContext, useState } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { AppContext } from '../contexts/appContext';

const { height, width } = Dimensions.get('window');

const AnimatedTextInput = (props) => {

  const { login, register } = useContext(AppContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nameTextInput = React.createRef();
  const emailTextInput = React.createRef();
  const passwordTextInput = React.createRef();
  const auth = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {

      if (props.buttonAction === "SIGN IN") {
        login(email, password)
      }
      if (props.buttonAction === "REGISTER") {
        register(name, email, password)
        nameTextInput.current.clear()
      }
      emailTextInput.current.clear()
      passwordTextInput.current.clear()
    }
  }


  const close = () => {
    if (props.buttonAction === "REGISTER") {
      nameTextInput.current.clear()
    }
    emailTextInput.current.clear()
    passwordTextInput.current.clear()
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
      {props.buttonAction === "REGISTER" &&
        (
          <TextInput
            placeholder="NAME"
            style={styles.textInput}
            placeholderTextColor="black"
            keyboardType="default"
            onChangeText={name => setName(name)}
            autoCompleteType="name"
            textContentType="name"
            clearButtonMode="always"
            ref={nameTextInput}
          />
        )}

      <TextInput
        placeholder="EMAIL"
        style={styles.textInput}
        placeholderTextColor="black"
        keyboardType="email-address"
        onChangeText={email => setEmail(email)}
        autoCompleteType="email"
        textContentType="emailAddress"
        clearButtonMode="always"
        ref={emailTextInput}
      />

      <TextInput
        placeholder="PASSWORD"
        style={styles.textInput}
        placeholderTextColor="black"
        keyboardType="ascii-capable"
        onChangeText={password => setPassword(password)}
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry={true}
        clearButtonMode="always"
        ref={passwordTextInput}
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
  },
  touchableOpacity: {
    height: 40,
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AnimatedTextInput;
