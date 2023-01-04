import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-create-edit-game',
  templateUrl: './create-edit-game.component.html',
  styleUrls: ['./create-edit-game.component.scss']
})
export class CreateEditGameComponent implements OnInit {

  constructor(private service:SharedService) { }
  animation:string="card p-3";
  Gamelist:any=[];
  imageUrl:any;

  ngOnInit(): void {
    this.refreshGameList();
    this.imageUrl=this.service.ImagesUrl + "/";
  }
  refreshGameList(){
    this.service.getGamelist().subscribe(data=>{
      this.Gamelist=data;
    })
  }



  deleteClick(item:any){
    if(confirm('Bạn có chắc chắn muốn xóa không ?')){
      this.service.deleteGame(item).subscribe(data=>{
        alert(data.toString());
        this.refreshGameList();
      });
    }
  }
  
  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }
}
