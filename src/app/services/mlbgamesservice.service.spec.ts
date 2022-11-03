import { TestBed } from '@angular/core/testing';

import { MLBGamesService } from './mlbgamesservice.service';

describe('MlbgamesserviceService', () => {
  let service: MLBGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MLBGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
