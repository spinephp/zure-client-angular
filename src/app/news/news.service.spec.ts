import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import { HttpModule } from '@angular/http';
import { LocalStorage } from '../commons/provider/local-storage';

describe('NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [  HttpModule ],
    providers: [
      // RequestService,
      // SettingsService,
      LocalStorage
    ]

  }));

  it('should be created', () => {
    const service: NewsService = TestBed.get(NewsService);
    expect(service).toBeTruthy();
  });
});
