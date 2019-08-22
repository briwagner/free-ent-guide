/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
  });

  it('should ...', inject([MoviesService], (service: MoviesService) => {
    expect(service).toBeTruthy();
  }));
});
