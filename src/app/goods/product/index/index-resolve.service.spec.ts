import { TestBed } from '@angular/core/testing';

import { IndexResolveService } from './index-resolve.service';

describe('IndexResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndexResolveService = TestBed.get(IndexResolveService);
    expect(service).toBeTruthy();
  });
});
