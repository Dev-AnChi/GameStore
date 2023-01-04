import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImageLogoComponent } from './create-image-logo.component';

describe('CreateImageLogoComponent', () => {
  let component: CreateImageLogoComponent;
  let fixture: ComponentFixture<CreateImageLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateImageLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateImageLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
