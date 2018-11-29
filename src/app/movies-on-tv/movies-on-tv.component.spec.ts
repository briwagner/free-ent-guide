import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesOnTvComponent } from './movies-on-tv.component';

describe('MoviesOnTvComponent', () => {
  let component: MoviesOnTvComponent;
  let fixture: ComponentFixture<MoviesOnTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesOnTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesOnTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
