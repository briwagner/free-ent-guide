/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TvmoviesService } from './tvmovies.service';

describe('TvmoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TvmoviesService]
    });
  });

  it('should ...', inject([TvmoviesService], (service: TvmoviesService) => {
    expect(service).toBeTruthy();
  }));
});
