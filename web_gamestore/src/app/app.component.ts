import { Component,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { SharedService } from './shared.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, public service:SharedService, private route:ActivatedRoute,private router:Router) {}

  ID_NguoiDung:any;
  listTheLoai:any;

  keyword:any;

  NguoiDung:any;

  ngOnInit(): void {
    this.getlistTheLoai();
    this.checkAdmin();
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
    this.service.checkLogin = false;
    this.service.username ="error";
    this.service.password="error";
  }

  clickViewDownload(){
    if(this.service.username == "error")
      this.router.navigate(['/user_profile']);
    else
    {
      this.service.checkUserName(this.service.username).subscribe(data=>{
        this.ID_NguoiDung=data;
        this.router.navigate(['/game-download',this.ID_NguoiDung]);
      })
    }
  }

  clickViewLike(){
    if(this.service.username == "error")
      this.router.navigate(['/user_profile']);
    else
    {
      this.service.checkUserName(this.service.username).subscribe(data=>{
        this.ID_NguoiDung=data;
        this.router.navigate(['/game-like',this.ID_NguoiDung]);
      })
    }
  }


  clickViewProfile(){
      if(this.service.username == "error")
        this.router.navigate(['/user_profile']);
      else
      {
        this.service.checkUserName(this.service.username).subscribe(data=>{
          this.ID_NguoiDung=data;
          this.router.navigate(['/user_profile',this.ID_NguoiDung]);
        })
      }
  }


  checkAdmin(){
    this.service.checkUserName(this.service.username).subscribe(id=>{
      this.service.detailNguoiDung(id).subscribe(data=>{
        this.NguoiDung = data;
        if(this.NguoiDung[0].ID_NhomChucNang != 'NCN1'){
          this.service.isAdmin = false;
        }
        else{
          this.service.isAdmin = true;
        }
      })
    })
  }

  findGame(){
    this.router.navigate(['/other',this.keyword]);
  }
}
