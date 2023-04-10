import { Component,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { SharedService } from './shared.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = "Hello";

  constructor(private observer: BreakpointObserver, public service:SharedService, 
    private route:ActivatedRoute,private router:Router, private cookie:CookieService) {}

  username:any;
  password:any;
  User:any;

  ID_NguoiDung:any;
  listTheLoai:any;

  keyword:any;

  NguoiDung:any;
  checkLogin:boolean = false;
  isAdmin:boolean = false;

  ngOnInit(): void {    
    this.username = this.cookie.get("username");
    this.password = this.cookie.get("password");
    this.isLogin();
    this.getlistTheLoai();
  }

  isLogin(){
    if(this.cookie.check('username')){
      this.service.loginNguoiDung(this.username,this.password).subscribe(data=>{
        this.User=data;
        this.ID_NguoiDung = this.User[0].ID_NguoiDung;
        if(this.ID_NguoiDung == 'error'){
          this.checkLogin = false;
        }
        else{
          this.checkLogin = true;
          if(this.User[0].ID_NhomChucNang != 'NCN1'){
            this.isAdmin = false;
          }
          else{
            this.isAdmin = true;
          }
        }
      })
    }
  }

  getlistTheLoai(){
    this.service.getTheLoailist().subscribe(data=>{
      this.listTheLoai = data;
    })
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    });
  }

  clickLogout(){
    alert("Bạn có chắc chắn muốn đăng xuất không ? ");
    this.cookie.deleteAll();
    this.checkLogin = false;
    this.isAdmin = false;
  }

  clickViewDownload(){
    if(this.username == '')
      this.router.navigate(['/user_profile']);
    else
    {
      this.service.checkUserName(this.username).subscribe(data=>{
        this.ID_NguoiDung=data;
        this.router.navigate(['/game-download',this.ID_NguoiDung]);
      })
    }

    

  }

  clickViewLike(){
    if(this.username == '')
      this.router.navigate(['/user_profile']);
    else
    {
      this.service.checkUserName(this.username).subscribe(data=>{
        this.ID_NguoiDung=data;
        this.router.navigate(['/game-like',this.ID_NguoiDung]);
      })
    }
  }


  clickViewProfile(){
      if(this.username == "error")
        this.router.navigate(['/user_profile']);
      else
      {
        this.service.checkUserName(this.username).subscribe(data=>{
          this.ID_NguoiDung=data;
          this.router.navigate(['/user_profile',this.ID_NguoiDung]);
        })
      }
  }

  findGame(){
    this.router.navigate(['/other',this.keyword]);
  }
}