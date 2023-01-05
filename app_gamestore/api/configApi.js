// export default configAPI = {
//     method: 'get',
//     url: 'http://192.168.101.35/api/',
//     headers: { 
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*"
//     }
// };
export default configApi = {
    games: 'http://192.168.101.35/api/Game',
    theloais : 'http://192.168.101.35/api/TheLoai',
    detailGame : 'http://192.168.101.35/api/Game/',
    detailImage : 'http://192.168.101.35/api/HinhAnh/',
    theloaigame : 'http://192.168.101.35/api/ChiTietGame/',
    binhluangame : 'http://192.168.101.35/api/BinhLuan/getBinhLuanIDGame/',
    detailUser : 'http://192.168.101.35/api/NguoiDung/',
    
    login : 'http://192.168.101.35/api/NguoiDung/Login/',
    
    gamedatai : 'http://192.168.101.35/api/GameDaTai/getGameDaTaiIDNguoiDung/',
    gameyeuthich : 'http://192.168.101.35/api/YeuThich/getYeuThichIDNguoiDung/',
    
    checkDaTai : 'http://192.168.101.35/api/GameDaTai/checkGameDaTai/',
    checkYeuThich : 'http://192.168.101.35/api/YeuThich/checkYeuThich/',
    
    findGame : 'http://192.168.101.35/api/Game/findGame/',
    filterTheLoai : 'http://192.168.101.35/api/ChiTietGame/getGamelistIDTheLoai/',

    downloadGame : 'http://192.168.101.35/api/GameDaTai',
    updateLuotTai : 'http://192.168.101.35/api/Game/updateLuotTai/',
    deleteGame : 'http://192.168.101.35/api/GameDaTai/',

    addYeuThich : 'http://192.168.101.35/api/YeuThich',
    deleteYeuThich : 'http://192.168.101.35/api/YeuThich/',

    addBinhLuan : 'http://192.168.101.35/api/BinhLuan',

    updateDanhGia : 'http://192.168.101.35/api/Game/updateDanhGia/',

    topLuottai : 'http://192.168.101.35/api/Game/TopLuotTai',
    topDanhGia : 'http://192.168.101.35/api/Game/TopDanhGia',
    gameFree : 'http://192.168.101.35/api/Game/gameFree',
    topGiaTien : 'http://192.168.101.35/api/Game/TopGiaTien',
};