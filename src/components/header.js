import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Left, Body, Right, Button, Icon, Title } from 'native-base';

const AppHeader = ({ title, navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <ImageBackground
      style={styles.container}
      imageStyle={{ borderRadius: 20, borderWidth: 1, opacity: 0.5 }}
      source={require('../assets/login.png')}
    >
      <Left>
        <Button transparent>
          <Icon name="menu" onPress={openMenu} style={styles.menu} />
        </Button>
      </Left>
      <Body>
        <Title style={styles.headerTitile}>{title}</Title>
      </Body>
      <Right />
    </ ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
  },
  headerTitile: {
    fontSize: 30,
    fontFamily: 'Iowan Old Style',
    shadowColor: 'black',
    color: '#e91e63',

  },
  menu: {
    color: 'black',
    fontSize: 40,
  }
});

export default AppHeader;
