import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly APIUrl="http://gamestoreapi.somee.com/api";
  readonly ImagesUrl = "http://gamestoreapi.somee.com/Images";

  constructor(private http:HttpClient) { }

  //game
  getGamelist():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Game');
  }

  getMyGame(val:any){
    return this.http.get(this.APIUrl + '/Game/MyGame/' + val);
  }
  getGameDaKiemDuyet():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Game/GameDaKiemDuyet');
  }
  getGameChuaKiemDuyet():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Game/GameChuaKiemDuyet');
  }
  kiemduyetGame(val:any){
    return this.http.get(this.APIUrl + '/Game/KiemDuyet/' + val);
  }

  addGame(val:any){
    return this.http.post(this.APIUrl+'/Game',val);
  }
  deleteGame(val:any){
    return this.http.delete(this.APIUrl+'/Game/'+val);
  }
  editGame(val:any){
    return this.http.put(this.APIUrl + '/Game',val);
  }
  detailGame(val:any){
    return this.http.get(this.APIUrl + '/Game/'+val);
  }
  UploadImagesGame(val:any){
    return this.http.post(this.APIUrl+'/Game/SaveFile', val);
  }

  updateGameDanhGia(val:any){
   return this.http.get(this.APIUrl + '/Game/updateDanhGia/' + val);
  }
  
  updateGameLuotTai(val:any){
    return this.http.get(this.APIUrl + '/Game/updateLuotTai/' + val);
  }

  
