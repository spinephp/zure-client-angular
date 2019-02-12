import { TestBed } from '@angular/core/testing';

import { NewsResolveService } from './news-resolve.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorage } from '../commons/provider/local-storage';

describe('NewsResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
      RouterTestingModule
    ],
    providers: [
      // RequestService,
      // SettingsService,
      LocalStorage,
      // HomeService,
    ]
}));

  it('should be created', () => {
    const service: NewsResolveService = TestBed.get(NewsResolveService);
    expect(service).toBeTruthy();
  });
});
