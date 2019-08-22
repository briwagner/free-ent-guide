/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SportsService } from './sports.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SportsService]
    });
  });

  it('should ...', inject([SportsService], (service: SportsService) => {
    expect(service).toBeTruthy();
  }));
});
