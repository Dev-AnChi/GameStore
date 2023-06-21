import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import QRCode from 'qrcode';
//import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-qrcode-momo',
  templateUrl: './qrcode-momo.component.html',
  styleUrls: ['./qrcode-momo.component.scss']
})
export class QRCodeMomoComponent implements OnInit {
  /*phoneNumber:string="";
  paymentAmount:number=0;
  qrCodeData:string="";

  @ViewChild('qrcodeCanvas', { static: true }) qrcodeCanvas!: ElementRef<HTMLCanvasElement>;*/

  constructor() { }
  ngOnInit(): void {
    
  }
  /*ngOnInit() {
    // Khởi tạo giá trị cho biến phoneNumber và paymentAmount
    this.phoneNumber = '0919520863';
    this.paymentAmount = 10000;

    // Tạo mã QR
    this.generateQRCode();
  }
  generateQRCode(): void {
    const qrCodeUrl = `https://payment-provider.com/pay?phone=${this.phoneNumber}&amount=${this.paymentAmount}`;

    QRCode.toDataURL(qrCodeUrl, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        this.qrCodeData = url;
      }
    });
  }*/
}
