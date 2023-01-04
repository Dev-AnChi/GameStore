import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDownloadComponent } from './game-download.component';

describe('GameDownloadComponent', () => {
  let component: GameDownloadComponent;
  let fixture: ComponentFixture<GameDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
