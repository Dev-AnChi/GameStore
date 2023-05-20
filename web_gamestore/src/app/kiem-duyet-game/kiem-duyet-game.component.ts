import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kiem-duyet-game',
  templateUrl: './kiem-duyet-game.component.html',
  styleUrls: ['./kiem-duyet-game.component.scss']
})
export class KiemDuyetGameComponent {
  constructor(private service:SharedService) { }

  Gamelist:any;
  imageUrl:any;

  ngOnInit(): void {
    this.refreshGameList();
    this.imageUrl=this.service.ImagesUrl + "/";
  }

  refreshGameList(){
    this.service.getGameChuaKiemDuyet().subscribe(data=>{
      this.Gamelist=data;
    })
  }

  DuyetGame(item:any){
    this.service.kiemduyetGame(item).subscribe(data=>{
      alert(data.toString())
      this.refreshGameList()
    })
  }
}
