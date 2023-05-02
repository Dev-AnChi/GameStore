import { Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../contains/images'
import configApi from '../api/configApi';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setisLogin]=useState(true);
    const [isPress, setisPress]=useState(false);

    var configlogin = '';

    const getDatalogin = () => {
        axios.get(configlogin)
        .then( (response) => {
            var datalogin = response.data;

            setisLogin(datalogin.length==0 ? false : true);
            datalogin.length==0 ? alert('Sai tài khoản hoặc mật khẩu, yêu cầu nhập lại !') : alert('Đăng nhập thành công !');

            datalogin.map((item, index)=>{
                if(item.UserName_ND == username && item.Password_ND == password){
                    setisLogin(true);
                    navigation.navigate('Home', {idUser : item.ID_NguoiDung});
                }
            });
        })
        .catch(function (error) {
            console.log("Loi khong lay duoc API: "  + error);
        });
    }

  return (
    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
            style={styles.keyboard}
        >
        <ImageBackground source={{uri:images.backgroundLogin}} style={{flex :1}}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <View style={styles.wellcome}>
                        <Text style={styles.textTitle}>Đăng nhập cửa hàng trò chơi</Text>
                    </View>
                    <View style={styles.logo}>
                        <Image source={{uri:images.logoGame}} style={{width: 100, height : 100}}/>
                    </View>
                </View>
                <View style={styles.formlogin}>
                        <View style={styles.inputgroup}>
                            <View style={{ position: "absolute",zIndex: 1,left: 10, top : 10}}>
                                <Image source={{uri:images.user}} style={{width: 25, height : 25}}/>
                            </View>
                            <TextInput 
                                onChangeText={(text) => {
                                    setUsername(text);
                                }}
                                placeholder='Username' placeholderTextColor={'black'} style={styles.inputform} 
                            />
                        </View>
                        <View style={styles.inputgroup}>
                            <View style={{ position: "absolute",zIndex: 1,left: 10, top : 10}}>
                                <Image source={{uri:images.password}} style={{width: 25, height : 25}}/>
                            </View>
                            <TextInput 
                                onChangeText={(text) => {
                                    setPassword(text);
                                }}
                                placeholder='Password' placeholderTextColor={'black'} secureTextEntry={true} style={styles.inputform} 
                            />
                        </View>
                        {(isLogin == false && isPress==true)&&
                            <View style={{left : 50, top : 10}}>
                                <Text style={{color : 'red'}}>Nhập sai tài khoản hoặc mật khẩu, yêu cầu nhập lại !</Text>
                            </View>
                        }
                </View>
                <View style={styles.btnformlogin}>
                    <TouchableOpacity
                        onPress={() => {
                            configlogin = configApi.login + username + '/' + password;
                            setisPress(true);
                            getDatalogin();
                        }}
                        style={styles.btnlogin}
                    >
                        <Text style={styles.textofbtn}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    keyboard : {
        flex : 1
    },
    container : {
        flex : 1,
    },
    title : {
        flex  : 1,
        
    },
    textTitle : {
        fontSize : 20,
        fontWeight : '800',
        color : 'blue',
        borderLeftWidth : 5,
        borderLeftColor : 'blue',
        paddingLeft : 10
    },
    wellcome : {
        flex : 1,
        marginTop : 20,
    },
    logo : {
        flex : 1,
        justifyContent : 'flex-end',
        alignItems : 'center'
    },
    formlogin : {
        flex : 1,
        alignContent : 'center',
        justifyContent : 'center'
    },
    inputgroup : {
        marginHorizontal : 50,
        marginVertical : 10
    },
    inputform : {
        justifyContent : 'center',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderTopColor : 'black',
        paddingHorizontal : 50,
    },
    btnformlogin : {
        flex : 1,
        alignItems : 'center'
    },
    btnlogin : {
        backgroundColor : 'blue',
        width : 200,
        height : 50,
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center'
    },
    textofbtn : {
        color : 'white',
        fontSize : 20,
    }
})