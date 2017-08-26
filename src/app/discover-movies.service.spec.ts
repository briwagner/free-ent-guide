import { TestBed, inject } from '@angular/core/testing';

import { DiscoverMoviesService } from './discover-movies.service';

describe('DiscoverMoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscoverMoviesService]
    });
  });

  it('should be created', inject([DiscoverMoviesService], (service: DiscoverMoviesService) => {
    expect(service).toBeTruthy();
  }));
});
