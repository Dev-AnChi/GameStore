import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private service:SharedService) { }
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
  UserName_Tao:string="";
  NgayTao:string="";
  UserName_CapNhat:string="";
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
              SDT:this.SDT,AnhDaiDien:this.AnhDaiDien,UserName_Tao:this.service.username,NgayTao:this.NgayTao,
              UserName_CapNhat:this.service.username,NgayCapNhat:this.NgayCapNhat,ID_NhomChucNang:this.ID_NhomChucNang};
              alert("Lưu lại những thay đổi ?");
              console.log(val);
              this.service.addNguoiDung(val).subscribe(res=>alert(res.toString()));
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
      console.log(this.AnhDaiDien);
    })
  }
}
