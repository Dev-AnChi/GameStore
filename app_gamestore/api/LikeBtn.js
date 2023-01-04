import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';
import images from '../contains/images';

const LikeBtn = (props) => {
    const idGame = props.idGame;
    const idUser = props.idUser;
    console.log(idGame + "=" + idUser)

    const [checkYeuthich, setcheckYeuthich] = useState('');
    useEffect(()=>{
        getDatacheckYeuthich();
    },[])

    const getDatacheckYeuthich = async () => {
        await axios.get(configApi.checkYeuThich + idUser + '/' + idGame)
        .then( (response) => {
            var datacheckYeuthich = response.data;
            setcheckYeuthich(datacheckYeuthich);
        })
        .catch(function (error) {
            console.log("Loi khong lay duoc API: "  + error);
        });
    }
  return (
    <Image source={checkYeuthich=='error' ? images.heart : images.heartred} style={{width : 20, height : 20}}/>
  )
}

export default LikeBtn

const styles = StyleSheet.create({})