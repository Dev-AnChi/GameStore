import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLikeComponent } from './game-like.component';

describe('GameLikeComponent', () => {
  let component: GameLikeComponent;
  let fixture: ComponentFixture<GameLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameLikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
