import { TestBed, inject } from '@angular/core/testing';

import { CasparDataService } from './caspar-data.service';

describe('CasparDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasparDataService]
    });
  });

  it('should be created', inject([CasparDataService], (service: CasparDataService) => {
    expect(service).toBeTruthy();
  }));
});
