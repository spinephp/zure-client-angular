import { TestBed } from '@angular/core/testing';

import { IntroductionResolveService } from './introduction-resolve.service';

describe('IntroductionResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntroductionResolveService = TestBed.get(IntroductionResolveService);
    expect(service).toBeTruthy();
  });
});
