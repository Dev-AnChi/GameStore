import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game-download',
  templateUrl: './game-download.component.html',
  styleUrls: ['./game-download.component.scss']
})
export class GameDownloadComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute) { }
  ID_NguoiDung:any;
  imageUrl:any;

  listGame:any=[];

  listGameDaTai:any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID_NguoiDung = params['id'];
      // if(this.ID_NguoiDung == null)
      //   this.ID_NguoiDung = "error";
      this.refreshGameDaTai();
    });
    this.imageUrl=this.service.ImagesUrl + "/";
  }

  refreshGameDaTai(){
    this.service.getGameDaTaiIDNguoiDung(this.ID_NguoiDung).subscribe(data=>{
      this.listGameDaTai = data;
      for(let i of this.listGameDaTai){
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
