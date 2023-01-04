import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';

const DownloadBtn = (props) => {
    const idGame = props.idGame;
    const idUser = props.idUser;
    //console.log(idGame + "=" + idUser)

    const [colorBtnDownload, setcolorBtnDownload] = useState('');
    const [checkdatai, setcheckdatai] = useState('');
    useEffect(() => {
        getDatacheckdatai();
    }, [])

    const getDatacheckdatai = async () => {
        await axios.get(configApi.checkDaTai + idUser + '/' + idGame)
            .then((response) => {
                var datacheckdatai = response.data;
                setcheckdatai(datacheckdatai);
                datacheckdatai == 'error' ? setcolorBtnDownload('green') : setcolorBtnDownload('red');
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    return (
        <View style={{
            backgroundColor: colorBtnDownload,
            width: '100%', height: '100%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{checkdatai == 'error' ? "Tải xuống" : "Gỡ cài đặt"}</Text>
        </View>
    )
}

export default DownloadBtn

const styles = StyleSheet.create({

})