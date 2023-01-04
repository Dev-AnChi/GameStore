import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheloaiEditComponent } from './theloai-edit.component';

describe('TheloaiEditComponent', () => {
  let component: TheloaiEditComponent;
  let fixture: ComponentFixture<TheloaiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheloaiEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheloaiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
