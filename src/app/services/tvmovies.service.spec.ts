/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TvmoviesService } from './tvmovies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TvmoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TvmoviesService]
    });
  });

  it('should ...', inject([TvmoviesService], (service: TvmoviesService) => {
    expect(service).toBeTruthy();
  }));
});
