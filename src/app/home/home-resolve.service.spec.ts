import { TestBed } from '@angular/core/testing';

import { HomeResolveService } from './home-resolve.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestService } from '../commons/service/request.service';
import { SettingsService } from '../commons/service/settings.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { inject } from '@angular/core';
import { HomeService } from './home.service';

describe('HomeResolveService', () => {
  let service: HomeResolveService;
  let settingsservice: SettingsService;
  let homeservice: HomeService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
      RouterTestingModule
    ],
    providers: [
      RequestService,
      SettingsService,
      LocalStorage,
      HomeService,
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(HomeResolveService);
    settingsservice = TestBed.get(SettingsService);
    homeservice = TestBed.get(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should executed', () => {
    spyOn(settingsservice, 'addLanguages');
    spyOn(homeservice, 'updateData').and.callThrough();
    // spyOn(Promise, 'all');
    service.resolve();
    expect(settingsservice.addLanguages).toHaveBeenCalled();
    expect(settingsservice.addLanguages).toHaveBeenCalledTimes(1);

    expect(homeservice.updateData).toHaveBeenCalled();
    expect(homeservice.updateData).toHaveBeenCalledTimes(1);

    homeservice.updateData().then(rs => {
      expect(rs.length).toBe(3);
    });
    // expect(service.hs.get).toHaveBeenCalled();
    // expect(Promise.all).toHaveBeenCalled();
    // expect(Promise.all).toHaveBeenCalledWith(service.hs.get);
  });
});
