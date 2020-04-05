import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';

const About = () => {
  return (
    <Container>
        <Content />
        <Footer>
          <FooterTab>
            <Button>
              <Text>Categories</Text>
            </Button>
            <Button>
              <Text>Camera</Text>
            </Button>
            <Button active>
              <Text>Navigate</Text>
            </Button>
            <Button>
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
  );
};

export default About;
