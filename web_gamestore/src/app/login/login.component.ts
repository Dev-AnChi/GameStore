import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private service:SharedService, private router:Router, private cookie:CookieService) { }

  User:any;
  checkLogin:boolean = false;
  username:any;
  password:any;

  ngOnInit(): void {
    setTimeout(() => {})
  }

  addCookie(){
    this.cookie.set("username", this.username);
    this.cookie.set("password", this.password);
  }

  clickLogin(){
    if(this.username == null || this.password == null){
      alert("Yêu cầu nhập đầy đủ tài khoản và mật khẩu !");
    }
    else{
      this.service.loginNguoiDung(this.username,this.password).subscribe(data=>{
        this.User=data;
        if(this.User.length == 0){
          this.checkLogin = false;
          alert("Nhập sai tài khoản hoặc mật khẩu !");
        }
        else{
          this.addCookie();
          //this.router.navigate(['/game']);
          location.replace("/");
          this.checkLogin = true;
        }
      })
    }
  }

  clickRegister(){
    this.router.navigate(['/register']);
  }
}
