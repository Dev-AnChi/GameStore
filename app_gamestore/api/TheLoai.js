import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import color from '../contains/color';
import configApi from './configApi';

const TheLoai = () => {
    configTheLoai = configApi.theloais;

    const [theloais, setTheLoai] = useState([]);
    useEffect(() => {
        getDataTheLoai();
    }, [])

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

    return (
        <View style={styles.danhsach}>
            <FlatList
                data={theloais}
                style={styles.flatlist}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return <TouchableOpacity 
                            onPress={()=>{
                                alert(item.TenTheLoai)
                            }} 
                            >
                                <View style={styles.boxTL}>
                                    <Text style={styles.textTheloai}>{item.TenTheLoai}</Text>
                                </View>
                        </TouchableOpacity>
                }}
                horizontal
            >
            </FlatList>
        </View>
    )
}

export default TheLoai

const styles = StyleSheet.create({
    danhsach: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatlist: {
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