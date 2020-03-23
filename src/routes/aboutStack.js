import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AppHeader from '../components/header';
import About from '../screens/about';

const screens = {
  About: {
    screen: About,
    navigationOptions: ({navigation}) => {
      return {
        header: () => <AppHeader title="About" navigation={navigation} />,
      };
    },
  },
};

// home stack navigator screens
const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});

export default AboutStack;
