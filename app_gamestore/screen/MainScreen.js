import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, ImageBackground, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import color from '../contains/color';
import TheLoai from '../api/TheLoai';
import images from '../contains/images';
//import Game from '../api/Game';
import axios from 'axios';
import ItemGame from '../api/ItemGame';
import configApi from '../api/configApi';
import DownloadBtn from '../api/DownloadBtn';

function MainScreen({ navigation, route }) {
    var idUser = route.params.idUser;
    const [show, setShow] = useState(false);

    configGame = configApi.games;
    const [games, setGame] = useState([]);
    useEffect(() => {
        getDataGame();
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
            style={styles.keyboard}
        >
            <ImageBackground source={images.backgroundLogin} style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <View style={styles.wellcome}>
                            <Image source={images.logoGame} style={styles.logoGame} />
                            <Text style={styles.textWellcome}>GameStore</Text>
                        </View>

                        <View style={styles.boxfilter}>
                            {show && <TextInput style={styles.inputsearch} placeholder='Nhập tên game' />}
                            {!show && <TouchableOpacity style={styles.search} onPress={() => {
                                setShow(!show)
                            }} >
                                <Image style={styles.imgSearch}
                                    resizeMode='cover'
                                    source={{ uri: images.search, }} />
                            </TouchableOpacity>}
                            {show && <TouchableOpacity
                                style={{
                                    backgroundColor: '#000066',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    height: '100%',
                                    justifyContent: 'center',
                                    marginLeft: 5
                                }}
                                onPress={() => {
                                    setShow(!show)
                                }} >
                                <Text style={{ color: 'white', fontWeight: '500' }}>Tìm kiếm</Text>
                            </TouchableOpacity>}
                            <View></View>
                        </View>


                    </View>
                    <TheLoai />

                    <View style={styles.boxTK}>
                        <ScrollView horizontal style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.thongke}>
                                <View style={styles.itemTaiXuong}>
                                    <Image source={images.cups} style={{ width: 40, height: 40, margin: 15 }} />
                                </View>
                                <View><Text style={styles.textTK}>Top lượt tải</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.thongke}>
                                <View style={styles.itemDanhGia}>
                                    <Image source={images.check} style={{ width: 40, height: 40, margin: 15 }} />
                                </View>
                                <View><Text style={styles.textTK}>Top đánh giá</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.thongke}>
                                <View style={styles.itemMienPhi}>
                                    <Image source={images.free} style={{ width: 40, height: 40, margin: 15 }} />
                                </View>
                                <View><Text style={styles.textTK}>Miễn phí</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.thongke}>
                                <View style={styles.itemGiaCaoNhat}>
                                    <Image source={images.money} style={{ width: 40, height: 40, margin: 15 }} />
                                </View>
                                <View><Text style={styles.textTK}>Giá cao nhất</Text></View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                </View>
                <View style={{ borderLeftWidth: 4, borderLeftColor: 'red', marginBottom: 10 }}>
                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Danh sách game</Text>
                </View>
                <View style={styles.body}>
                    {/* <Game navigation={navigation}/> */}
                    <FlatList
                        data={games}
                        style={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('DetailScreen', { idGame: item.ID_Game, idUser: idUser })
                                }>
                                <View style={styles.boxGame}>
                                    <ItemGame idGame={item.ID_Game} />
                                    <View style={styles.rightbox}>
                                        <TouchableOpacity style={styles.boxdownload}
                                            onPress={() => {
                                                alert('Tải game thành công');
                                            }}
                                        >
                                            <View style={
                                                styles.btndownload
                                            }>
                                                <DownloadBtn idGame={item.ID_Game} idUser={idUser} />
                                            </View>
                                        </TouchableOpacity>
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
        flex: 6,
    },
    body: {
        flex: 10,

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
        marginLeft: 10
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
        alignItems: 'center',
        justifyContent: 'center',
    }

})