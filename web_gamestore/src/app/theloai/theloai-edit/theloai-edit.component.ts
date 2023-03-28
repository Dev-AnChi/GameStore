import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-theloai-edit',
  templateUrl: './theloai-edit.component.html',
  styleUrls: ['./theloai-edit.component.scss']
})
export class TheloaiEditComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute) { }

  TheLoai:any;
  ID_Loai:any;
  TenTheLoai:any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID_Loai = params;
      this.refreshTheLoai();
    })
  }

  refreshTheLoai(){
    this.service.detailTheLoai(this.ID_Loai.id).subscribe(data=>{
      this.TheLoai = data;
      this.TenTheLoai = this.TheLoai[0].TenTheLoai;
    })
  }

  clickEditTheLoai(){
    var val={ID_Loai:this.ID_Loai.id, TenTheLoai:this.TenTheLoai};
    this.service.editTheLoai(val).subscribe(res=>{
      alert(res.toString());
      this.refreshTheLoai();
    })
  }

}
