import { Component, OnInit, Input} from '@angular/core';
import { SharedService } from '../shared.service';
import {ActivatedRoute, Router } from '@angular/router';
import { _isNumberValue } from '@angular/cdk/coercion';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-detail-game',
  templateUrl: './detail-game.component.html',
  styleUrls: ['./detail-game.component.scss']
})
export class DetailGameComponent implements OnInit {

  constructor(private service:SharedService, private route : ActivatedRoute, private cookie:CookieService, 
    private router:Router,private http: HttpClient) { } 
  //kiểm tra user có đăng nhập hay không để hiển thị bình luận
  User:any = null;
  imageUrl:any;
  checkLogin:any;
  apkUrl:any;
  //xem chi tiết game
  idGameDetails:any;
  dataGame:any;
  //dataBinhLuan:any;
  dataImg:any;
  dataTheLoai:any;
  //hiển thị ảnh minh họa
  img1:string="";
  img2:string="";
  img3:string="";
  //Bình luận
  // ID_BinhLuan:any;
  // DanhGia:number=0;
  // NoiDungBL:string="";
  // NgayBinhLuan:string="";
  // ID_NguoiBinhLuan:any;
  ID_Game:number=0;

  listBinhLuan:any=[];
//  listDetailNguoiDung:any=[];

  isYeuThich:boolean=false;
  isGameDaTai:boolean=false;
  //isBinhLuan:boolean=false;

  username:any;
  password:any;

  
  ngOnInit(): void {
    this.username = this.cookie.get("username");
    this.password = this.cookie.get("password");

    this.route.params.subscribe(params => {      
      this.idGameDetails = params['id'];
      this.refreshGame();
      //this.refreshBinhLuan();
      this.refreshUser();
      this.updateDanhGia();
    });
  }

  updateDanhGia(){
    this.service.updateGameDanhGia(this.idGameDetails).subscribe(res=>{
      console.log(res)
    });
  }

  refreshUser(){
    if(this.cookie.check('username')){
      this.service.loginCookiesNguoiDung(this.username,this.password).subscribe(data=>{
        this.User=data;
        
        // this.service.findBinhLuan(this.idGameDetails, this.User[0].ID_NguoiDung).subscribe(
        //   check=>(
        //     this.isBinhLuan = check.length == 0 ? false : true,
        //     this.dataBinhLuan = check
        //   )
        // )
  
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
  }

  refreshGame(){
    this.imageUrl=this.service.ImagesUrl + "/";
    this.service.detailGame(this.idGameDetails).subscribe(data=>{
      this.dataGame=data;  
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

  clickBinhLuan(){
    if(this.cookie.check('username')){
      this.router.navigate(['/binhluan/' + this.idGameDetails]);
    }
    else{
      alert("Bạn cần đăng nhập để thực hiện tính năng này !");
    }
  }

  clickLike(){
    if(this.cookie.check('username')){
      this.service.loginCookiesNguoiDung(this.username,this.password).subscribe(data=>{
        this.User=data;
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
      })
    }
    else{
      alert("Bạn cần đăng nhập để thực hiện chức năng này !");
    }
    
  }

  clickDowload(){
    if(this.cookie.check('username')){
      this.service.loginCookiesNguoiDung(this.username,this.password).subscribe(data=>{
        this.User=data;
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
              this.service.downloadGame(this.idGameDetails).subscribe(res=>{
                this.apkUrl = res[0].LinkTaiGame;
                window.open(this.apkUrl, '_blank');
                var val={CapNhat:false,NgayTai:"",ID_NguoiDung:this.User[0].ID_NguoiDung,ID_Game:this.idGameDetails}
                this.service.addGameDaTai(val).subscribe(res=>{
                  this.service.updateGameLuotTai(this.idGameDetails).subscribe(res=>{
                    this.refreshGame();
                  });
                  alert(res.toString())
                });
                this.isGameDaTai = true;
                alert("Đã cài đặt thành công !");
              })
            }
          })
      })
    }
    else{
      alert("Yêu cầu đăng nhập để thực hiện chức năng này !");
    }
    
  }

  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }

}
