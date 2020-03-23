import React from 'react';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';

const AppHeader = ({title, navigation}) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

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
      <Right />
    </Header>
  );
};

export default AppHeader;
