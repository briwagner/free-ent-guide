import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MLBGamesComponent } from './mlbgames.component';

describe('MlbgamesComponent', () => {
  let component: MLBGamesComponent;
  let fixture: ComponentFixture<MLBGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MLBGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MLBGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
