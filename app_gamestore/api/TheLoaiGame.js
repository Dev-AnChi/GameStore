import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';

const TheLoaiGame = (props) => {
    configtheloaigame = configApi.theloaigame + props.idGame;

    const [theloaigame, settheloaigame] = useState([]);
    useEffect(()=>{
        getDatatheloaigame();
    },[])

    const getDatatheloaigame = () => {
        axios.get(configtheloaigame)
        .then( (response) => {
            var datatheloaigame = response.data;
            settheloaigame(datatheloaigame);
        })
        .catch(function (error) {
            console.log("Loi khong lay duoc API: "  + error);
        });
    }

  return (
    <FlatList
        data={theloaigame}
        style={{flex : 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
            return <View style={{alignItems : 'flex-start', justifyContent : 'center'}}>
                <TouchableOpacity style={styles.loaiBtn}>
                    <Text style={{marginLeft : 5, color : 'black', fontSize : 15}}>{item.TenTheLoai}</Text>
                </TouchableOpacity>
            </View>
        }} />
    
  )
}

export default TheLoaiGame

const styles = StyleSheet.create({
    loaiBtn : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 25,
        width : 90,
        borderColor : 'black',
        borderWidth : 1,
        borderRadius : 8,
        marginLeft : 10,
        marginTop : 5,
    }
})