import { Alert } from 'react-native';

// regex patterns
const patterns = {
  name: /^[a-zA-Z ]+$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^[\d\w@-]{8,20}$/i,
  loginPassword: /^(?!\s*$).+/,
};

const loginHelper = async (form, setForm, login, loggedin) => {
  if ( //if passes regex tests
    patterns.email.test(form.email) &&
    patterns.loginPassword.test(form.password)) {
    try {
      await login(form.email, form.password)
      await loggedin("loading"); //enable animated loading view
      await setTimeout(() => {
        loggedin(true); //disable animated loading view
        setForm({ // empty form and close animation
          name: '',
          email: '',
          password: '',
          error: { name: false, email: false, password: false },
          openX: '',
          closeX: 5
        });
      }, 8000);
    } catch (e) {
      loggedin(false);
      setForm({
        ...form,
        error: { name: false, email: false, password: false }
      })
      Alert.alert("", e.response.data.message, [{ text: "OK" }],
        { cancelable: false });
    };
  }
  else {
    setForm({ // if didn't pass regex tests change error values to
      ...form, // display error and prevent form from submitting
      error: {
        name: !patterns.name.test(form.name),
        email: !patterns.email.test(form.email),
        password: !patterns.loginPassword.test(form.password)
      }
    });
  };
};

export default loginHelper;