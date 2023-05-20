import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';

const GameImage = (props) => {
    configHinhAnh = configApi.detailImage + props.idGame;

    const [hinhanh, setHinhAnh] = useState([]);
    useEffect(()=>{
        getDataHinhAnh();
    },[])

    const getDataHinhAnh = () => {
        axios.get(configHinhAnh)
        .then( (response) => {
            var dataHinhAnh = response.data;
            setHinhAnh(dataHinhAnh);
        })
        .catch(function (error) {
            console.log("Loi khong lay duoc API imgGame: "  + error);
        });
    }

  return (
    <FlatList
        data={hinhanh}
        style={styles.flatlistAnh}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
            return <TouchableOpacity 
                onPress={()=>
                    {}
                }>
                    <View style={{width : 300}}>
                        <Image source={{uri: configApi.localhostIMG+item.AnhMH}} style={styles.listImage}/>
                    </View>
                </TouchableOpacity>
        }} />
  )
}

export default GameImage

const styles = StyleSheet.create({
    flatlistAnh : {
        flex : 1,
    },
    listImage : {
        //width : 300, 
        height : 180, 
        marginRight : 10,
        borderRadius : 20
    },
})