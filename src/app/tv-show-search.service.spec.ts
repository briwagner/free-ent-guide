/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TvShowSearchService } from './tv-show-search.service';

describe('TvShowSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TvShowSearchService]
    });
  });

  it('should ...', inject([TvShowSearchService], (service: TvShowSearchService) => {
    expect(service).toBeTruthy();
  }));
});
