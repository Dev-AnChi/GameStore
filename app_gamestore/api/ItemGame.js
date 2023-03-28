import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import images from '../contains/images';
import configApi from './configApi';

const ItemGame = (props) => {
    const idGame = props.idGame;

    const [game, setGame] = useState([]);
    useEffect(()=>{
        getDataGame();
    },[])

    const getDataGame = async () => {
        await axios.get(configApi.detailGame + idGame)
        .then( (response) => {
            var dataGame = response.data;
            dataGame.map((item, index)=>{
                setGame(item);
            });
        })
        .catch(function (error) {
            console.log("Loi khong lay duoc API: "  + error);
        });
    }
  return (
        <View style={styles.leftbox}>
          <Image source={{ uri: configApi.localhostIMG + game.Logo_Game }} resizeMode='cover'
            style={{ width: 80, height: 80, borderRadius: 18 }} />
          <View style={styles.boxThongTin}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'black', fontSize: 20 }}>{game.Ten_Game}</Text>
              <Text style={{ color: 'gray', fontSize: 14 }}>{game.Ten_NhaSanXuat}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', fontSize: 15 }}>
              <View style={styles.boxDetails}>
                <Text style={{ color: 'red' }}>{game.Gia ? game.Gia.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : game.Gia}</Text><View style={{ justifyContent: 'flex-start' }}><Text style={{ color: 'red', fontWeight: 'bold', fontSize: 10 }}> đ</Text></View>
              </View>
              <View style={styles.boxDetails}>
                <Image source={images.star} style={{ width: 18, height: 18 }} />
                <Text style={{ color: 'black' }}> {game.DanhGiaTB ? game.DanhGiaTB.toFixed(1) : game.DanhGiaTB}</Text>
              </View>
              <View style={styles.boxDetails}>
                <Image source={images.icondownload} style={{ width: 18, height: 18 }} />
                <Text style={{ color: 'black' }}> {game.LuotTaiXuong  ? game.LuotTaiXuong.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : game.LuotTaiXuong} </Text>
              </View>
            </View>
          </View>
        </View>
      )
}

export default ItemGame

const styles = StyleSheet.create({

    leftbox : {
        flex : 8,
        alignItems: 'center',
        flexDirection : 'row',
        marginHorizontal : 10,
        marginVertical : 10
    },
    
    boxThongTin :{
        flex : 1,
        marginLeft : 15
    },
    boxDetails : {
        flexDirection : 'row',
        marginRight : 20,
    },
})