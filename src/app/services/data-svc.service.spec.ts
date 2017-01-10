/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataSvcService } from './data-svc.service';

describe('DataSvcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSvcService]
    });
  });

  it('should ...', inject([DataSvcService], (service: DataSvcService) => {
    expect(service).toBeTruthy();
  }));
});
