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
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcfV5XPJpZG47SS_j1WaUc77gdgtDWELK-zrb5H_GN90zHgKhx&usqp=CAU' }}
    >
      <Left>
        <Button transparent>
          <Icon name="menu" onPress={openMenu} />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Text onPress={logout}>LOG OUT</Text>
        </Button>
      </Right>
    </ ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
});

export default AppHeader;
