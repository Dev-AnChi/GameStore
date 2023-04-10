import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-theloai',
  templateUrl: './theloai.component.html',
  styleUrls: ['./theloai.component.scss']
})
export class TheloaiComponent implements OnInit {

  constructor(private service:SharedService, private route:ActivatedRoute) { }
  TheLoai:any;
  TenTheLoai:any;
  ngOnInit(): void {
    this.refreshTheLoai();
  }

  refreshTheLoai(){
    this.service.getTheLoailist().subscribe(data=>{
      this.TheLoai = data;
    })
  }

  deleteTheLoai(item:any){
    alert("Bạn có chắc chắn muốn xóa không ?");
    this.service.deleteTheLoai(item.ID_Loai).subscribe(res=>{
      alert(res.toString())
      this.refreshTheLoai();
    });
  }

  clickEditTheLoai(id:any, name:any){
    var val={ID_Loai:id, TenTheLoai:name};
    this.service.editTheLoai(val).subscribe(res=>{
      alert(res.toString());
      this.refreshTheLoai();
    })
  }

  addTheLoai(){
    var val = {TenTheLoai : this.TenTheLoai}
    this.service.addTheLoai(val).subscribe(res=>{
      alert(res.toString());
      this.refreshTheLoai();
    });
  }

  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }

}
