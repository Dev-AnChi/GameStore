import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import images from '../contains/images';
import configApi from './configApi';

function Game(props){
    configGame = configApi.games;

    // const {navigation, route} = props.props;
    // const {navigate, goBack} = navigation;

    const [games, setGame] = useState([]);
    useEffect(()=>{
        getDataGame();
    },[])
    
    const getDataGame = () => {
        axios.get(configGame)
        .then( (response) => {
            var dataGame = response.data;
            setGame(dataGame);
        })
        .catch(function (error) {
            console.log("Loi khong lay duoc API: "  + error);
        });
    }
  return (
        <FlatList
            data={games}
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                return <TouchableOpacity 
                        onPress={()=>
                            props.navigation.navigate('DetailScreen', {idGame : item.ID_Game})
                        }>
                            <View style={styles.boxGame}>
                                <View style={styles.leftbox}>
                                    <Image source={{uri: 'http://192.168.101.35/Images/'+item.Logo_Game}} resizeMode='cover'
                                    style={{width: 80, height: 80, borderRadius: 18}} />
                                    <View style={styles.boxThongTin}>
                                        <View style={{flex : 1}}>
                                            <Text style={{color : 'black', fontSize : 20 }}>{item.Ten_Game}</Text> 
                                            <Text style={{color : 'gray', fontSize : 14}}>{item.Ten_NhaSanXuat}</Text>
                                        </View>
                                        
                                        <View style={{flex: 1, flexDirection : 'row', fontSize : 15}}>
                                            <View style={styles.boxDetails}>
                                                <Text style={{color : 'black'}}>{item.Gia.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Text><View style={{justifyContent:'flex-start'}}><Text style={{color : 'orange', fontWeight: 'bold', fontSize : 10}}> đ</Text></View>
                                            </View>
                                            <View style={styles.boxDetails}>
                                                <Image source={images.star} style={{width : 18, height : 18}}/>
                                                <Text style={{color : 'black'}}> {item.DanhGiaTB.toFixed(1)}</Text>
                                            </View>
                                            <View style={styles.boxDetails}>
                                                <Image source={images.icondownload} style={{width : 18, height : 18}}/>
                                                <Text style={{color : 'black'}}> {item.LuotTaiXuong.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.rightbox}>
                                    <TouchableOpacity style={styles.boxdownload}
                                        onPress={()=>{
                                            alert('Tải game thành công');
                                        }} 
                                    >
                                        <View style={styles.btndownload}>
                                            <Text style={{color:'white'}}>Tải</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </TouchableOpacity>
            }}
        />
  )
}

export default Game

const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
    },
    boxGame: {
        flex : 1,
        flexDirection : 'row',
    },
    leftbox : {
        flex : 8,
        alignItems: 'center',
        flexDirection : 'row',
        marginHorizontal : 10,
        marginVertical : 10
    },
    rightbox : {
        flex : 2,
    },
    boxThongTin :{
        flex : 1,
        marginLeft : 15
    },
    boxDetails : {
        flexDirection : 'row',
        marginRight : 20,
    },

    boxdownload : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    btndownload : {
        backgroundColor : '#003300',
        width : 60,
        height : 30,
        borderRadius : 5,
        alignItems : 'center',
        justifyContent : 'center',
    }
})