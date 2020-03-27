import React, { createContext, useState, useContext } from 'react';
import { State } from 'react-native-gesture-handler';
import { AppContext } from '../contexts/appContext';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  
  //destructure values from the app context
  const { login, register, loggedin } = useContext(AppContext)
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

  const authHelperFunction = (nativeEvent, buttonAction) => {

    if (nativeEvent.state === State.END) {
      //handle login API call
      if (buttonAction === "SIGN IN") {
        if (patterns.email.test(email) &&
          patterns.password.test(password)) {
          login(email, password) // api call to server
            .then(() => {
              //enable animated loading view
              loggedin("loading");
            })
            .then(() => {
              setTimeout(() => {
                //disable animated loading view
                loggedin(true);
                setEmail('');
                setPassword('');
                setError({ ...error, name: false, email: false, password: false });
              }, 6000);
            })
            .catch((e) => {
              console.log("Error:", e);
            })
        }
        else {
          // if didn't pass regex tests change error values to display error
          // and prevent form from submitting
          setError({
            name: !patterns.name.test(name),
            email: !patterns.email.test(email),
            password: !patterns.password.test(password)
          });
        };

      };

      // handle register API call
      if (buttonAction === "REGISTER") {
        if ( //if passes regex tests
          patterns.name.test(name) &&
          patterns.email.test(email) &&
          patterns.password.test(password)
        ) {
          register(name, email, password) // register api call to server
            .then(() => {
              //enable animated loading view
              loggedin("loading");
            })
            .then(() => {
              setTimeout(() => {
                //disable animated loading view
                loggedin(true);
                setName('');
                setEmail('');
                setPassword('');
                setError({ ...error, name: false, email: false, password: false });
              }, 6000);
            })
            .catch((e) => {
              console.log("Error:", e);
            });
        }
        else {
          // if didn't pass regex tests change error values to display error
          // and prevent form from submitting
          setError({
            name: !patterns.name.test(name),
            email: !patterns.email.test(email),
            password: !patterns.password.test(password)
          });
        };
      };
    };
  };


  return (
    <AuthContext.Provider value={
      {
        name,
        email,
        password,
        error,
        setName,
        setEmail,
        setPassword,
        setError,
        authHelperFunction
      }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;