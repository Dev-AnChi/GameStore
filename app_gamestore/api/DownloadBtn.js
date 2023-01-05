import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';

const DownloadBtn = (props) => {
    const idGame = props.idGame;
    const idUser = props.idUser;
    //console.log(idGame + "=" + idUser)

    const [checkdatai, setcheckdatai] = useState('');
    useEffect(() => {
        getDatacheckdatai();
    }, [])

    const getDatacheckdatai = async () => {
        await axios.get(configApi.checkDaTai + idUser + '/' + idGame)
            .then((response) => {
                var datacheckdatai = response.data;
                setcheckdatai(datacheckdatai);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }

    //tải game
    const downloadGame = async () => {
        await axios.post(configApi.downloadGame, {
            CapNhat:false,
            NgayTai:"",
            ID_NguoiDung:idUser,
            ID_Game:idGame
        })
            .then((response) => {
                //console.log(response);
                updateLuotTai();
                getDatacheckdatai();
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    //update luot tai 
    const updateLuotTai = async () => {
        await axios.get(configApi.updateLuotTai + idGame)
            .then((response) => {
                //console.log(response);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    //go cai dat
    const deleteGame = async () => {
        await axios.delete(configApi.deleteGame+checkdatai)
            .then((response) => {
                //console.log(response);
                setcheckdatai('error');
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    return (
        <TouchableOpacity 
            style={{
                width: '100%', height: '100%',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: checkdatai == 'error' ? 'green' : 'red',
            }}
            onPress={() => {
                //getDatacheckdatai();
                if(checkdatai == 'error'){
                    downloadGame();
                    alert("Cài đặt thành công !!");
                }
                else{ 
                    deleteGame();
                    alert("Gỡ cài đặt thành công !!");
                }
                getDatacheckdatai();
            }}
        >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{checkdatai == 'error' ? "Tải xuống" : "Gỡ cài đặt"}</Text>
        </TouchableOpacity>
    )
}

export default DownloadBtn

const styles = StyleSheet.create({

})