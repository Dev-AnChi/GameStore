import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private service:SharedService, private router:Router, private route:ActivatedRoute) { }
  User:any = null;
  imageUrl:any;
  checkLogin:any;
  TenNhomChucNang:any;

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
    this.checkLogin=this.service.checkLogin;
      this.route.params.subscribe(params => {
        this.ID_NguoiDung = params['id'];
        if(this.ID_NguoiDung == null)
          this.ID_NguoiDung = "error";
        this.refreshUser();
      });
      this.imageUrl=this.service.ImagesUrl + "/";
  }

  refreshUser(){
    this.service.detailNguoiDung(this.ID_NguoiDung).subscribe(data=>{
      this.User=data;
      if(this.User[0].ID_NguoiDung == 'error'){
        this.service.checkLogin = false;
        this.checkLogin = this.service.checkLogin;
      }
      this.service.getNameIDNhomChucNang(this.User[0].ID_NhomChucNang).subscribe(data1=>{
        this.TenNhomChucNang=data1;
      }
      )
      this.loadListNhomChucNang();
    })
  }

  loadListNhomChucNang(){
    this.service.getAllNameNhomChucNang().subscribe((data:any)=>{
      this.listNhomChucNang=data;

      this.ID_NguoiDung = this.User[0].ID_NguoiDung;
      this.NickName=this.User[0].NickName;
      this.UserName_ND=this.User[0].UserName_ND;
      this.Password_ND=this.User[0].Password_ND;
      this.TenNguoiDung=this.User[0].TenNguoiDung;
      this.NgaySinh=this.User[0].NgaySinh.substr(0,10);
      this.GioiTinh=this.User[0].GioiTinh;
      this.Email=this.User[0].Email;
      this.SDT=this.User[0].SDT;
      this.DiaChi=this.User[0].DiaChi;
      this.UserName_CapNhat=this.User[0].UserName_CapNhat;
      this.NgayCapNhat=this.User[0].NgayCapNhat;
      // this.UserName_Tao=this.User[0].UserName_Tao;
      // this.NgayTao=this.User[0].NgayTao;
      this.ID_NhomChucNang=this.User[0].ID_NhomChucNang;

      this.AnhDaiDien = this.User[0].AnhDaiDien;
      this.imageUrl=this.service.ImagesUrl + "/";
    })
  }

  saveUserClick(){
    this.service.getIDNameNhomChucNang(this.TenNhomChucNang).subscribe((data:any)=>{
        this.ID_NhomChucNang = data;
        var val =  {ID_NguoiDung:this.ID_NguoiDung,NickName:this.NickName,UserName_ND:this.UserName_ND,Password_ND:this.Password_ND,
        TenNguoiDung:this.TenNguoiDung,GioiTinh:this.GioiTinh,NgaySinh:this.NgaySinh,
        Email:this.Email, DiaChi:this.DiaChi, SDT:this.SDT,AnhDaiDien:this.AnhDaiDien 
        ,UserName_CapNhat:this.service.username,NgayCapNhat:this.NgayCapNhat,ID_NhomChucNang:this.ID_NhomChucNang};
        alert("Lưu lại những thay đổi ?");
        console.log(val);
        this.service.editNguoiDung(val).subscribe(res=>{
          this.refreshUser();
          alert(res.toString());
        });
    })

    //dùng routerlink bằng code 
    //this.router.navigate(['/user_profile', this.ID_NguoiDung]);
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
