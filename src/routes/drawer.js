import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import CustomDrawer from '../components/customDrawer';

// stacks
import HomeStack from './homeStack';
import AboutStack from './aboutStack';

const DrawerNavigatorConfig = {
  intialRouteName: 'Home',
  contentComponent: CustomDrawer,
  contentOptions: {
    activeTintColor: '#e91e63',
    itemStyle: {
      marginVertical: 5,
    },
    itemsContainerStyle: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'black',
      marginVertical: 3,
      backgroundColor: 'white',
    },
    iconContainerStyle: {
      opacity: 1,
    },
  },
  drawerBackgroundColor: '#262A2C', // sets background color of drawer
};

// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  About: {
    screen: AboutStack,
  },
}, DrawerNavigatorConfig);

export default createAppContainer(RootDrawerNavigator);
