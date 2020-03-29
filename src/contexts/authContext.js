import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { AppContext } from '../contexts/appContext';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

  //destructure values from the app context
  const { login, register, loggedin } = useContext(AppContext)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    error: { name: false, email: false, password: false }
  });

  // regex patterns
  const patterns = {
    name: /^[a-zA-Z ]+$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^[\d\w@-]{8,20}$/i,
    loginPassword: /^(?!\s*$).+/,
  };

  const authHelperFunction = (nativeEvent, buttonAction) => {

    if (nativeEvent.state === State.END) {
      //handle login API call
      if (buttonAction === "SIGN IN") {
        if (patterns.email.test(form.email) && patterns.loginPassword.test(form.password)) {
          login(form.email, form.password) // api call to server
            .then(() => {
              //enable animated loading view
              loggedin("loading");
            })
            .then(() => {
              setTimeout(() => {
                loggedin(true);
                setForm({
                  name: '',
                  email: '',
                  password: '',
                  error: { name: false, email: false, password: false }
                })
              }, 8000);
            })
            .catch((e) => {
              loggedin(false);
              setForm({
                ...form,
                error: { name: false, email: false, password: false }
              })
              Alert.alert(
                "",
                e.response.data.message,
                [
                  {
                    text: "OK",
                  }
                ],
                { cancelable: false }
              );
              console.log("Error:", e)
            })
        }
        else {
          // if didn't pass regex tests change error values to display error
          // and prevent form from submitting
          setForm({
            ...form,
            error: {
              name: !patterns.name.test(form.name),
              email: !patterns.email.test(form.email),
              password: !patterns.loginPassword.test(form.password)
            }
          })
        };

      };

      // handle register API call
      if (buttonAction === "REGISTER") {
        if ( //if passes regex tests
          patterns.name.test(form.name) &&
          patterns.email.test(form.email) &&
          patterns.password.test(form.password)
        ) {
          register(form.name, form.email, form.password) // register api call to server
            .then(() => {
              //enable animated loading view
              loggedin("loading");
            })
            .then(() => {
              setTimeout(() => {
                //disable animated loading view
                loggedin(true);
                setForm({
                  name: '',
                  email: '',
                  password: '',
                  error: { name: false, email: false, password: false }
                });
              }, 8000);
            })
            .catch((e) => {
              loggedin(false);
              setForm({
                ...form,
                error: { name: false, email: false, password: false }
              })
              Alert.alert(
                "",
                e.response.data.message,
                [
                  {
                    text: "OK",
                  }
                ],
                { cancelable: false }
              );
              console.log("Error:", e)
            })
        }
        else {
          // if didn't pass regex tests change error values to display error
          // and prevent form from submitting
          setForm({
            ...form,
            error: {
              name: !patterns.name.test(form.name),
              email: !patterns.email.test(form.email),
              password: !patterns.password.test(form.password)
            }
          })
        };
      };
    };
  };


  return (
    <AuthContext.Provider value={
      {
        form,
        setForm,
        authHelperFunction,
      }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;