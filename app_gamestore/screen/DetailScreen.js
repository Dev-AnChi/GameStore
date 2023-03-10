import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, ImageBackground, FlatList, ScrollView, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../contains/images'
import configApi from '../api/configApi';
import axios from 'axios';
import GameImage from '../api/GameImage';
import TheLoaiGame from '../api/TheLoaiGame';
import LikeBtn from '../api/LikeBtn';
import DownloadBtn from '../api/DownloadBtn';

const DetailScreen = ({ navigation, route }) => {
    // const {navigation, router} = navigation;
    // const {navigate, goBack} = navigation;

    const idGame = route.params.idGame;
    const idUser = route.params.idUser;

    configGame = configApi.detailGame + idGame;

    const [game, setGame] = useState([]);
    useEffect(()=>{
        getDataGame();
    },[])

    const getDataGame = async () => {
        await axios.get(configGame)
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
    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
            style={styles.keyboard}
    >
        <View style={styles.container}>
            <ImageBackground source={{uri: 'http://192.168.101.35/Images/'+game.Logo_Game}} style={styles.header}>
                <TouchableOpacity style={styles.back} 
                    onPress={
                        navigation.goBack
                    }>
                    <Image source={images.back} style={{width : 15, height : 15}}/>
                </TouchableOpacity>

                <View style={styles.icon}>
                    <Image source={{uri: 'http://192.168.101.35/Images/'+game.Logo_Game}} style={{width : 120, height : 120, borderRadius : 18}}/> 
                </View>
            </ImageBackground>
                  
            <View style={styles.body}>
                
                <View style={styles.noidung}>
                        <View style={{flex : 3, alignItems : 'flex-start'}}>
                            <TheLoaiGame idGame = {idGame}/>
                        </View>
                        
                    <View style={styles.nameGame}>
                        <Text style={{fontSize : 20, fontWeight : 'bold', color : 'black'}}>{game.Ten_Game}</Text>
                        <Text style={{fontSize : 15}}>{game.Ten_NhaSanXuat}</Text>
                        <Text style={{fontSize : 15}}>Gi?? : <Text style={{color : 'red'}}>
                            {game.Gia ? game.Gia.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : game.Gia} ??
                        </Text></Text>
                    </View>

                        <View style={{flex : 3, alignItems : 'flex-end', justifyContent : 'flex-start', marginTop : -50}}>
                            
                                <LikeBtn idGame={idGame} idUser={idUser}/>
                        </View>
                </View>
                
                <ScrollView >

                <View style={styles.thongtinchitiet}>
                    <View style={styles.boxDetails}>
                        <Image source={images.star} style={styles.sizeIcon}/>
                        <Text style={styles.textTT}>{game.DanhGiaTB? game.DanhGiaTB.toFixed(1) : game.DanhGiaTB} sao</Text>
                    </View>
                    <View style={styles.boxDetails}>
                        <Image source={images.icondownload} style={styles.sizeIcon}/>
                        <Text style={styles.textTT}>{game.LuotTaiXuong ? game.LuotTaiXuong.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : game.LuotTaiXuong} l?????t t???i</Text>
                    </View>
                    <View style={styles.boxDetails}>
                        <Image source={images.age} style={styles.sizeIcon}/>
                        <Text style={styles.textTT}>{game.GioiHan_Tuoi} tu???i</Text>
                    </View>
                    <View style={styles.boxDetails}>
                        <Image source={images.memory} style={styles.sizeIcon}/>
                        <Text style={styles.textTT}>250 MB</Text>
                    </View>
                </View>

                    <GameImage idGame={idGame}/>
                    
                    <View style={{marginTop : 10}}>
                        <Text style={{fontSize : 18, color : 'black', fontWeight : 'bold'}}>Gi???i thi???u v??? tr?? ch??i n??y : </Text>
                        <View style={styles.boxMoTa}>
                            <Text style={styles.ndMoTa}>
                                {game.MoTaChiTiet}
                            </Text>
                        </View>
                        <Text style={styles.titleNormal}>- S??? hi???u phi??n b???n : <Text style={styles.textNormal}>{game.SoHieuPhienBan}</Text></Text>
                        <Text style={styles.titleNormal}>- Phi??n b???n : <Text style={styles.textNormal}>{game.PhienBan}</Text></Text>
                        <Text style={styles.titleNormal}>- Y??u c???u c???u h??nh : <Text style={styles.textNormal}>{game.YC_CauHinh}</Text></Text>
                        <Text style={styles.titleNormal}>- Ph??t h??nh v??o : <Text style={styles.textNormal}>{game.NgayTao}</Text></Text>
                        <Text style={styles.titleNormal}>- L???n c???p nh???t g???n ????y nh???t : <Text style={styles.textNormal}>{game.NgayCapNhat}</Text></Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('BinhLuanScreen', {idGame : idGame, idUser : idUser})}
                        }
                        style={{marginBottom : 10, marginTop : 20, justifyContent : 'center', alignItems : 'flex-end'}}
                    >
                        <Text style={{fontSize : 18, color : 'blue', fontWeight : 'bold'}}>Xem c??c b??i ????nh gi?? </Text>
                    </TouchableOpacity>
                    {/* <View style={{marginBottom : 10, marginTop : 20}}>
                    <Text style={{fontSize : 18, color : 'black', fontWeight : 'bold'}}>C??c b??i ????nh gi?? : </Text>
                        <BinhLuan idGame={idGame}/>
                    </View> */}
                </ScrollView>
            </View> 

            <View style={{height : 1, backgroundColor : '#b8b894'}}></View>

            <View style={styles.footer}>
                <View style={{justifyContent : 'center', alignItems : 'center', flexDirection : 'row'}}>
                    <TouchableOpacity style={styles.downBtn}>
                        <DownloadBtn idGame={idGame} idUser={idUser}/>
                    </TouchableOpacity>
                
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    keyboard : {
        flex : 1
    },
    container : {
        flex : 1,
    },
    header : {
        flex : 4,
        margin : 5,
    },
    body : {
        flex : 10,
    },
    footer : {
        flex : 1.5,
        justifyContent : 'center',
        alignItems : 'center'
    },
    back : {
        marginTop : 15,
        marginLeft : 15, 
        backgroundColor : 'grey',
        width : 40,
        height : 40, 
        justifyContent : 'center', 
        alignItems : 'center',
        borderRadius : 10,
        opacity : 0.5
    },
    icon : {
        marginTop : 40,
        alignItems : 'center',
    },
    noidung : {
        marginTop : 0,
        paddingBottom : 10,
        alignItems : 'center',
        borderBottomWidth : 1,
        borderBottomColor : '#b8b894',
        flexDirection : 'row'
    },
    nameGame : {
        flex : 5,
        marginTop : 50,
        alignItems : 'center',
    },
    thongtinchitiet : {
        flexDirection : 'row', 
        marginTop : 15,
        marginBottom : 15
    },
    boxDetails : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },
    sizeIcon : {
        width : 25, 
        height : 25
    },
    textTT : {
        fontSize : 15,
        color : 'black',
        fontWeight : 'normal',
        marginTop : 5
    },

    downBtn : {
        backgroundColor : '#003300', 
        borderRadius : 20, 
        height : 40,
        width : 250,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 5
    },
    textBtnDown : {
        color : 'white',
        fontWeight : 'bold',
        fontSize : 15
    },
    
    titleNormal : {
        fontSize : 15, 
        color : 'black', 
        fontWeight : '400', 
        marginLeft : 10,
        marginVertical : 5
    },
    boxMoTa : {
        margin : 10,
        borderWidth : 1,
        borderColor : 'grey',
        borderRadius : 20,
        
    },
    ndMoTa : {
        color : 'back',
        fontWeight : 'normal',
        margin : 10
    },
    textNormal : {
        color : 'black',
        marginLeft : 20,
        marginTop : 10,
        marginRight : 10,
        fontWeight : 'normal'
    }
})