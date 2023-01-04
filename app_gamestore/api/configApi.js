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
};