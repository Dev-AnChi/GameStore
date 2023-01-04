import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTheloaiComponent } from './create-theloai.component';

describe('CreateTheloaiComponent', () => {
  let component: CreateTheloaiComponent;
  let fixture: ComponentFixture<CreateTheloaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTheloaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTheloaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
