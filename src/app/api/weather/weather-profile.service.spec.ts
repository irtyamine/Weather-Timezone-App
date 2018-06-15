import { TestBed, inject } from '@angular/core/testing';

import { WeatherProfileService } from './weather-profile.service';

describe('WeatherProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherProfileService]
    });
  });

  it('should be created', inject([WeatherProfileService], (service: WeatherProfileService) => {
    expect(service).toBeTruthy();
  }));
});
