import { TestBed } from '@angular/core/testing';

import { ParamResolveService } from './param-resolve.service';
import { LocalStorage } from 'src/app/commons/provider/local-storage';
import { SettingsService } from 'src/app/commons/service/settings.service';
import { HttpModule } from '@angular/http';

describe('ParamResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule
    ],
    providers: [
      // ProductComponent,
      LocalStorage,
      SettingsService,
      // Router,
      // { provide: Router, useClass: RouterModule},
      // { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
      // { provide: GoodsComponent, useClass: SpyGoodsComponent},
      // { provide: ActivatedRoute, useValue: fakeActivatedRoute},
      // {provide: APP_BASE_HREF, useValue : '/' }
    ],
}));

  it('should be created', () => {
    const service: ParamResolveService = TestBed.get(ParamResolveService);
    expect(service).toBeTruthy();
  });
});
