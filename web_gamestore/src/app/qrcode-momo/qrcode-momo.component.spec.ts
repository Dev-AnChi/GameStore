import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeMomoComponent } from './qrcode-momo.component';

describe('QRCodeMomoComponent', () => {
  let component: QRCodeMomoComponent;
  let fixture: ComponentFixture<QRCodeMomoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRCodeMomoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeMomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