//the loai  
  getTheLoailist():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/TheLoai');
  }
  addTheLoai(val:any){
    return this.http.post(this.APIUrl+'/TheLoai',val);
  }
  deleteTheLoai(val:any){
    return this.http.delete(this.APIUrl+'/TheLoai/'+val);
  }
  editTheLoai(val:any){
    return this.http.put(this.APIUrl + '/TheLoai',val);
  }
  detailTheLoai(val:any){
    return this.http.get(this.APIUrl + '/TheLoai/' + val);
  }
  getIDNameTheLoai(val:any){
    return this.http.get(this.APIUrl + '/TheLoai/GetIDNameTheLoai/' + val);
  }


  //Hinh Anh
  getHinhAnhlist():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/HinhAnh');
  }
  getHinhAnhIDGame(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/HinhAnh/'+val);
  }
  addHinhAnh(val:any){
    return this.http.post(this.APIUrl+'/HinhAnh',val);
  }
  deleteHinhAnh(val:any){
    return this.http.delete(this.APIUrl+'/HinhAnh/'+val);
  }
  editHinhAnh(val:any){
    return this.http.put(this.APIUrl + '/HinhAnh',val);
  }
  UploadImages(val:any){
    return this.http.post(this.APIUrl+'/HinhAnh/SaveFile', val);
  }

  //Chi tiết game
  getChiTietGamelist():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/ChiTietGame');
  }
  addChiTietGame(val:any){
    return this.http.post(this.APIUrl+'/ChiTietGame',val);
  }
  deleteChiTietGame(val:any){
    return this.http.delete(this.APIUrl+'/ChiTietGame/'+val);
  }
  editChiTietGame(val:any){
    return this.http.put(this.APIUrl + '/ChiTietGame',val);
  }
  //Lấy tên thể loại theo ID game
  getNameTheLoaiChiTietGame(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/ChiTietGame/'+val);
  }
  //Tìm ID game theo ten
  getIDNameGame(val:any){
    return this.http.get(this.APIUrl + '/Game/GetIDNameGame/' + val);
  }
  //get game bằng id loại
  getGamelistIDTheLoai(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/ChiTietGame/getGamelistIDTheLoai/' + val);
  }
  findGame(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/Game/findGame/' + val);
  }

  //Người dùng
  getNguoiDung():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/NguoiDung');
  }
  addNguoiDung(val:any){
    return this.http.post(this.APIUrl+'/NguoiDung',val);
  }
  deleteNguoiDung(val:any){
    return this.http.delete(this.APIUrl+'/NguoiDung/'+val);
  }
  editNguoiDung(val:any){
    return this.http.put(this.APIUrl + '/NguoiDung',val);
  }
  detailNguoiDung(val:any){
    return this.http.get(this.APIUrl + '/NguoiDung/' + val);
  }

  loginNguoiDung(username:any, password:any){
    return this.http.get(this.APIUrl + '/NguoiDung/Login/' + username + '/' + password);
  }
  loginCookiesNguoiDung(username:any, password:any){
    return this.http.get(this.APIUrl + '/NguoiDung/LoginCookies/' + username + '/' + password);
  }
  
  getNameIDNhomChucNang(val:any){
    return this.http.get(this.APIUrl+'/NguoiDung/GetNameIDNhomChucNang/'+val);
  }
  getIDNameNhomChucNang(val:any){
    return this.http.get(this.APIUrl+'/NguoiDung/GetIDNameNhomChucNang/'+val);
  }
  getAllNameNhomChucNang():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/NguoiDung/GetAllNameNhomChucNang/');
  }
  UploadImagesNguoiDung(val:any){
    return this.http.post(this.APIUrl+'/NguoiDung/SaveFile', val);
  }
  checkUserName(val:any){
    return this.http.get(this.APIUrl+'/NguoiDung/checkUserName/'+val);
  }

  capquyenAdmin(val:any){
    return this.http.get(this.APIUrl + '/NguoiDung/capquyenAdmin/' + val);
  }
  huyquyenAdmin(val:any){
    return this.http.get(this.APIUrl + '/NguoiDung/huyquyenAdmin/' + val);
  }

  //Bình luận
  getBinhLuanlist():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/BinhLuan');
  }
  addBinhLuan(val:any){
    return this.http.post(this.APIUrl+'/BinhLuan',val);
  }
  deleteBinhLuan(val:any){
    return this.http.delete(this.APIUrl+'/BinhLuan/'+val);
  }
  editBinhLuan(val:any){
    return this.http.put(this.APIUrl + '/BinhLuan',val);
  }
  getBinhLuanIDGame(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/BinhLuan/getBinhLuanIDGame/' + val);
  }
  findBinhLuan(idGame:any, idUser:any){
    return this.http.get<any>(this.APIUrl + "/BinhLuan/findBinhLuan/" + idGame + "/" + idUser);
  }

  //game
  getYeuThichlist():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/YeuThich');
  }
  addYeuThich(val:any){
    return this.http.post(this.APIUrl+'/YeuThich',val);
  }
  deleteYeuThich(val:any){
    return this.http.delete(this.APIUrl+'/YeuThich/'+val);
  }
  editYeuThich(val:any){
    return this.http.put(this.APIUrl + '/YeuThich',val);
  }
  getYeuThichIDNguoiDung(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/YeuThich/getYeuThichIDNguoiDung/' + val);
  }
  checkYeuThich(user:any, id:any){
    return this.http.get(this.APIUrl + '/YeuThich/checkYeuThich/'+user+'/' + id);
  }

  //game
  getGameDaTailist():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/GameDaTai');
  }
  addGameDaTai(val:any){
    return this.http.post(this.APIUrl+'/GameDaTai',val);
  }
  deleteGameDaTai(val:any){
    return this.http.delete(this.APIUrl+'/GameDaTai/'+val);
  }
  editGameDaTai(val:any){
    return this.http.put(this.APIUrl + '/GameDaTai',val);
  }
  getGameDaTaiIDNguoiDung(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/GameDaTai/getGameDaTaiIDNguoiDung/' + val);
  }
  checkGameDaTai(user:any, id:any){
    return this.http.get(this.APIUrl + '/GameDaTai/checkGameDaTai/'+user+'/' + id);
  }

  //recommender systems
  getGameRecommender(val:any){
    return this.http.get<any>(this.APIUrl+'/RecommenderSystems/' + val);
  }

  downloadGame(val:any){
    return this.http.get<any>(this.APIUrl+'/GameDaTai/DownloadFile/' + val);
  }
}
