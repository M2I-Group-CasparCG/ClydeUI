import { TestBed, inject } from '@angular/core/testing';

import { CasparGetService } from './caspar-get.service';

describe('CasparGetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasparGetService]
    });
  });

  it('should be created', inject([CasparGetService], (service: CasparGetService) => {
    expect(service).toBeTruthy();
  }));
});
