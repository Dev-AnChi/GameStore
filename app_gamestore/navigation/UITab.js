import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import images from '../contains/images';
import MainScreen from '../screen/MainScreen';
import UserScreen from '../screen/UserScreen';
import DownloadScreen from '../screen/DownloadScreen';
import LikeScreen from '../screen/LikeScreen';

const Tab = createBottomTabNavigator();
const screenOption = ({route}) => ({
    headerShown: false,
    tabBarActiveTintColor: 'red',
    tabBarInactiveTintColor : 'black',
    tabBarStyle: {height: 50},
    tabBarHideOnKeyboard: true,
    tabBarLabelStyle : {
        fontSize: 15,
        fontWeight: "400",
    },
    tabBarIcon : ({focused, color, size}) => {
        let screenName = route.name;
        var iconName = images.home;
        var iconNameClick = images.homeclick;
        if(screenName == 'MainScreen'){
            iconName = images.home;
            iconNameClick = images.homeclick;
        }
        else if (screenName == 'DownloadScreen'){
            iconName = images.download;
            iconNameClick = images.downloadclick;
        }
        else if (screenName == 'LikeScreen'){
            iconName = images.heart;
            iconNameClick = images.heartclick;
        }
        else if (screenName == 'UserScreen'){
            iconName = images.user;
            iconNameClick = images.userclick;
        }
        return <Image source={focused ? iconNameClick : iconName} style={{width : 25, height : 25}}/>
    }
})
function UITab({navigation, route}){
    //route.params.idUser
    //alert(route.params.idUser)
  return (
    <Tab.Navigator screenOptions={screenOption} >
        <Tab.Screen name='MainScreen' component={MainScreen} options={{tabBarLabel: 'Trang chủ'}} initialParams={{idUser : route.params.idUser}}/>
        <Tab.Screen name='DownloadScreen' component={DownloadScreen} options={{tabBarLabel: 'Đã tải'}} initialParams={{idUser : route.params.idUser}}/>
        <Tab.Screen name='LikeScreen' component={LikeScreen} options={{tabBarLabel: 'Yêu thích'}} initialParams={{idUser : route.params.idUser}}/>
        <Tab.Screen name='UserScreen' component={UserScreen} options={{tabBarLabel: 'Người dùng'}} initialParams={{idUser : route.params.idUser}}/>
    </Tab.Navigator>
  )
}

export default UITab

const styles = StyleSheet.create({

})