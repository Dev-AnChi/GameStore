import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit {

  constructor(private service:SharedService, private cookie:CookieService) { }

  UserList:any;
  imageUrl:any;
  username:any;
  password:any;
  User:any;

  ngOnInit(): void {
    this.username = this.cookie.get("username");
    this.password = this.cookie.get("password");
    this.service.loginCookiesNguoiDung(this.username,this.password).subscribe(data=>{
      this.User=data;
    })

    this.refreshUserList();
    this.imageUrl=this.service.ImagesUrl + "/";
  }

  refreshUserList(){
    this.service.getNguoiDung().subscribe(data=>{
      this.UserList = data;
    })  
  }

  detailNguoiDung(item:any){
    
  }

  counter(i: number) {
    i = Math.round(i);
    return new Array(i);
  }

  deleteClick(item:any){
    if(confirm('Bạn có chắc chắn muốn xóa không ?')){
      this.service.deleteNguoiDung(item.ID_NguoiDung).subscribe(data=>{
        alert(data.toString());
        this.refreshUserList();
      });
    }
  }

  capquyenAdmin(item:any, id_NCN:any){
    if(id_NCN == 'NCN2'){
      alert("Người dùng đã là Admin !!")
    }
    else{
      this.service.capquyenAdmin(item).subscribe(data=>{
        alert(data.toString())
        this.refreshUserList()
      })
    }
  }

  huyquyenAdmin(item:any, id_NCN:any){
    console.log(item)
    if(id_NCN == 'NCN3'){
      alert("Người dùng hiện tại là User !!")
    }
    else{
      this.service.huyquyenAdmin(item).subscribe(data=>{
        alert(data.toString())
        this.refreshUserList()
      })
    }
  }
}
