import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageMHComponent } from './edit-image-mh.component';

describe('EditImageMHComponent', () => {
  let component: EditImageMHComponent;
  let fixture: ComponentFixture<EditImageMHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImageMHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImageMHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
