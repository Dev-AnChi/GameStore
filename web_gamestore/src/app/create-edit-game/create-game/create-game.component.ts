import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  constructor(private service:SharedService, private route : ActivatedRoute, private router:Router, private cookie:CookieService) { }

  ID_Game:any;
  Ten_Game:any;
  Ten_NhaSanXuat:any;
  SoHieuPhienBan:any;
  PhienBan:any;
  YC_CauHinh:any;
  LuotTaiXuong:any=0;
  DanhGiaTB:any=0;
  GioiHan_Tuoi:any;
  Gia:any;
  MoTaChiTiet:any;
  UserName_Tao:any=this.cookie.get("username");
  NgayTao:any="";
  UserName_CapNhat:any=this.cookie.get("username");
  NgayCapNhat:any="";
  LinkTaiGame:any;
  Logo_Game:any;

  imageUrl:any;
  dataGame:any;


  ngOnInit(): void {
    this.imageUrl = this.service.ImagesUrl + '/';
  }

  addGameClick(){
      var val =  {Ten_Game:this.Ten_Game,Ten_NhaSanXuat:this.Ten_NhaSanXuat,SoHieuPhienBan:this.SoHieuPhienBan
      ,PhienBan:this.PhienBan,YC_CauHinh:this.YC_CauHinh,LuotTaiXuong:this.LuotTaiXuong,DanhGiaTB:this.DanhGiaTB,GioiHan_Tuoi:this.GioiHan_Tuoi,
      Gia:this.Gia,MoTaChiTiet:this.MoTaChiTiet,UserName_Tao:this.UserName_Tao,NgayTao:this.NgayTao,UserName_CapNhat:this.UserName_CapNhat,
      NgayCapNhat:this.NgayCapNhat,Logo_Game:this.Logo_Game,LinkTaiGame:this.LinkTaiGame};
      this.service.getIDNameGame(this.Ten_Game).subscribe(id=>{
        if(id != "error"){
          alert("Tên game đã tồn tại, yêu cầu dùng tên khác !!!");
        }
        else{
          alert("Lưu lại những thay đổi ?");
          this.service.addGame(val).subscribe(res=>{
            alert(res.toString());
          });
        }
      })   
      
  }

  nextClick(){
    //dùng routerlink bằng code 
    this.service.getIDNameGame(this.Ten_Game).subscribe(id=>{
      if(id == "error"){
        alert("Bạn chưa lưu, lưu lại để tiếp tục");
      }
      else{
        this.router.navigate(['/create-game/create-imageMH', id]);
      }
    })
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
