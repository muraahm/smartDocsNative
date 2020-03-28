import React, { useContext } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { AppContext } from '../contexts/appContext';


const AppHeader = ({ title, navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  const { logout } = useContext(AppContext)

  return (
    <Header>
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
    </Header>
  );
};

export default AppHeader;
