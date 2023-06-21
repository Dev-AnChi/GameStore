import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import configApi from '../api/configApi';
import axios from 'axios';
import ItemGame from '../api/ItemGame';
import DownloadBtn from '../api/DownloadBtn';
import images from '../contains/images';

const DownloadScreen = ({ navigation, route }) => {
  const idUser = route.params.idUser;

   //refresh control
   const [refreshing, setRefreshing] = React.useState(false);
   const onRefresh = React.useCallback(() => {
       setGamedatai([]);
       getDataGamedatai();
       setRefreshing(true);
       setTimeout(() => {
       setRefreshing(false);
       }, 2000);
   }, []);


  configGamedatai = configApi.gamedatai + idUser;
  const [gamedatai, setGamedatai] = useState([]);
  useEffect(() => {
    getDataGamedatai();
  }, [])

  const getDataGamedatai = async () => {
    await axios.get(configGamedatai)
      .then((response) => {
        var dataGamedatai = response.data;
        setGamedatai(dataGamedatai);
      })
      .catch(function (error) {
        console.log("Loi khong lay duoc API download: " + error);
      });
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 10, flexDirection : 'row' }}>
        <Text style={{
          paddingLeft: 10, borderLeftWidth: 5, borderLeftColor: 'blue', fontSize: 20, color: 'black', fontWeight: 'bold'
        }}
        >
          Game đã tải
        </Text>
        <TouchableOpacity style={{marginLeft : 20}}
            onPress={() => {
                setGamedatai([]);
                getDataGamedatai();
                
            }} >
            <Image source={{uri:images.reload}} style={styles.imgSearch}
                resizeMode='cover'/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={gamedatai}
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        //làm mới flatlist bằng refresh
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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

export default DownloadScreen

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