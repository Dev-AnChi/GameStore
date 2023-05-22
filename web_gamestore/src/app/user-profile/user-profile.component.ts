import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute, private cookie:CookieService) { }
  ID_NguoiDung:string="error";
  User:any = null;
  imageUrl:any;
  checkLogin:any = false;
  TenNhomChucNang:any;

  username:any;
  password:any;

  ngOnInit(): void {
    this.username = this.cookie.get("username");
    this.password = this.cookie.get("password");
    
    this.route.params.subscribe(params => {
        this.ID_NguoiDung = params['id'];
        this.isLogin();
        this.refreshUser();
    });
    this.imageUrl=this.service.ImagesUrl + "/";
  }

  isLogin(){
    if(this.cookie.check('username')){
      this.service.loginCookiesNguoiDung(this.username,this.password).subscribe(data=>{
        this.User=data;
        console.log(this.User)
        this.ID_NguoiDung = this.User[0].ID_NguoiDung;
        if(this.ID_NguoiDung == 'error'){
          this.checkLogin = false;
        }
        else{
          this.checkLogin = true;
        }
      })
    }
  }

  refreshUser(){
    this.service.detailNguoiDung(this.ID_NguoiDung).subscribe(data=>{
      this.User=data;
      if(this.User[0].ID_NguoiDung == 'error'){
        this.checkLogin = false;
        //this.checkLogin = this.service.checkLogin;
      }
      this.service.getNameIDNhomChucNang(this.User[0].ID_NhomChucNang).subscribe(data=>{
        this.TenNhomChucNang=data;
      }
      )
    })
  }
}
