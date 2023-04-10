import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinhluanGameComponent } from './binhluan-game.component';

describe('BinhluanGameComponent', () => {
  let component: BinhluanGameComponent;
  let fixture: ComponentFixture<BinhluanGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinhluanGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinhluanGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
