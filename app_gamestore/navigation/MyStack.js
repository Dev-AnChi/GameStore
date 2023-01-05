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
import BinhLuanScreen from '../screen/BinhLuanScreen';

const Stack = createNativeStackNavigator();
export default function MyStack(props){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown : false,}}>
        <Stack.Screen name="Login" component={LoginScreen} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="Home" component={UITab} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="DownloadScreen" component={DownloadScreen} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="LikeScreen" component={LikeScreen} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="UserScreen" component={UserScreen} options={{unmountOnBlur: true}}/>
        <Stack.Screen name="BinhLuanScreen" component={BinhLuanScreen} options={{unmountOnBlur: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};