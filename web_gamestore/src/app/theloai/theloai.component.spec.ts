import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheloaiComponent } from './theloai.component';

describe('TheloaiComponent', () => {
  let component: TheloaiComponent;
  let fixture: ComponentFixture<TheloaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheloaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheloaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
