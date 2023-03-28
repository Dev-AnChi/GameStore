import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game-like',
  templateUrl: './game-like.component.html',
  styleUrls: ['./game-like.component.scss']
})
export class GameLikeComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute) { }
  ID_NguoiDung:any;
  imageUrl:any;

  listGame:any=[];

  listYeuThich:any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID_NguoiDung = params['id'];
      if(this.ID_NguoiDung == null)
        this.ID_NguoiDung = "error";
      this.refreshYeuThich();
    });
    this.imageUrl=this.service.ImagesUrl + "/";
  }

  refreshYeuThich(){
    this.service.getYeuThichIDNguoiDung(this.ID_NguoiDung).subscribe(data=>{
      this.listYeuThich = data;
      for(let i of this.listYeuThich){
        this.service.detailGame(i.ID_Game).subscribe(data=>{
          this.listGame.push(data);
        })
      }
    })
  }

  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }

}
