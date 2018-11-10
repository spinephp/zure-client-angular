import { TestBed } from '@angular/core/testing';

import { HomeResolveService } from './home-resolve.service';

describe('HomeResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeResolveService = TestBed.get(HomeResolveService);
    expect(service).toBeTruthy();
  });
});
