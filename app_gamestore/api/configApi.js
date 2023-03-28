// export default configAPI = {
//     method: 'get',
//     url: localhost + '',
//     headers: { 
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*"
//     }
// };
export default configApi = {
    localhostIMG : 'http://192.168.1.28/Images/',
    games: 'http://192.168.1.28/api/Game',
    theloais : 'http://192.168.1.28/api/TheLoai',
    detailGame : 'http://192.168.1.28/api/Game/',
    detailImage : 'http://192.168.1.28/api/HinhAnh/',
    theloaigame : 'http://192.168.1.28/api/ChiTietGame/',
    binhluangame : 'http://192.168.1.28/api/BinhLuan/getBinhLuanIDGame/',
    detailUser : 'http://192.168.1.28/api/NguoiDung/',
    
    login : 'http://192.168.1.28/api/NguoiDung/Login/',
    
    gamedatai : 'http://192.168.1.28/api/GameDaTai/getGameDaTaiIDNguoiDung/',
    gameyeuthich : 'http://192.168.1.28/api/YeuThich/getYeuThichIDNguoiDung/',
    
    checkDaTai : 'http://192.168.1.28/api/GameDaTai/checkGameDaTai/',
    checkYeuThich : 'http://192.168.1.28/api/YeuThich/checkYeuThich/',
    
    findGame : 'http://192.168.1.28/api/Game/findGame/',
    filterTheLoai : 'http://192.168.1.28/api/ChiTietGame/getGamelistIDTheLoai/',

    downloadGame : 'http://192.168.1.28/api/GameDaTai',
    updateLuotTai : 'http://192.168.1.28/api/Game/updateLuotTai/',
    deleteGame : 'http://192.168.1.28/api/GameDaTai/',

    addYeuThich : 'http://192.168.1.28/api/YeuThich',
    deleteYeuThich : 'http://192.168.1.28/api/YeuThich/',

    BinhLuan : 'http://192.168.1.28/api/BinhLuan',
    findBinhLuan : 'http://192.168.1.28/api/BinhLuan/findBinhLuan/',

    updateDanhGia : 'http://192.168.1.28/api/Game/updateDanhGia/',

    topLuottai : 'http://192.168.1.28/api/Game/TopLuotTai',
    topDanhGia : 'http://192.168.1.28/api/Game/TopDanhGia',
    gameFree : 'http://192.168.1.28/api/Game/gameFree',
    topGiaTien : 'http://192.168.1.28/api/Game/TopGiaTien',
};