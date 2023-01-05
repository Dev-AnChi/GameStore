import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../contains/images'
import configApi from '../api/configApi';
import axios from 'axios';

const UserScreen = ({ navigation, route }) => {
  //alert(route.params.idUser);
  const idUser = route.params.idUser;
  configuser = configApi.detailUser + idUser;
  const [user, setuser] = useState([]);
  useEffect(() => {
    getDatauser();
  }, [])
  const getDatauser = async () => {
    await axios.get(configuser)
      .then((response) => {
        var datauser = response.data;
        datauser.map((item, index) => {
          setuser(item);
        });
      })
      .catch(function (error) {
        console.log("Loi khong lay duoc API: " + error);
      });
  }

  return (
    <ImageBackground source={images.backgroundLogin} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground source={images.backgroundAvatar} style={styles.top}>
          {/* <View style={{alignItems : 'flex-end', backgroundColor : 'blue'}}>
            <Image source={images.logout} style ={{width: 50, height : 50}}/>
          </View> */}
          <View style={styles.avatar}>
            <Image source={{ uri: 'http://192.168.101.35/Images/' + user.AnhDaiDien }} style={{ width: 120, height: 120, borderRadius: 100 }} />
          </View>
        </ImageBackground>
        <View style={styles.mid}>
          <View style={styles.nickname}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '400' }}>{user.NickName}</Text>
          </View>
          <View style={styles.cardinfor}>
            <ScrollView>
              <View style={styles.itemcard}>
                <View style={styles.iconitem}>
                  <Image source={images.nameUser} style={{ width: 25, height: 25 }} />
                </View>
                <Text style={styles.textitem}>
                  {user.TenNguoiDung}
                </Text>
              </View>

              <View style={styles.itemcard}>
                <View style={styles.iconitem}>
                  <Image source={images.sexUser} style={{ width: 25, height: 25 }} />
                </View>
                <Text style={styles.textitem}>
                  {user.GioiTinh == true ? "Nam" : "Nữ"}
                </Text>
              </View>

              <View style={styles.itemcard}>
                <View style={styles.iconitem}>
                  <Image source={images.email} style={{ width: 25, height: 25 }} />
                </View>
                <Text style={styles.textitem}>
                  {user.Email}
                </Text>
              </View>

              <View style={styles.itemcard}>
                <View style={styles.iconitem}>
                  <Image source={images.homeaddress} style={{ width: 25, height: 25 }} />
                </View>
                <Text style={styles.textitem}>
                  {user.DiaChi}
                </Text>
              </View>

              <View style={styles.itemcard}>
                <View style={styles.iconitem}>
                  <Image source={images.phone} style={{ width: 25, height: 25 }} />
                </View>
                <Text style={styles.textitem}>
                  {user.SDT}
                </Text>
              </View>

              <TouchableOpacity 
              onPress={()=>navigation.navigate('Login')}
              style={{justifyContent : 'center', alignItems : 'center', marginTop : 10, marginBottom : 10}}>
                <View style={{
                  width: 150,
                  height: 40,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20
                }}
                >
                  <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}>Đăng xuất</Text>
                </View>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>

        {/* <View style={styles.bottom}>
          <ScrollView>
            
          </ScrollView>
        </View> */}
      </View>

    </ImageBackground>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  mid: {
    flex: 2,
  },
  bottom: {
    flex: 1,
  },
  avatar: {
    top: 50,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: 'gray'
  },
  nickname: {
    flex: 1,
    alignItems: 'center',
    top: 55,

  },
  cardinfor: {
    flex: 3.5,
  },
  itemcard: {
    borderBottomWidth: 1,
    borderBottomColor: '#b8b894',
    flexDirection: 'row',
    margin: 10
  },
  iconitem: {
    justifyContent: 'center',
    left: 10
  },
  textitem: {
    marginLeft: 20,
    fontSize: 18,
    color: 'black',
    padding: 10
  }
})