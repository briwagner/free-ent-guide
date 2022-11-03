import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhlgamesComponent } from './nhlgames.component';

describe('NhlgameComponent', () => {
  let component: NhlgamesComponent;
  let fixture: ComponentFixture<NhlgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhlgamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NhlgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
