import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { HttpModule } from '@angular/http';
import { LocalStorage } from '../commons/provider/local-storage';

describe('HomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [  HttpModule ],
    providers: [
      // RequestService,
      // SettingsService,
      LocalStorage
    ]
}));

  it('should be created', () => {
    const service: HomeService = TestBed.get(HomeService);
    expect(service).toBeTruthy();
  });
});
