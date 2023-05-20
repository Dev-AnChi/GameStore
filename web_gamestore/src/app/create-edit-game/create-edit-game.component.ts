import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-edit-game',
  templateUrl: './create-edit-game.component.html',
  styleUrls: ['./create-edit-game.component.scss']
})
export class CreateEditGameComponent implements OnInit {

  constructor(private service:SharedService,private cookie:CookieService) { }
  animation:string="card p-3";
  Gamelist:any=[];
  imageUrl:any;
  username:any;
  password:any;
  ngOnInit(): void {
    this.username = this.cookie.get("username");
    this.password = this.cookie.get("password");
    this.refreshGameList();
    this.imageUrl=this.service.ImagesUrl + "/";
  }
  refreshGameList(){
    this.service.getMyGame(this.username).subscribe(data=>{
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
