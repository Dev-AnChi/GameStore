import { Component, OnInit, Input} from '@angular/core';
import { SharedService } from '../shared.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-game',
  templateUrl: './detail-game.component.html',
  styleUrls: ['./detail-game.component.scss']
})
export class DetailGameComponent implements OnInit {

  constructor(private service:SharedService, private route : ActivatedRoute) { } 
  //kiểm tra user có đăng nhập hay không để hiển thị bình luận
  User:any = null;
  imageUrl:any;
  checkLogin:any;
  //xem chi tiết game
  idGameDetails:any;
  dataGame:any;
  dataImg:any;
  dataTheLoai:any;
  //hiển thị ảnh minh họa
  img1:string="";
  img2:string="";
  img3:string="";
  //Bình luận
  ID_BinhLuan:any;
  DanhGia:number=0;
  NoiDungBL:string="";
  NgayBinhLuan:string="";
  ID_NguoiBinhLuan:any;
  ID_Game:number=0;

  listBinhLuan:any=[];
  listDetailNguoiDung:any=[];

  isYeuThich:boolean=false;

  isGameDaTai:boolean=false;

  ngOnInit(): void {
    this.refreshUser();
    this.route.params.subscribe(params => {
      this.idGameDetails = params['id'];
      this.service.updateGameDanhGia(this.idGameDetails).subscribe(res=>{
        this.refreshGame();
      });
      this.refreshBinhLuan();
    });
  }

  refreshUser(){
    this.service.loginNguoiDung(this.service.username,this.service.password).subscribe(data=>{
      this.User=data;
      if(this.User[0].ID_NguoiDung == 'error'){
        this.service.checkLogin = false;
        this.checkLogin = this.service.checkLogin;
      }

      this.service.checkYeuThich(this.User[0].ID_NguoiDung,this.idGameDetails).subscribe(check=>{
        if(check != "error")
          this.isYeuThich = true;
        else 
          this.isYeuThich = false;
      })

      this.service.checkGameDaTai(this.User[0].ID_NguoiDung,this.idGameDetails).subscribe(check=>{
        if(check != "error")
          this.isGameDaTai = true;
        else 
          this.isGameDaTai = false;
      })
    })
  }

  refreshGame(){
    this.imageUrl=this.service.ImagesUrl + "/";
    this.service.detailGame(this.idGameDetails).subscribe(data=>{
      this.dataGame=data;  
      console.log(data);
    });
    
    this.service.getNameTheLoaiChiTietGame(this.idGameDetails).subscribe(data=>{
      this.dataTheLoai = data;
    })

    this.service.getHinhAnhIDGame(this.idGameDetails).subscribe(data=>{
      this.dataImg = data;
      this.img1=this.service.ImagesUrl + "/" + this.dataImg[0].AnhMH;
      this.img2=this.service.ImagesUrl + "/" + this.dataImg[1].AnhMH;
      this.img3=this.service.ImagesUrl + "/" + this.dataImg[2].AnhMH;
    })
  }

  refreshBinhLuan(){
    this.service.getBinhLuanIDGame(this.idGameDetails).subscribe(data=>{
      console.log("id game : " + this.idGameDetails);
      this.listBinhLuan = data;
      this.listDetailNguoiDung=[];

      for(var i=0 ;i<this.listBinhLuan.length;i++){
          this.createListNguoiDung(this.listBinhLuan[i].ID_NguoiBinhLuan);
      }
    })
  }

  createListNguoiDung(idNguoiBinhLuan:any){
    this.service.detailNguoiDung(idNguoiBinhLuan).subscribe(dataND=>{
      this.listDetailNguoiDung.push(dataND);
    })
  }

  clickDanhGia(val:number){
    this.DanhGia = val;
  }

  clickBinhLuan(){
    this.service.checkUserName(this.service.username).subscribe(IDusername=>{
    this.ID_NguoiBinhLuan = IDusername;  
    this.ID_Game = this.idGameDetails;
    var val = {DanhGia:this.DanhGia,NoiDungBL:this.NoiDungBL,
      NgayBinhLuan:this.NgayBinhLuan,ID_NguoiBinhLuan:this.ID_NguoiBinhLuan,ID_Game:this.ID_Game}
      this.service.addBinhLuan(val).subscribe(res=>{
        this.refreshBinhLuan();
        this.service.updateGameDanhGia(this.idGameDetails).subscribe(res=>{
          this.refreshGame();
        });
        alert(res.toString());
      })
    })
    }

  clickLike(){
    this.service.loginNguoiDung(this.service.username,this.service.password).subscribe(data=>{
      this.User=data;
      if(this.User[0].ID_NguoiDung == 'error'){
        alert("Yêu cầu đăng nhập để thực hiện chức năng này !");
      }
      else{
        this.service.checkYeuThich(this.User[0].ID_NguoiDung,this.idGameDetails).subscribe(check=>{
          if(check != "error")
            this.isYeuThich = true;
          else 
            this.isYeuThich = false;
  
          if(this.isYeuThich == true){
            this.service.deleteYeuThich(check).subscribe(res=>alert(res.toString()));
            this.isYeuThich=false;
            alert("Đã xóa khỏi danh sách yêu thích !");
          }
          else{
            var val={NgayThich:"",ID_NguoiDung:this.User[0].ID_NguoiDung,ID_Game:this.idGameDetails}
            this.service.addYeuThich(val).subscribe(res=>alert(res.toString()));
            this.isYeuThich = true;
            alert("Đã thêm vào danh sách yêu thích !");
          }
        })
      }
    })
  }

  clickDowload(){
    this.service.loginNguoiDung(this.service.username,this.service.password).subscribe(data=>{
      this.User=data;
      if(this.User[0].ID_NguoiDung == 'error'){
        alert("Yêu cầu đăng nhập để thực hiện chức năng này !");
      }
      else{
        this.service.checkGameDaTai(this.User[0].ID_NguoiDung,this.idGameDetails).subscribe(check=>{
          if(check != "error")
            this.isGameDaTai = true;
          else 
            this.isGameDaTai = false;
  
          if(this.isGameDaTai == true){
            this.service.deleteGameDaTai(check).subscribe(res=>{
              alert(res.toString())
            });
            this.isGameDaTai=false;
            alert("Đã gỡ cài đặt thành công !");
          }
          else{
            var val={CapNhat:false,NgayTai:"",ID_NguoiDung:this.User[0].ID_NguoiDung,ID_Game:this.idGameDetails}
            this.service.addGameDaTai(val).subscribe(res=>{
              this.service.updateGameLuotTai(this.idGameDetails).subscribe(res=>{
                this.refreshGame();
              });
              alert(res.toString())
            });
            this.isGameDaTai = true;
            alert("Đã cài đặt thành công !");
          }
        })
      }
    })
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
