import { TestBed, inject } from '@angular/core/testing';

import { DiscoverMoviesService } from './services/discover-movies.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DiscoverMoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiscoverMoviesService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([DiscoverMoviesService], (service: DiscoverMoviesService) => {
    expect(service).toBeTruthy();
  }));
});
