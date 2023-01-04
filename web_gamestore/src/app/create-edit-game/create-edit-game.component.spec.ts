import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditGameComponent } from './create-edit-game.component';

describe('CreateEditGameComponent', () => {
  let component: CreateEditGameComponent;
  let fixture: ComponentFixture<CreateEditGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
