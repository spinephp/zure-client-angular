import { TestBed } from '@angular/core/testing';

import { NewsResolveService } from './news-resolve.service';

describe('NewsResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsResolveService = TestBed.get(NewsResolveService);
    expect(service).toBeTruthy();
  });
});
