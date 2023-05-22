import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-binhluan-game',
  templateUrl: './binhluan-game.component.html',
  styleUrls: ['./binhluan-game.component.scss']
})
export class BinhluanGameComponent {
  constructor(private service:SharedService, private route : ActivatedRoute, private cookie:CookieService) { } 

  User:any = null;
  imageUrl:any;

  //xem chi tiết game
  idGameDetails:any;
  dataBinhLuan:any;
  
  //Bình luận
  ID_BinhLuan:any;
  DanhGia:number=0;
  NoiDungBL:string="";
  NgayBinhLuan:string="";
  ID_NguoiBinhLuan:any;
  ID_Game:number=0;

  listBinhLuan:any=[];

  isBinhLuan:boolean=false;

  username:any;
  password:any;

  ngOnInit(): void {
    this.username = this.cookie.get("username");
    this.password = this.cookie.get("password");

    this.route.params.subscribe(params => {      
      this.idGameDetails = params['id'];
      //re

      this.refreshUser()
      this.refreshBinhLuan()
    });
  }

  refreshUser(){
    if(this.cookie.check('username')){
      this.imageUrl=this.service.ImagesUrl + "/";
      this.service.loginCookiesNguoiDung(this.username,this.password).subscribe(data=>{
        this.User=data;
        
        this.service.findBinhLuan(this.idGameDetails, this.User[0].ID_NguoiDung).subscribe(
          check=>(
            this.isBinhLuan = check.length == 0 ? false : true,
            this.dataBinhLuan = check
          )
        )

      })
    }
  }

  clickBinhLuan(){
    if(this.NoiDungBL == '' || this.DanhGia == 0){
      alert("Bạn cần nhập đầy đủ nội dung và đánh giá !");
    }
    else{
      this.service.checkUserName(this.username).subscribe(IDusername=>{
        this.ID_NguoiBinhLuan = IDusername;  
        this.ID_Game = this.idGameDetails;
        var val = {DanhGia:this.DanhGia,NoiDungBL:this.NoiDungBL,
          NgayBinhLuan:this.NgayBinhLuan,ID_NguoiBinhLuan:this.ID_NguoiBinhLuan,ID_Game:this.ID_Game}
          this.service.addBinhLuan(val).subscribe(res=>{
            this.refreshBinhLuan();
            this.service.updateGameDanhGia(this.idGameDetails).subscribe(res=>{
              //this.refreshGame();
            });
            alert(res.toString());
          })
        })
    }
  }

  clickEditBL(){
    if(this.NoiDungBL == '' || this.DanhGia == 0){
      alert("Bạn cần nhập đầy đủ nội dung và đánh giá !");
    }
    else{
      this.service.checkUserName(this.username).subscribe(IDusername=>{
        this.ID_NguoiBinhLuan = IDusername;  
        this.ID_Game = this.idGameDetails;
        this.service.findBinhLuan(this.ID_Game, this.ID_NguoiBinhLuan).subscribe(data=>{
          var val = {ID_BinhLuan:data[0].ID_BinhLuan,DanhGia:this.DanhGia,NoiDungBL:this.NoiDungBL,
            NgayBinhLuan:this.NgayBinhLuan,ID_NguoiBinhLuan:data[0].ID_NguoiBinhLuan,ID_Game:data[0].ID_Game}
          console.log(val)
            this.service.editBinhLuan(val).subscribe(res=>{
              this.refreshBinhLuan();
              this.service.updateGameDanhGia(this.idGameDetails).subscribe(res=>{
                //this.refreshGame();
              });
              alert(res.toString());
            })
        })
      })
    }
  }

  refreshBinhLuan(){
    this.service.checkUserName(this.username).subscribe(IDusername=>{
      this.ID_NguoiBinhLuan = IDusername;  
      this.ID_Game = this.idGameDetails;
      this.service.findBinhLuan(this.idGameDetails, this.User[0].ID_NguoiDung).subscribe(
        check=>(
          this.isBinhLuan = check.length == 0 ? false : true,
          this.dataBinhLuan = check
        ))
    })
    
    this.service.getBinhLuanIDGame(this.idGameDetails).subscribe(data=>{
      this.listBinhLuan = data;
    })
  }

  clickDanhGia(val:number){
    this.DanhGia = val;
  }

  deleteBinhLuan(id:any){
    this.service.deleteBinhLuan(id).subscribe(res=>{
      this.refreshBinhLuan();
      alert(res.toString());
    })
  }

  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }
}
