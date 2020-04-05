import React, { useContext } from 'react';
import { View, ScrollView, Avatar, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'native-base';
import { SafeAreaView } from 'react-navigation';
import { AppContext } from '../contexts/appContext/appCtx';

const CustomDrawer = (props) => {

  const { logout, state } = useContext(AppContext)
  const user = state.userInfo;

  return (
    <View>
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text style={styles.userName}>{`Hi ${user.name}`}</Text>
          </View>
          <DrawerItems {...props} />
        </SafeAreaView>
      </ScrollView>
      <View >
        <TouchableHighlight >
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10}}>
            <Icon name="exit" onPress={logout} style={styles.logout} />
            <Text style={{ color: 'white' }}>Logout</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userName: {
    color: '#f9f9f9',
    marginTop: '3%',
    fontSize: 20,
  },
  logout: {
    color: 'white',
    fontSize: 40,
  },
});

export default CustomDrawer;