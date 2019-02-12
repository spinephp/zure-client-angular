import { TestBed, inject } from '@angular/core/testing';
import {RequestService} from '../commons/service/request.service';
import {SettingsService} from '../commons/service/settings.service';
import {Http, HttpModule, XHRBackend, BaseRequestOptions } from '@angular/http';
import { LocalStorage } from '../commons/provider/local-storage';
import { GoodsService } from './goods.service';
import { GoodsResolveService } from './goods-resolve.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('GoodsResolveService', () => {
  let service: GoodsResolveService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
      RouterTestingModule
    ],
    providers: [
      RequestService,
      SettingsService,
      LocalStorage,
      GoodsService,
    ]
  }));
  beforeEach(inject([GoodsResolveService], s => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should executed', () => {
    spyOn(service.cv, 'addLanguages');
    // spyOn(service.hs, 'get');
    // spyOn(Promise, 'all');
    service.resolve();
    expect(service.cv.addLanguages).toHaveBeenCalled();
    // expect(service.hs.get).toHaveBeenCalled();
    // expect(Promise.all).toHaveBeenCalled();
    // expect(Promise.all).toHaveBeenCalledWith(service.hs.get);
  });
});
