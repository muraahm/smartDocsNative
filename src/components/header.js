import React, { useContext } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { AppContext } from '../contexts/appContext/appCtx';


const AppHeader = ({ title, navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  const { logout } = useContext(AppContext)

  return (
    <ImageBackground
      style={styles.container}
      imageStyle={{ borderRadius: 20, borderWidth: 1, }}
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcfV5XPJpZG47SS_j1WaUc77gdgtDWELK-zrb5H_GN90zHgKhx&usqp=CAU' }}
    >
      <Left>
        <Button transparent>
          <Icon name="menu" onPress={openMenu} style={styles.menu} />
        </Button>
      </Left>
      <Body>
        <Title style={styles.headerTitile}>{title}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="exit" onPress={logout} style={styles.logout} />
        </Button>
      </Right>
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
    fontSize: 25,
    fontFamily: 'Iowan Old Style',
    shadowColor: 'black',
    color: 'red'

  },
  logout: {
    color: 'black',
    fontSize: 40,
  },
  menu: {
    color: 'black',
    fontSize: 40,
  }
});

export default AppHeader;
