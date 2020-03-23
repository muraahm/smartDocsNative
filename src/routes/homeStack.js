import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AppHeader from '../components/header';
import Home from '../screens/home';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
      return {
        header: () => <AppHeader title="Home" navigation={navigation} />,
      };
    },
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60},
  },
});

export default HomeStack;
