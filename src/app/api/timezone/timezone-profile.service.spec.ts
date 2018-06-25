import { TestBed, inject } from '@angular/core/testing';

import { TimezoneProfileService } from './timezone-profile.service';

describe('TimezoneProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimezoneProfileService]
    });
  });

  it('should be created', inject([TimezoneProfileService], (service: TimezoneProfileService) => {
    expect(service).toBeTruthy();
  }));
});
