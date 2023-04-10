import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {

  constructor(private service:SharedService, private route : ActivatedRoute) { }

  ID_Game:any;
  Ten_Game:any;
  Ten_NhaSanXuat:any;
  SoHieuPhienBan:any;
  PhienBan:any;
  YC_CauHinh:any;
  LuotTaiXuong:any;
  DanhGiaTB:any;
  GioiHan_Tuoi:any;
  Gia:any;
  MoTaChiTiet:any;
  UserName_Tao:any;
  NgayTao:any;
  UserName_CapNhat:any;
  NgayCapNhat:any;
  Logo_Game:any;

  imageUrl:any;
  dataGame:any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID_Game = params['id'];
      this.refreshGame();
    });
  }
  refreshGame(){
    this.imageUrl=this.service.ImagesUrl + "/";
    this.service.detailGame(this.ID_Game).subscribe(data=>{
      this.dataGame=data;  
      this.loadData();
    });
  }

  loadData(){
    this.Ten_Game = this.dataGame[0].Ten_Game;
    this.Ten_NhaSanXuat = this.dataGame[0].Ten_NhaSanXuat;
    this.SoHieuPhienBan = this.dataGame[0].SoHieuPhienBan;
    this.PhienBan = this.dataGame[0].PhienBan;
    this.YC_CauHinh = this.dataGame[0].YC_CauHinh;
    this.LuotTaiXuong = this.dataGame[0].LuotTaiXuong;
    this.DanhGiaTB = this.dataGame[0].DanhGiaTB;
    this.GioiHan_Tuoi = this.dataGame[0].GioiHan_Tuoi;
    this.Gia = Number(this.dataGame[0].Gia);
    this.MoTaChiTiet = this.dataGame[0].MoTaChiTiet;
    this.UserName_Tao = this.dataGame[0].UserName_Tao;
    this.NgayTao = this.dataGame[0].NgayTao;
    this.UserName_CapNhat = this.dataGame[0].UserName_CapNhat;
    this.NgayCapNhat = this.dataGame[0].NgayCapNhat;
    this.Logo_Game = this.dataGame[0].Logo_Game;
  }

  saveGameClick(){
      var val =  {ID_Game:this.ID_Game,Ten_Game:this.Ten_Game,Ten_NhaSanXuat:this.Ten_NhaSanXuat,SoHieuPhienBan:this.SoHieuPhienBan
      ,PhienBan:this.PhienBan,YC_CauHinh:this.YC_CauHinh,LuotTaiXuong:this.LuotTaiXuong,DanhGiaTB:this.DanhGiaTB,GioiHan_Tuoi:this.GioiHan_Tuoi,
      Gia:this.Gia,MoTaChiTiet:this.MoTaChiTiet,UserName_CapNhat:"admin",NgayTao:this.NgayTao, UserName_Tao:this.UserName_Tao,
      NgayCapNhat:this.NgayCapNhat,Logo_Game:this.Logo_Game};
      console.log(val)
      alert("Lưu lại những thay đổi ?");
      this.service.editGame(val).subscribe(res=>{
        this.refreshGame();
        alert(res.toString());
      });
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData=new FormData();

    formData.append('uploadedFile', file, file.name);

    this.service.UploadImagesGame(formData).subscribe((data:any)=>{
      this.Logo_Game = data.toString();
    })
  }

}
