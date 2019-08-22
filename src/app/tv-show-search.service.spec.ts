/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TvShowSearchService } from './services/tv-show-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TvShowSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TvShowSearchService]
    });
  });

  it('should ...', inject([TvShowSearchService], (service: TvShowSearchService) => {
    expect(service).toBeTruthy();
  }));
});
