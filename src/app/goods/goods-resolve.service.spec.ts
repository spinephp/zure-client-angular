import { TestBed } from '@angular/core/testing';

import { GoodsResolveService } from './goods-resolve.service';

describe('GoodsResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodsResolveService = TestBed.get(GoodsResolveService);
    expect(service).toBeTruthy();
  });
});
