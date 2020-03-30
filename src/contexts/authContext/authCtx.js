import React, { createContext, useState, useContext } from 'react';
import { Keyboard } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { AppContext } from '../appContext/appCtx';
import loginHelper from './loginHelper';
import registerHelper from './registerHelper';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

  //destructure values from the app context
  const { login, register, loggedin } = useContext(AppContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    error: { name: false, email: false, password: false },
    openX: '',
    closeX: ''
  });

  const authentication = async (nativeEvent, buttonAction) => {
    //handle login API call to server
    if (nativeEvent.state === State.END && buttonAction === "SIGN IN") {
      await loginHelper(form, setForm, login, loggedin);
    };

    // handle register API call to server
    if (nativeEvent.state === State.END && buttonAction === "REGISTER") {
      await registerHelper(form, setForm, register, loggedin);
    };
  };

  const onCloseX = (state) => { //handle close form functionality
    setForm({
      name: '',
      email: '',
      password: '',
      error: { name: false, email: false, password: false },
      openX: '',
      closeX: state
    });
    Keyboard.dismiss()
  };

  const onOpenX = (state) => { //handle open form functionality
    if (state === State.END)
      setForm({ ...form, openX: state });
  };

  return (
    <AuthContext.Provider value={{
      form,
      setForm,
      onCloseX,
      onOpenX,
      authentication,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;