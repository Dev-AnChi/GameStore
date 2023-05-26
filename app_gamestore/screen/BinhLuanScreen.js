import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import images from '../contains/images';
import configApi from '../api/configApi';

const BinhLuanScreen = ({ navigation, route }) => {
    const idGame = route.params.idGame;
    const idUser = route.params.idUser;

    configbinhluan = configApi.binhluangame + idGame;

    const [danhgia, setdanhgia] = useState(0);
    const [noidung, setnoidung] = useState('');
    const [isSubmit, setisSubmit] = useState(false);
    const [checkBL, setcheckBL] = useState(false);

    const [binhluan, setbinhluan] = useState([]);
    const [findBL, setfindBL] = useState([]);

    useEffect(() => {
        getDatabinhluan();
        findBinhLuan();
    }, [])

    const getDatabinhluan = () => {
        axios.get(configbinhluan)
            .then((response) => {
                var databinhluan = response.data;
                setbinhluan(databinhluan);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API dataBL: " + error);
            });
    }


    //them binh luan
    const addBinhLuan = async () => {
        //console.log(danhgia + '--' + noidung + '--' + idGame + '--' + idUser)
        await axios.post(configApi.BinhLuan, {
            DanhGia:danhgia,
            NoiDungBL:noidung,
            NgayBinhLuan:'',
            ID_NguoiBinhLuan: idUser,
            ID_Game: idGame
        })
            .then((response) => {
                //console.log(response);
                updateDanhGia();
                getDatabinhluan();
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API addBL: " + error);
            });
    }

    //check binh luan
    const findBinhLuan = () => {
        axios.get(configApi.findBinhLuan + idGame + "/" + idUser)
            .then((response) => {
                var findBL = response.data;
                setcheckBL(findBL.length == 0 ? false : true);
                setfindBL(findBL);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API checkBL: " + error);
            });
    }
    //edit binh luan
    const editBinhLuan = async () => {
        //console.log(danhgia + '--' + noidung + '--' + idGame + '--' + idUser)
        await axios.put(configApi.BinhLuan, {
            ID_BinhLuan:findBL[0].ID_BinhLuan,
            DanhGia:danhgia,
            NoiDungBL:noidung,
            NgayBinhLuan:'',
            ID_NguoiBinhLuan: idUser,
            ID_Game: idGame
        })
            .then((response) => {
                //console.log(response);
                updateDanhGia();
                getDatabinhluan();
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API edit binhluan: " + error);
            });
    }

    //update danh gia
    const updateDanhGia = async () => {
        await axios.get(configApi.updateDanhGia + idGame)
            .then((response) => {
                //console.log(response);
            })
            .catch(function (error) {
                console.log("Loi khong lay duoc API danhgia: " + error);
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.back} 
                    onPress={
                        navigation.goBack
                    }>
                <Image source={{uri:images.back}} style={{width : 15, height : 15}}/>
            </TouchableOpacity>
            <View style={{ margin: 10, flexDirection: 'row' }}>
                <Text style={{
                    paddingLeft: 10, borderLeftWidth: 5, borderLeftColor: 'blue', fontSize: 20, color: 'black', fontWeight: 'bold'
                }}
                >
                    Danh sách các bài đánh giá
                </Text>
                <TouchableOpacity style={{ marginLeft: 20 }}
                    onPress={() => {
                        getDatabinhluan();
                    }} >
                    <Image source={{uri:images.reload}} style={{ width: 30, height: 30 }}
                        resizeMode='cover' />
                </TouchableOpacity>
            </View>

            <FlatList
                data={binhluan}
                style={styles.flatlistBinhLuan}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    //in số sao
                    var star = [];
                    for(let i = 0; i < item.DanhGia; i++){
                        star.push(
                            <View key = {i}>
                                <Image source={{uri:images.star}} style={{width : 15 , height : 15, marginRight : 10}}/>
                            </View>
                        )
                    }
                    var starNone = [];
                    for(let i = 0; i < 5-item.DanhGia; i++){
                        starNone.push(
                            <View key = {i}>
                                <Image source={{uri:images.starNone}} style={{width : 15 , height : 15, marginRight : 10}}/>
                            </View>
                        )
                    }
                    return <View>
                        <View style={styles.user}>
                            <View style={{borderWidth : 1, borderRadius : 100}}>
                                <Image source={{ uri: configApi.localhostIMG + item.AnhDaiDien }} style={{ width: 60, height: 60, borderRadius: 100 }} />
                            </View>
                            <View>
                                <Text style={styles.textname}>{item.NickName}</Text>
                                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                    {star}
                                    {starNone}
                                </View>
                            </View>
                        </View>

                        <View style={styles.boxBinhluan}>
                            <Text style={{ color: 'gray', marginLeft: 10 }}>{item.NgayBinhLuan}</Text>

                            <Text style={{ margin: 10, color: 'black' }}>{item.NoiDungBL}</Text>
                        </View>
                    </View>
                }} />
            <View>
                <Text style={{color : 'black', fontSize : 18, fontWeight : 'bold', borderLeftWidth : 5, paddingLeft : 10, borderLeftColor : 'blue'}}>Thêm đánh giá</Text>
                <View style={{margin : 10, flexDirection : 'row'}}>
                    <TouchableOpacity onPress={()=>{setdanhgia(1)}} style={styles.starDanhGia}>
                        <Image source={{uri:danhgia>=1 ? images.star : images.starNone}} style={{width : 25 , height : 25, marginRight : 15}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setdanhgia(2)}} style={styles.starDanhGia}>
                        <Image source={{uri:danhgia>=2 ? images.star : images.starNone}} style={{width : 25 , height : 25, marginRight : 15}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setdanhgia(3)}} style={styles.starDanhGia}>
                        <Image source={{uri:danhgia>=3 ? images.star : images.starNone}} style={{width : 25 , height : 25, marginRight : 15}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setdanhgia(4)}} style={styles.starDanhGia}>
                        <Image source={{uri:danhgia>=4 ? images.star : images.starNone}} style={{width : 25 , height : 25, marginRight : 15}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setdanhgia(5)}} style={styles.starDanhGia}>
                        <Image source={{uri:danhgia>=5 ? images.star : images.starNone}} style={{width : 25 , height : 25, marginRight : 15}}/>
                    </TouchableOpacity>
                </View>
                <TextInput 
                    onChangeText={(text)=>{
                        setisSubmit(false);
                        setnoidung(text);
                    }}
                    value={isSubmit ? '' : noidung}
                    style={styles.inputbinhluan} 
                    placeholder='Nhập nội dung bình luận' 
                    multiline
                    numberOfLines={10}
                />
                <View style={{
                    justifyContent : 'center', 
                    alignItems : 'flex-end', 
                    marginRight : 10, 
                    marginBottom : 10
                }}>
                    <TouchableOpacity 
                        onPress={()=>{
                            if(noidung != '' && danhgia != 0){
                                checkBL ? editBinhLuan() : addBinhLuan();
                                getDatabinhluan();
                                setdanhgia(0);
                                setbinhluan('');
                                setisSubmit(true);
                                Keyboard.dismiss();
                                alert('Đánh giá đã được gửi !');
                            }
                            else{
                                alert('Bạn cần nhập đầy đủ đánh giá và nội dung bình luận !')
                            }
                        }}
                        style={styles.btnBinhLuan}>
                        <Text style={{color : 'white'}}>Gửi đánh giá</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default BinhLuanScreen

const styles = StyleSheet.create({
    flatlistBinhLuan : {
        flex : 1,
        margin : 10,

    },
    boxBinhluan : {
        marginLeft : 80,
        marginTop : -10,
        borderWidth : 1,
        borderColor : '#ebebe0',
        borderTopStartRadius : 0,
        borderRadius : 20,
        backgroundColor : '#d6d6c2',
    },
    user : {
        flexDirection : 'row',
        marginLeft : 10,
        marginTop : 10
    },
    textname : {
        marginLeft : 10,
        fontSize : 18,
        fontWeight : '500',
        color : 'black'
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
    inputbinhluan : {
        borderWidth : 1,
        borderRadius : 10,
        margin : 10,
        height : 80,
        padding : 20,
        justifyContent : 'flex-start',
        textAlignVertical: 'top'
    },
    btnBinhLuan : {
        backgroundColor : 'blue',
        width : 100,
        height : 30,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 10
    }
})