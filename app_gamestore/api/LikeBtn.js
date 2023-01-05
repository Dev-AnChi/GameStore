import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';
import images from '../contains/images';

const LikeBtn = (props) => {
    const idGame = props.idGame;
    const idUser = props.idUser;
    //console.log(idGame + "=" + idUser)

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


    //yeu thich
    const likeGame = async () => {
        await axios.post(configApi.addYeuThich, {
            NgayThich:"",
            ID_NguoiDung:idUser,
            ID_Game:idGame
        })
            .then((response) => {
                //console.log(response);
                getDatacheckYeuthich();
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    //go cai dat
    const deleteYeuThich = async () => {
        await axios.delete(configApi.deleteYeuThich+checkYeuthich)
            .then((response) => {
                //console.log(response);
                setcheckdatai('error');
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }

  return (
    <TouchableOpacity style={styles.likeBtn} onPress={()=>{
            if(checkYeuthich == 'error'){
                likeGame();
                alert("Đã thêm vào danh sách yêu thích !!");
            }
            else{ 
                deleteYeuThich();
                alert("Đã xóa khỏi danh sách yêu thích !!");
            }
            getDatacheckYeuthich();
        } 
    }>
        <Image source={checkYeuthich=='error' ? images.heart : images.heartred} style={{width : 20, height : 20}}/>
    </TouchableOpacity>
  )
}

export default LikeBtn

const styles = StyleSheet.create({
    likeBtn : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 40,
        width : 40,
        borderColor : 'black',
        borderWidth : 1,
        borderRadius : 20,
        marginRight : 10,
        marginTop : 10
    },
})