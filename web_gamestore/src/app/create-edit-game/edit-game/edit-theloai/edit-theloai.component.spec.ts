import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTheloaiComponent } from './edit-theloai.component';

describe('EditTheloaiComponent', () => {
  let component: EditTheloaiComponent;
  let fixture: ComponentFixture<EditTheloaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTheloaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTheloaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
