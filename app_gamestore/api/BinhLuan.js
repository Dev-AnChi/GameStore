import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';
import IconUser from './IconUser';

const BinhLuan = (props) => {
    configbinhluan = configApi.binhluangame + props.idGame;

    const [binhluan, setbinhluan] = useState([]);
    useEffect(()=>{
        getDatabinhluan();
    },[])

    const getDatabinhluan = () => {
        axios.get(configbinhluan)
        .then( (response) => {
            var databinhluan = response.data;
            setbinhluan(databinhluan);
        })
        .catch(function (error) {
            console.log("Loi khong lay duoc API: "  + error);
        });
    }

  return (
    <FlatList
        data={binhluan}
        style={styles.flatlistBinhLuan}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
            return <View>
                <IconUser idUser = {item.ID_NguoiBinhLuan} rate = {item.DanhGia}/>
                <View style={styles.boxBinhluan}>
                    <Text style={{margin : 10, color : 'black'}}>{item.NoiDungBL}</Text>
                </View> 
            </View>
        }} />
  )
}

export default BinhLuan

const styles = StyleSheet.create({
    flatlistBinhLuan : {
        flex : 1,
        flexDirection : 'row',
        marginBottom : 10
    },
    boxBinhluan : {
        marginLeft : 80,
        borderWidth : 1,
        borderColor : '#ebebe0',
        borderTopStartRadius : 0,
        borderRadius : 10,
        backgroundColor : '#d6d6c2'
    }
})