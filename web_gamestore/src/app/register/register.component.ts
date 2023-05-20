import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private service:SharedService, private cookie:CookieService,private router:Router ) { }
  TenNhomChucNang:string="";

  ID_NguoiDung:string="";
  NickName:string="";
  UserName_ND:string="";
  Password_ND:string="";
  TenNguoiDung:string="";
  NgaySinh:string="";
  GioiTinh:boolean=true;
  Email:string="";
  SDT:string="";
  DiaChi:string="";
  AnhDaiDien:string="";
  UserName_Tao:string=this.cookie.get("username");
  NgayTao:string="";
  UserName_CapNhat:string=this.cookie.get("username");;
  NgayCapNhat:string="";
  ID_NhomChucNang:any;
  listNhomChucNang:any=[];

  ngOnInit(): void {
    this.loadListNhomChucNang();
  }

  loadListNhomChucNang(){
    this.service.getAllNameNhomChucNang().subscribe((data:any)=>{
      this.listNhomChucNang=data;
    })
  }

  saveUserClick(){
    this.service.getIDNameNhomChucNang("User").subscribe((data:any)=>{
        this.ID_NhomChucNang = data;
        this.service.checkUserName(this.UserName_ND).subscribe(IDusername=>{
          if(IDusername=='null'){
            var val =  {ID_NguoiDung:this.ID_NguoiDung,NickName:this.NickName,UserName_ND:this.UserName_ND,Password_ND:this.Password_ND,
              TenNguoiDung:this.TenNguoiDung,GioiTinh:this.GioiTinh,NgaySinh:this.NgaySinh,Email:this.Email, DiaChi:this.DiaChi, 
              SDT:this.SDT,AnhDaiDien:this.AnhDaiDien,UserName_Tao:this.UserName_Tao,NgayTao:this.NgayTao,
              UserName_CapNhat:this.UserName_CapNhat,NgayCapNhat:this.NgayCapNhat,ID_NhomChucNang:'NCN2'};
              alert("Lưu lại những thay đổi ?");
              this.service.addNguoiDung(val).subscribe(res=>{
                alert(res.toString())
                this.router.navigate(['/login']);
              });
          }
          else{
            alert(this.UserName_ND + " đã tồn tại, vui lòng chọn tên đăng nhập khác !!!");
          }
        })
    })   
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData:FormData=new FormData();

    formData.append('uploadedFile', file, file.name);

    this.service.UploadImagesNguoiDung(formData).subscribe((data:any)=>{
      this.AnhDaiDien = data.toString();
    })
  }
}
