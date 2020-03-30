import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Form, Input, Item, Text } from 'native-base';
import { AuthContext } from '../../contexts/authContext/authCtx';


const RegisterForm = () => {

  const { form, setForm } = useContext(AuthContext);
  const name = form.name;
  const email = form.email;
  const password = form.password;
  const nameError = form.error.name;
  const emailError = form.error.email;
  const passwordError = form.error.password;

  return (
    <Form style={styles.form}>
      <Item error={nameError} >
        <Input
          placeholder="NAME"
          placeholderTextColor="black"
          keyboardType="default"
          onChangeText={name => setForm({ ...form, name })}
          autoCompleteType="name"
          textContentType="name"
          clearButtonMode="always"
          value={name}
        />
      </Item>
      {nameError ? <Text style={styles.error}>Name field cannot be empty*</Text> : <Text />}
      <Item error={emailError} >
        <Input
          placeholder="EMAIL"
          placeholderTextColor="black"
          keyboardType="email-address"
          onChangeText={email => setForm({ ...form, email })}
          autoCompleteType="email"
          textContentType="emailAddress"
          clearButtonMode="always"
          value={email}
        />
      </Item>
      {emailError ? <Text style={styles.error}>Email must be a valid address*</Text> : <Text />}
      <Item error={passwordError} >
        <Input
          placeholder="PASSWORD"
          placeholderTextColor="black"
          keyboardType="ascii-capable"
          onChangeText={password => setForm({ ...form, password })}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
          clearButtonMode="always"
          value={password}
        />
      </Item>
      {passwordError ? <Text style={styles.error}>Password must alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters*</Text> : <Text />}
    </Form>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  form: {
    marginVertical: 5,
    marginHorizontal: 20,
    paddingLeft: 10,
    paddingRight: 28,
  },
  error: {
    color: "red",
    marginVertical: 5,
    marginHorizontal: 20,
    paddingRight: 28,
  }
})


export default RegisterForm;