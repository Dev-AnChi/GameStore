import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute) { }
  ID_NguoiDung:string="error";
  User:any = null;
  imageUrl:any;
  checkLogin:any;
  TenNhomChucNang:any;

  username:string="";

  ngOnInit(): void {
    this.checkLogin=this.service.checkLogin;
    if(this.service.username != "error")
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
    })
  }
}
