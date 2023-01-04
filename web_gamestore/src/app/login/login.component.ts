import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private service:SharedService, private router:Router,) { }

  User:any;
  checkLogin:any;
  username:string="";
  password:string="";

  id_nguoidung:string="";

  ngOnInit(): void {
    this.service.username = this.username;
    this.service.password = this.password;
  }

  clickLogin(){
    this.service.username = this.username;
    this.service.password = this.password;
    if(this.username==""){
      this.service.username="error";
    }
    if(this.password==""){
      this.service.password="error";
    }

    this.service.loginNguoiDung(this.service.username,this.service.password).subscribe(data=>{
      this.User=data;
      console.log(this.service.username + "  " + this.service.password);
      this.id_nguoidung = this.User[0].ID_NguoiDung
      console.log(this.id_nguoidung);
      if(this.id_nguoidung == 'error'){
        this.service.checkLogin = false;
        this.checkLogin = this.service.checkLogin;
      }
      else{
        //dùng routerlink bằng code 
        this.router.navigate(['/game']);
        this.service.checkLogin = true;
      }
    })
  }
}
