import { TestBed, inject } from '@angular/core/testing';
import {RequestService} from '../../../commons/service/request.service';
import {SettingsService} from '../../../commons/service/settings.service';
import {Http, HttpModule, XHRBackend, BaseRequestOptions } from '@angular/http';
import { LocalStorage } from '../../../commons/provider/local-storage';
import { IndexResolveService } from './index-resolve.service';
import { IndexService } from './index.service';

describe('IndexResolveService', () => {
  let service: IndexResolveService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
    ],
    providers: [
      RequestService,
      SettingsService,
      LocalStorage,
      IndexService
    ]
  }));
  beforeEach(inject([IndexResolveService], s => {
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
