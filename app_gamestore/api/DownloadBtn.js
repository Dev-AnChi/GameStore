import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';
import { Linking } from 'react-native';
//import { Navigation } from 'react-native-navigation';


const DownloadBtn = (props) => {
    const idGame = props.idGame;
    const idUser = props.idUser;
    //console.log(idGame + "=" + idUser)

    //const [ApkLink, setApkLink] = useState('');
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
                console.log("Loi khong lay duoc API getcheckdatai: " + error);
            });
    }

    //mở trình duyệt chứa file
    openApkUrl = (url) => {
        Linking.openURL(url)
          .catch((error) => {
            console.error(error);
          });
      };
    const getlinkDownLoad = async () => {
        await axios.get(configApi.linkDownload + idGame)
        .then((response) => {
            var apkUrl = response.data[0].LinkTaiGame;
            this.openApkUrl(apkUrl);
            //console.log(apkUrl);
            //setApkLink(apkUrl);
        })
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
                console.log("Loi khong lay duoc API updateluottai: " + error);
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
                console.log("Loi khong lay duoc API gocaidat: " + error);
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
                    getlinkDownLoad();
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