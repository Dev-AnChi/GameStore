import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-theloai',
  templateUrl: './create-theloai.component.html',
  styleUrls: ['./create-theloai.component.scss']
})
export class CreateTheloaiComponent implements OnInit {

  constructor(private service:SharedService, private route : ActivatedRoute) { }
  ID_Game:any;
  dataTheLoai:any;
  allTheLoai:any;
  id_loai:any;

  theloai1:string="";
  theloai2:string="";
  theloai3:string="";
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID_Game = params['id'];
      this.refreshGame();
    });
  }
  refreshGame(){
    this.service.getNameTheLoaiChiTietGame(this.ID_Game).subscribe(data=>{
      this.dataTheLoai = data;

      if(this.dataTheLoai.length>0)
        this.theloai1 = this.dataTheLoai[0].TenTheLoai;
      if(this.dataTheLoai.length>1)
        this.theloai2 = this.dataTheLoai[1].TenTheLoai;
      if(this.dataTheLoai.length>2)
        this.theloai3 = this.dataTheLoai[2].TenTheLoai;
    })

    this.service.getTheLoailist().subscribe(data=>{
      this.allTheLoai = data;
    })
  }

  editTheLoai1(){
    this.service.getNameTheLoaiChiTietGame(this.ID_Game).subscribe(data=>{
      this.dataTheLoai = data;
      if(this.dataTheLoai.length > 0){
        this.service.getIDNameTheLoai(this.theloai1).subscribe(theloai=>{
          var val = {ID_ChiTietGame:this.dataTheLoai[0].ID_ChiTietGame,ID_Game:this.ID_Game,ID_Loai:theloai};
          this.service.editChiTietGame(val).subscribe(res=>alert(res.toString()));
        })
      }
      else{
        this.service.getIDNameTheLoai(this.theloai1).subscribe(theloai=>{
          var val = {ID_Game:this.ID_Game,ID_Loai:theloai};
          this.service.addChiTietGame(val).subscribe(res=>alert(res.toString()));
        })
      }
    })
  }

  editTheLoai2(){
    this.service.getNameTheLoaiChiTietGame(this.ID_Game).subscribe(data=>{
      this.dataTheLoai = data;
      if(this.dataTheLoai.length > 1){
        this.service.getIDNameTheLoai(this.theloai2).subscribe(theloai=>{
          var val = {ID_ChiTietGame:this.dataTheLoai[1].ID_ChiTietGame,ID_Game:this.ID_Game,ID_Loai:theloai};
          this.service.editChiTietGame(val).subscribe(res=>alert(res.toString()));
        })
      }
      else{
        this.service.getIDNameTheLoai(this.theloai2).subscribe(theloai=>{
          var val = {ID_Game:this.ID_Game,ID_Loai:theloai};
          this.service.addChiTietGame(val).subscribe(res=>alert(res.toString()));
        })
      }
    })
  }

  editTheLoai3(){
    this.service.getNameTheLoaiChiTietGame(this.ID_Game).subscribe(data=>{
      this.dataTheLoai = data;
      if(this.dataTheLoai.length > 2){
        this.service.getIDNameTheLoai(this.theloai3).subscribe(theloai=>{
          var val = {ID_ChiTietGame:this.dataTheLoai[2].ID_ChiTietGame,ID_Game:this.ID_Game,ID_Loai:theloai};
          this.service.editChiTietGame(val).subscribe(res=>alert(res.toString()));
        })
      }
      else{
        this.service.getIDNameTheLoai(this.theloai3).subscribe(theloai=>{
          var val = {ID_Game:this.ID_Game,ID_Loai:theloai};
          this.service.addChiTietGame(val).subscribe(res=>alert(res.toString()));
        })
      }
    })
  }

}
