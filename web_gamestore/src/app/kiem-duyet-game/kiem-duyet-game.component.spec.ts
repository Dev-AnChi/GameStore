import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemDuyetGameComponent } from './kiem-duyet-game.component';

describe('KiemDuyetGameComponent', () => {
  let component: KiemDuyetGameComponent;
  let fixture: ComponentFixture<KiemDuyetGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KiemDuyetGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KiemDuyetGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
