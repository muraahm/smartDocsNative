import { Alert } from 'react-native';
import { State } from 'react-native-gesture-handler';

// regex patterns
const patterns = {
  name: /^[a-zA-Z ]+$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^[\d\w@-]{8,20}$/i,
  loginPassword: /^(?!\s*$).+/,
};

const registerHelper = async (form, setForm, register, loggedin) => {
  if ( //if passes regex tests
    patterns.name.test(form.name) &&
    patterns.email.test(form.email) &&
    patterns.password.test(form.password)
  ) {
    try {
      await register(form.name, form.email, form.password);
      await loggedin("loading"); //enable animated loading view
      await setTimeout(() => {
        loggedin(true); //disable animated loading view
        setForm({ // empty form and close animation
          name: '',
          email: '',
          password: '',
          error: { name: false, email: false, password: false },
          openX: '',
          closeX: State.END
        });
      }, 8000);
    }
    catch (e) {
      loggedin(false);
      setForm({
        ...form,
        error: { name: false, email: false, password: false }
      });
      Alert.alert("", e.response.data.message, [{ text: "OK" }],
        { cancelable: false }
      );
    };
  }
  else {
    setForm({ // if didn't pass regex tests change error values to
      ...form, // display errors and prevent form from submitting
      error: {
        name: !patterns.name.test(form.name),
        email: !patterns.email.test(form.email),
        password: !patterns.password.test(form.password)
      }
    });
  };
};

export default registerHelper;