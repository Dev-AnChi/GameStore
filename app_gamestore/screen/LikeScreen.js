import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from '../api/configApi';
import axios from 'axios';
import ItemGame from '../api/ItemGame';
import DownloadBtn from '../api/DownloadBtn';
import images from '../contains/images';

const LikeScreen = ({ navigation, route }) => {
  const idUser = route.params.idUser;
  configyeuthich = configApi.gameyeuthich + idUser;

  const [gameyeuthich, setgameyeuthich] = useState([]);
  useEffect(() => {
    getDatagameyeuthich();
  }, [])

  const getDatagameyeuthich = async () => {
    await axios.get(configyeuthich)
      .then((response) => {
        var datagameyeuthich = response.data;
        setgameyeuthich(datagameyeuthich);
      })
      .catch(function (error) {
        console.log("Loi khong lay duoc API like: " + error);
      });
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 10, flexDirection : 'row' }}>
        <Text style={{
          paddingLeft: 10, borderLeftWidth: 5, borderLeftColor: 'blue', fontSize: 20, color: 'black', fontWeight: 'bold'
        }}
        >
          Yêu thích
        </Text>
        <TouchableOpacity style={{marginLeft : 20}}
            onPress={() => {
                setgameyeuthich([]);
                getDatagameyeuthich();
            }} >
            <Image source={{uri:images.reload}} style={styles.imgSearch}
                resizeMode='cover'/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={gameyeuthich}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // refreshControl={<RefreshControl refreshing={true} onRefresh={getDatagameyeuthich()} />}
        renderItem={({ item }) => {
          return <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailScreen', { idGame: item.ID_Game, idUser: idUser })
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
  )
}

export default LikeScreen

const styles = StyleSheet.create({
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
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgSearch: {
    width: 30,
    height: 30,
  },
})