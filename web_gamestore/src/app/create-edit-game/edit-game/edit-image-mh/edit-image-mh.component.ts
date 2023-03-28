import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-image-mh',
  templateUrl: './edit-image-mh.component.html',
  styleUrls: ['./edit-image-mh.component.scss']
})
export class EditImageMHComponent implements OnInit {

  constructor(private service:SharedService, private route : ActivatedRoute) { }
  ID_Game:any;
  
  imageUrl:any;
  dataImg:any;
  dataGame:any;

  img1:any;
  img2:any;
  img3:any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID_Game = params['id'];
      this.refreshGame();
    });
  }

  refreshGame(){
    this.imageUrl=this.service.ImagesUrl + "/";
    this.service.detailGame(this.ID_Game).subscribe(data=>{
      this.dataGame=data;  
    });

    this.service.getHinhAnhIDGame(this.ID_Game).subscribe(data=>{
      this.dataImg = data;
      this.img1=this.dataImg[0].AnhMH;

      this.img2=this.dataImg[1].AnhMH;
      this.img3=this.dataImg[2].AnhMH;
    })
  }

  editImages1(){
    this.service.getHinhAnhIDGame(this.ID_Game).subscribe(data=>{
      this.dataImg = data;
      if(this.dataImg.length > 0){
        var val = {ID_AnhMH:this.dataImg[0].ID_AnhMH,AnhMH:this.img1,ID_Game:this.ID_Game}
        this.service.editHinhAnh(val).subscribe(res=>alert(res.toString()));
      }
      else{
        var val1 = {AnhMH:this.img1, ID_Game:this.ID_Game}
        this.service.addHinhAnh(val1).subscribe(res=>alert(res.toString()));
      }
    })
  }

  editImages2(){
    this.service.getHinhAnhIDGame(this.ID_Game).subscribe(data=>{
      this.dataImg = data;
      if(this.dataImg.length > 1){
        var val = {ID_AnhMH:this.dataImg[1].ID_AnhMH,AnhMH:this.img2,ID_Game:this.ID_Game}
      this.service.editHinhAnh(val).subscribe(res=>alert(res.toString()));
      }
      else{
        var val1 = {AnhMH:this.img2, ID_Game:this.ID_Game}
        this.service.addHinhAnh(val1).subscribe(res=>alert(res.toString()));
      }
      
    })
  }

  editImages3(){
    this.service.getHinhAnhIDGame(this.ID_Game).subscribe(data=>{
      this.dataImg = data;
      if(this.dataImg.length > 2){
        var val = {ID_AnhMH:this.dataImg[2].ID_AnhMH,AnhMH:this.img3,ID_Game:this.ID_Game}
        this.service.editHinhAnh(val).subscribe(res=>alert(res.toString()));
      }
      else{
        var val1 = {AnhMH:this.img3, ID_Game:this.ID_Game}
        this.service.addHinhAnh(val1).subscribe(res=>alert(res.toString()));
      }
      
    })
  }

  uploadPhoto1(event:any){
    var file = event.target.files[0];
    const formData:FormData=new FormData();

    formData.append('uploadedFile', file, file.name);

    this.service.UploadImages(formData).subscribe((data:any)=>{
      this.img1 = data.toString();
    })
  }
  uploadPhoto2(event:any){
    var file = event.target.files[0];
    const formData:FormData=new FormData();

    formData.append('uploadedFile', file, file.name);

    this.service.UploadImages(formData).subscribe((data:any)=>{
      this.img2 = data.toString();
    })
  }
  uploadPhoto3(event:any){
    var file = event.target.files[0];
    const formData:FormData=new FormData();

    formData.append('uploadedFile', file, file.name);

    this.service.UploadImages(formData).subscribe((data:any)=>{
      this.img3 = data.toString();
    })
  }

  deleteImage1(){
    this.service.getHinhAnhIDGame(this.ID_Game).subscribe(data=>{
      this.dataImg = data;
      this.service.deleteHinhAnh(this.dataImg[0].ID_AnhMH).subscribe(res=>alert(res.toString()));
    })
  }
  deleteImage2(){
    this.service.getHinhAnhIDGame(this.ID_Game).subscribe(data=>{
      this.dataImg = data;
      this.service.deleteHinhAnh(this.dataImg[1].ID_AnhMH).subscribe(res=>alert(res.toString()));
    })
  }
  deleteImage3(){
    this.service.getHinhAnhIDGame(this.ID_Game).subscribe(data=>{
      this.dataImg = data;
      this.service.deleteHinhAnh(this.dataImg[2].ID_AnhMH).subscribe(res=>alert(res.toString()));
    })
  }

}
