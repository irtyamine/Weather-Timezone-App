import { TestBed, inject } from '@angular/core/testing';

import { TimezoneApiService } from './timezone-api.service';

describe('TimezoneApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimezoneApiService]
    });
  });

  it('should be created', inject([TimezoneApiService], (service: TimezoneApiService) => {
    expect(service).toBeTruthy();
  }));
});
