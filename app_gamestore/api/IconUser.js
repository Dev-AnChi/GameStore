import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from './configApi';
import axios from 'axios';
import images from '../contains/images';

const IconUser = (props) => {
    configiconuser = configApi.detailUser + props.idUser;

    const [iconuser, seticonuser] = useState([]);
    useEffect(()=>{
        getDataiconuser();
    },[])

    const getDataiconuser = () => {
        axios.get(configiconuser)
        .then( (response) => {
            var dataiconuser = response.data;
            dataiconuser.map((item, index)=>{
                seticonuser(item);
            });
        })
        .catch(function (error) {
            console.log("Loi khong lay duoc API: "  + error);
        });
    }

    var star = [];
	for(let i = 0; i < props.rate; i++){
		star.push(
			<View key = {i}>
				<Image source={images.star} style={{width : 15 , height : 18, marginRight : 10}}/>
			</View>
		)
	}
    var starNone = [];
	for(let i = 0; i < 5-props.rate; i++){
		starNone.push(
			<View key = {i}>
				<Image source={images.starNone} style={{width : 15 , height : 18, marginRight : 10}}/>
			</View>
		)
	}

  return (
    <View style={styles.user}>
      <Image source={{uri : 'http://192.168.101.35/Images/'+iconuser.AnhDaiDien}} style={{width : 60, height : 60, borderRadius : 100}}/>
      <View>
        <Text style={styles.textname}>{iconuser.TenNguoiDung }<Text style={{fontWeight : 'normal', fontSize : 14}}>{" <" + iconuser.Email + "> "}</Text></Text>
        <View style={{flexDirection : 'row', marginLeft : 10}}>
            {star}
            {starNone}
        </View>
      </View>
    </View>
  )
}

export default IconUser

const styles = StyleSheet.create({
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
    }
})