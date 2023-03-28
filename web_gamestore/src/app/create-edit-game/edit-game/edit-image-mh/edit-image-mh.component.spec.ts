import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageMhComponent } from './edit-image-mh.component';

describe('EditImageMhComponent', () => {
  let component: EditImageMhComponent;
  let fixture: ComponentFixture<EditImageMhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImageMhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImageMhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
