import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DetailScreen from '../screen/DetailScreen';
import MainScreen from '../screen/MainScreen';
import Game from '../api/Game';
import UITab from './UITab';
import UserScreen from '../screen/UserScreen';
import DownloadScreen from '../screen/DownloadScreen';
import LikeScreen from '../screen/LikeScreen';
import LoginScreen from '../screen/LoginScreen';

const Stack = createNativeStackNavigator();
export default function MyStack(props){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown : false}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={UITab}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="DownloadScreen" component={DownloadScreen} />
        <Stack.Screen name="LikeScreen" component={LikeScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};