import React from 'react';
import { StyleSheet } from 'react-native';
import { Form, Input } from 'native-base';


const RegisterForm = (props) => {

  return (
    <Form style={styles.form}>
      <Input
        style={styles.textInput}
        placeholder="NAME"
        placeholderTextColor="black"
        keyboardType="default"
        onChangeText={name => props.setName(name)}
        autoCompleteType="name"
        textContentType="name"
        clearButtonMode="always"
        value={props.name}
      />
      <Input
        style={styles.textInput}
        placeholder="EMAIL"
        placeholderTextColor="black"
        keyboardType="email-address"
        onChangeText={email => props.setEmail(email)}
        autoCompleteType="email"
        textContentType="emailAddress"
        clearButtonMode="always"
        value={props.email}
      />
      <Input
        style={styles.textInput}
        placeholder="PASSWORD"
        placeholderTextColor="black"
        keyboardType="ascii-capable"
        onChangeText={password => props.setPassword(password)}
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry={true}
        clearButtonMode="always"
        value={props.password}
      />
    </Form>
  );
}

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
    height: 160,
  }
})


export default RegisterForm;