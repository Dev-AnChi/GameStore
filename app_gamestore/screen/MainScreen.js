import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, ImageBackground, TextInput, FlatList, RefreshControl, BackHandler, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import color from '../contains/color';
//import TheLoai from '../api/TheLoai';
import images from '../contains/images';
//import Game from '../api/Game';
import axios from 'axios';
import ItemGame from '../api/ItemGame';
import configApi from '../api/configApi';
import DownloadBtn from '../api/DownloadBtn';

function MainScreen({ navigation, route }) {
    var idUser = route.params.idUser;
    const [show, setShow] = useState(false);
    const [isFilter, setisFilter] = useState('');
    const [textfilter, settextfilter] = useState('');
    //get full game
    configGame = configApi.games;
    const [games, setGame] = useState([]);
    useEffect(() => {
        getDataGame();
        getDataTheLoai();

        const backAction = () => {
            Alert.alert("Thông báo", "Bạn có chắc chắn muốn thoát ứng dụng này không ?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
    }, [])

    const getDataGame = () => {
        axios.get(configGame)
            .then((response) => {
                var dataGame = response.data;
                setGame(dataGame);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    //get find game by name
    configfindGame = '';
    const getDatafindGame = () => {
        axios.get(configfindGame)
            .then((response) => {
                var datafindGame = response.data;
                setGame(datafindGame);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    //get full thể loại
    configTheLoai = configApi.theloais;

    const [theloais, setTheLoai] = useState([]);
    const getDataTheLoai = () => {
        axios.get(configTheLoai)
            .then((response) => {
                var dataTheLoai = response.data;
                setTheLoai(dataTheLoai);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    //get find game by ID_TheLoai
    configfilterTheLoai = '';
    const getDatafilterTheLoai = () => {
        axios.get(configfilterTheLoai)
            .then((response) => {
                var datafilterTheLoai = response.data;
                setGame(datafilterTheLoai);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }

    //top Luot Tai
    configtopLuotTai = configApi.topLuottai;
    const getDatatopLuotTai = () => {
        axios.get(configtopLuotTai)
            .then((response) => {
                var datatopLuotTai = response.data;
                setGame(datatopLuotTai);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }

    //top Danh Gia
    configtopDanhGia = configApi.topDanhGia;
    const getDatatopDanhGia = () => {
        axios.get(configtopDanhGia)
            .then((response) => {
                var datatopDanhGia = response.data;
                setGame(datatopDanhGia);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }

    //game Free
    configgameFree = configApi.gameFree;
    const getDatagameFree = () => {
        axios.get(configgameFree)
            .then((response) => {
                var datagameFree = response.data;
                setGame(datagameFree);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }

    //topLuot Tai
    configtopGiaTien = configApi.topGiaTien;
    const getDatatopGiaTien = () => {
        axios.get(configtopGiaTien)
            .then((response) => {
                var datatopGiaTien = response.data;
                setGame(datatopGiaTien);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API: " + error);
            });
    }
    

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
            style={styles.keyboard}
        >
            <ImageBackground source={{uri:images.backgroundLogin}} style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <View style={styles.wellcome}>
                            <Image source={{uri:images.logoGame}} style={styles.logoGame} />
                            <Text style={styles.textWellcome}>GameStore</Text>
                        </View>
                        {/* tim kiem */}
                        <View style={styles.boxfilter}>
                            {show && <TextInput style={styles.inputsearch} 
                                onChangeText={
                                    (text) => {
                                        settextfilter(text);
                                        if(text==''){
                                            setisFilter('');
                                            setGame([]);
                                            getDataGame();
                                        }else{
                                            setisFilter('Kết quả tìm kiếm');
                                            configfindGame = configApi.findGame + text;
                                            setGame([]);
                                            getDatafindGame();
                                        }
                                    }} 
                                keyboardShouldPersistTaps    
                                placeholder='Nhập tên game' value={textfilter}/>}
                            {!show && <TouchableOpacity style={styles.search} 
                                onPress={() => {
                                    setShow(!show)
                                }} >
                                <Image style={styles.imgSearch}
                                    resizeMode='cover'
                                    source={{uri:images.search}}/>
                                </TouchableOpacity>}
                            {show && <TouchableOpacity
                                onPress={() => {
                                    setShow(!show);
                                    settextfilter('');
                                    setisFilter('');
                                    setGame([]);
                                    getDataGame();
                                }} >
                                <Image source={{uri:images.cancel}} style={styles.imgSearch}
                                    resizeMode='cover'/>
                            </TouchableOpacity>}
                        </View>
                    </View>

                    {/* the loai */}
                    <View style={styles.danhsach}>
                        <FlatList
                            data={theloais}
                            style={styles.flatlistTL}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return <TouchableOpacity 
                                        onPress={()=>{
                                            setisFilter(item.TenTheLoai);
                                            configfilterTheLoai = configApi.filterTheLoai + item.ID_Loai;
                                            setGame([]);
                                            getDatafilterTheLoai();
                                        }} 
                                        >
                                            <View style={{
                                                //styles.boxTL
                                                flex : 1,
                                                marginHorizontal : 15, 
                                                marginTop : 10,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderBottomWidth : isFilter == item.TenTheLoai ? 4 : 0,
                                                borderBottomColor : isFilter == item.TenTheLoai ? 'red' : ''
                                            }}>
                                                <Text style={{
                                                    //styles.textTheloai
                                                    flex: 1,
                                                    color: isFilter == item.TenTheLoai ? 'red' : color.textColor,
                                                    fontSize: 18,
                                                    fontWeight: 'bold',
                                                    justifyContent : 'center',
                                                    alignItems : 'center',
                                                }}>{item.TenTheLoai}</Text>
                                            </View>
                                    </TouchableOpacity>
                            }}
                            horizontal
                        >
                        </FlatList>
                    </View>
                    {/* thong ke */}
                    <View style={styles.boxTK}>
                        <ScrollView horizontal style={{ flex: 1 }}>
                            <TouchableOpacity onPress={()=>{
                                setisFilter('Top lượt tải');
                                setGame([]);
                                getDatatopLuotTai();
                            }} 
                            style={styles.thongke}
                            >
                                <View style={styles.itemTaiXuong}>
                                    <Image source={{uri:images.cups}} style={{ width: 40, height: 40, margin: 15 }} />
                                </View>
                                <View><Text style={styles.textTK}>Top lượt tải</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=>{
                                setisFilter('Top đánh giá');
                                setGame([]);
                                getDatatopDanhGia();
                            }}     
                            style={styles.thongke}
                            >
                                <View style={styles.itemDanhGia}>
                                    <Image source={{uri:images.check}} style={{ width: 40, height: 40, margin: 15 }} />
                                </View>
                                <View><Text style={styles.textTK}>Top đánh giá</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=>{
                                setisFilter('Game miễn phí');
                                setGame([]);
                                getDatagameFree();
                            }} 
                            style={styles.thongke}>
                                <View style={styles.itemMienPhi}>
                                    <Image source={{uri:images.free}} style={{ width: 40, height: 40, margin: 15 }} />
                                </View>
                                <View><Text style={styles.textTK}>Miễn phí</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=>{
                                setisFilter('Game có giá cao nhất');
                                setGame([]);
                                getDatatopGiaTien();
                            }} 
                            style={styles.thongke}>
                                <View style={styles.itemGiaCaoNhat}>
                                    <Image source={{uri:images.money}} style={{ width: 40, height: 40, margin: 15 }} />
                                </View>
                                <View><Text style={styles.textTK}>Giá cao nhất</Text></View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                </View>

                <View style={{ borderLeftWidth: 4, borderLeftColor: 'red', marginBottom: 10, flexDirection : 'row' }}>
                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>
                        {isFilter == '' ? "Danh sách game" : isFilter}
                    </Text>
{/* {isFilter != '' && */}<TouchableOpacity style={{marginLeft : 20}} 
                                onPress={() => {
                                    setShow(false);
                                    settextfilter('');
                                    setisFilter('');
                                    setGame([]);
                                    getDataGame();
                                }} >
                                <Image source={{uri: isFilter != '' ? images.cancel : images.reload}} style={styles.imgSearch}
                                    resizeMode='cover'/>
                            </TouchableOpacity>{/*}*/}
                </View>
                {/* game */}
                <View style={styles.body}>
                    {games.length == 0 && 
                        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={{color : 'red', fontSize : 20}}>Không tìm thấy kết quả nào</Text>
                        </View>
                    }
                    <FlatList
                        data={games}
                        style={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        // refreshControl={<RefreshControl refreshing={true} onRefresh={getDataGame()} />}
                        renderItem={({ item }) => {
                            return <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('DetailScreen', { idGame: item.ID_Game, idUser: idUser }) 
                                    // refresh: function(){getDataGame()}
                                }>
                                <View style={styles.boxGame}>
                                    <ItemGame idGame={item.ID_Game} />
                                    <View style={styles.rightbox}>
                                        <View style={styles.boxdownload}>
                                            <View style={
                                                styles.btndownload
                                            }>
                                                <DownloadBtn idGame={item.ID_Game} idUser={idUser} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }}
                    />
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>

    )
}

export default MainScreen

const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    header: {
        flex: 5,
    },
    body: {
        flex: 8,

    },
    title: {
        flex: 1,
        flexDirection: "row",
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15
    },

    boxTK: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thongke: {
        flex: 1,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTaiXuong: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#ff9900'
    },
    itemDanhGia: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#0033cc'
    },
    itemMienPhi: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#009933'
    },
    itemGiaCaoNhat: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#cc3300'
    },
    textTK: {
        fontWeight: 'bold',
        color: 'black'
    },

    wellcome: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor : 'red'
    },
    logoGame: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        color: 'black'
    },
    textWellcome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        marginLeft: 5
    },
    boxfilter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor : 'blue'
    },
    inputsearch: {
        flex: 2,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    },
    search: {
        //flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    imgSearch: {
        width: 30,
        height: 30,
    },

    func: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    sizeMenu: {
        width: 25,
        height: 25
    },
    textMenu: {
        color: 'black'
    },


    
    flatlist: {
        flex: 1,
    },
    boxGame: {
        flex: 1,
        flexDirection: 'row',
    },
    rightbox: {
        flex: 4,
    },
    boxdownload: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btndownload: {
        //backgroundColor: 'green',
        width: 100,
        height: 30,
        borderRadius : 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    danhsach: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flatlistTL: {
        flex: 1,
        borderBottomWidth : 1,
        borderBottomColor : 'grey',
    },
    boxTL: {
        flex : 1,
        marginHorizontal : 15, 
        marginTop : 10,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    textTheloai: {
        flex: 1,
        color: color.textColor,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent : 'center',
        alignItems : 'center',
    },

})