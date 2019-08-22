import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MoviesOnTvComponent } from './movies-on-tv.component';
import { GenrePipe } from 'app/genre.pipe';
import { TvmoviesService } from 'app/services/tvmovies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesOnTvComponent', () => {
  let component: MoviesOnTvComponent;
  let fixture: ComponentFixture<MoviesOnTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TvmoviesService],
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ MoviesOnTvComponent, GenrePipe]
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
