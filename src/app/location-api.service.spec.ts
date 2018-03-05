import { TestBed, inject } from '@angular/core/testing';

import { LocationApiService } from './location-api.service';

describe('LocationApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationApiService]
    });
  });

  it('should be created', inject([LocationApiService], (service: LocationApiService) => {
    expect(service).toBeTruthy();
  }));
});
