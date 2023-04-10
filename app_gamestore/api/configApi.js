// export default configAPI = {
//     method: 'get',
//     url: localhost + '',
//     headers: { 
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*"
//     }
// };
export default configApi = {
    localhostIMG : 'http://gamestoreapi.somee.com/Images/',
    games: 'http://gamestoreapi.somee.com/api/Game',
    theloais : 'http://gamestoreapi.somee.com/api/TheLoai',
    detailGame : 'http://gamestoreapi.somee.com/api/Game/',
    detailImage : 'http://gamestoreapi.somee.com/api/HinhAnh/',
    theloaigame : 'http://gamestoreapi.somee.com/api/ChiTietGame/',
    binhluangame : 'http://gamestoreapi.somee.com/api/BinhLuan/getBinhLuanIDGame/',
    detailUser : 'http://gamestoreapi.somee.com/api/NguoiDung/',
    
    login : 'http://gamestoreapi.somee.com/api/NguoiDung/Login/',
    
    gamedatai : 'http://gamestoreapi.somee.com/api/GameDaTai/getGameDaTaiIDNguoiDung/',
    gameyeuthich : 'http://gamestoreapi.somee.com/api/YeuThich/getYeuThichIDNguoiDung/',
    
    checkDaTai : 'http://gamestoreapi.somee.com/api/GameDaTai/checkGameDaTai/',
    checkYeuThich : 'http://gamestoreapi.somee.com/api/YeuThich/checkYeuThich/',
    
    findGame : 'http://gamestoreapi.somee.com/api/Game/findGame/',
    filterTheLoai : 'http://gamestoreapi.somee.com/api/ChiTietGame/getGamelistIDTheLoai/',

    downloadGame : 'http://gamestoreapi.somee.com/api/GameDaTai',
    updateLuotTai : 'http://gamestoreapi.somee.com/api/Game/updateLuotTai/',
    deleteGame : 'http://gamestoreapi.somee.com/api/GameDaTai/',

    addYeuThich : 'http://gamestoreapi.somee.com/api/YeuThich',
    deleteYeuThich : 'http://gamestoreapi.somee.com/api/YeuThich/',

    BinhLuan : 'http://gamestoreapi.somee.com/api/BinhLuan',
    findBinhLuan : 'http://gamestoreapi.somee.com/api/BinhLuan/findBinhLuan/',

    updateDanhGia : 'http://gamestoreapi.somee.com/api/Game/updateDanhGia/',

    topLuottai : 'http://gamestoreapi.somee.com/api/Game/TopLuotTai',
    topDanhGia : 'http://gamestoreapi.somee.com/api/Game/TopDanhGia',
    gameFree : 'http://gamestoreapi.somee.com/api/Game/gameFree',
    topGiaTien : 'http://gamestoreapi.somee.com/api/Game/TopGiaTien',
};