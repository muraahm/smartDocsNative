import React from 'react';
import {Header, Left, Body, Right, Title, Button, Icon} from 'native-base';

const AppHeader = () => {
  return (
    <Header>
      <Left>
        <Button transparent>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
  );
};

export default AppHeader;
