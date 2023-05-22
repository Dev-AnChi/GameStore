import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute,private cookie:CookieService) { }

  Gamelist:any=[];
  Gamedetail:any;
  animation:string="card p-3";
  imageUrl:any;

  username:any;
  password:any;
  User:any;
  ID_NguoiDung:any;

  recommender:any;

  ID_Loai:any;
  ngOnInit(): void {
    this.username = this.cookie.get("username");
    this.password = this.cookie.get("password");

    this.route.params.subscribe(params => {
      this.ID_Loai = params;

      if(this.ID_Loai.theloai == 0){
        this.isLogin();
      }
      else if(this.ID_Loai.theloai==null){
        this.refreshGameList();
      }
      else{
        this.refreshGameTheLoaiList();
      }
      this.imageUrl=this.service.ImagesUrl + "/";
    })
  }

  isLogin(){
    if(this.cookie.check('username')){
      this.service.loginCookiesNguoiDung(this.username,this.password).subscribe(data=>{
        this.User=data;
        this.ID_NguoiDung = this.User[0].ID_NguoiDung;
        this.recommenderSystems();
      })
  }}

  refreshGameList(){
    this.service.getGameDaKiemDuyet().subscribe(data=>{
      this.Gamelist=data;
    })
  }

  refreshGameTheLoaiList(){
    this.service.getGamelistIDTheLoai(this.ID_Loai.theloai).subscribe(data=>{
      this.Gamelist = data;
    })
  }

  recommenderSystems(){
    this.service.getGameRecommender(this.ID_NguoiDung).subscribe(data=>{
      this.recommender = data;
      this.Gamelist=[];
      for(var i=0; i<this.recommender.length; i++){
        this.service.detailGame(this.recommender[i]).subscribe(data=>{
          this.Gamedetail = data;
          this.Gamelist.push({ID_Game:this.Gamedetail[0].ID_Game, Ten_Game:this.Gamedetail[0].Ten_Game,
                              LuotTaiXuong:this.Gamedetail[0].LuotTaiXuong, Gia:this.Gamedetail[0].Gia,
                              Logo_Game:this.Gamedetail[0].Logo_Game,DanhGiaTB:this.Gamedetail[0].DanhGiaTB
          });
        })
      }
      console.log(this.Gamelist)
    }) 
  }

  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }
}
