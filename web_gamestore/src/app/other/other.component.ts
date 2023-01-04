import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute) { }

  Gamelist:any=[];
  animation:string="card p-3";
  imageUrl:any;

  keyword:any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.keyword = params;
        this.refreshGamekeyword();
      this.imageUrl=this.service.ImagesUrl + "/";
    })
  }

  refreshGamekeyword(){
    this.service.findGame(this.keyword.keyword).subscribe(data=>{
      this.Gamelist = data;
    })
  }

  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }

}
