import { TranslatePipe } from './translate.pipe';
import {SettingsService} from './commons/service/settings.service';
import {LocalStorage} from './commons/provider/local-storage';
import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core';

describe('TranslatePipe', () => {
  let pipe;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ SettingsService, LocalStorage ]
  }));
  it('create an instance', () => {
    const ss = TestBed.get(SettingsService);
    const ls = TestBed.get(LocalStorage);
    pipe = new TranslatePipe(ss, ls);
    expect(pipe).toBeTruthy();
  });
  it('should work with empty string', () => {
    expect(pipe.transform('')).toEqual('');
  });
  it('should work with real string', () => {
    setTimeout(function() {
      expect(pipe.transform('YunRui')).toEqual('云瑞');
    }, 200);
  });
});
