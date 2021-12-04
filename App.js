
import React from 'react';
import { Text, StatusBar, View } from 'react-native';
import styles from './styles/styles';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Settings from './screens/Settings';
import AddNew from './screens/AddNew';
import ViewPlan from './screens/View';
import NewUser from './screens/NewUser';

const Stack = createNativeStackNavigator();

export default function App() {

  return <>
    <StatusBar backgroundColor='#000' />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name='Home'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={AddNew}
          name='AddNew'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ViewPlan}
          name='ViewPlan'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Settings}
          name='Settings'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={NewUser}
          name='NewUser'
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
}

const SettingsScreen = () => {
  return <View><Text>SettingsScreen</Text></View>
}