import React from 'react';
import { StyleSheet } from 'react-native';
import { Form, Input, Item, Text } from 'native-base';


const RegisterForm = (props) => {

  return (
    <Form style={styles.form}>
      <Item error={props.error.name} >
        <Input
          placeholder="NAME"
          placeholderTextColor="black"
          keyboardType="default"
          onChangeText={name => props.setName(name)}
          autoCompleteType="name"
          textContentType="name"
          clearButtonMode="always"
          value={props.name}
        />
      </Item>
      {props.error.name ? <Text style={styles.error}>Name field cannot be empty*</Text> : <Text />}
      <Item error={props.error.email} >
        <Input
          placeholder="EMAIL"
          placeholderTextColor="black"
          keyboardType="email-address"
          onChangeText={email => props.setEmail(email)}
          autoCompleteType="email"
          textContentType="emailAddress"
          clearButtonMode="always"
          value={props.email}
        />
      </Item>
      {props.error.email ? <Text style={styles.error}>Email must be a valid address*</Text> : <Text />}
      <Item error={props.error.password} >
        <Input
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
      </Item>
      {props.error.password ? <Text style={styles.error}>Password must alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters*</Text> : <Text />}
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
    // height:2,
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