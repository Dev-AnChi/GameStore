import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute) { }

  Gamelist:any=[];
  animation:string="card p-3";
  imageUrl:any;

  ID_Loai:any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID_Loai = params;
      if(this.ID_Loai.theloai==null)
        this.refreshGameList();
      else{
        this.refreshGameTheLoaiList();
      }
      this.imageUrl=this.service.ImagesUrl + "/";
    })
  }

  refreshGameList(){
    this.service.getGamelist().subscribe(data=>{
      this.Gamelist=data;
    })
  }

  refreshGameTheLoaiList(){
    this.service.getGamelistIDTheLoai(this.ID_Loai.theloai).subscribe(data=>{
      this.Gamelist = data;
    })
  }

  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }
}
