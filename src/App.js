import React from 'react';
import {
  Container,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Spinner,
} from 'native-base';
import AppHeader from './components/header';

const HelloWorldApp = () => {
  return (
    <Container>
      <AppHeader />
      <Content>
        <ListItem icon>
          <Left>
            <Button style={{backgroundColor: '#FF9501'}}>
              <Icon active name="airplane" />
            </Button>
          </Left>
          <Body>
            <Text>Airplane Mode</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{backgroundColor: '#007AFF'}}>
              <Icon active name="wifi" />
            </Button>
          </Left>
          <Body>
            <Text>Wi-Fi</Text>
          </Body>
          <Right>
            <Text>GeekyAnts</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{backgroundColor: '#007AFF'}}>
              <Icon active name="bluetooth" />
            </Button>
          </Left>
          <Body>
            <Text>Bluetooth</Text>
          </Body>
          <Right>
            <Text>On</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <Spinner color="#f6f6" />
      </Content>
    </Container>
  );
};

export default HelloWorldApp;
