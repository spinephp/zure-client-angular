import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { LocalStorage } from '../provider/local-storage';

describe('SettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ LocalStorage]
  }));

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });
  it('should be property exist', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service.rootUrl).toBeTruthy();
    expect(service.baseUrl).toBeTruthy();
    expect(service.imgUrl).toBeTruthy();
    expect(service.language0).toBeTruthy();
  });
  it('should be set get and delete data', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    service.set('test', 'test');
    expect(service.get('test')).toBe('test');
    service.delete('test');
    expect(service.get('test')).toBeUndefined();
  });
  it('should be set get language', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    service.setLanguage({'Yun Chang': ['云昌']});
    expect(service.getLanguage()['Yun Chang']).toEqual(['云昌']);
  });
  it('should be language to obsvle', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    service.getLanguages().subscribe((lang => {
      expect(lang['Yun Chang']).toEqual(['云昌']);
    }));
    service.setLanguage({'Yun Chang': ['云昌']});
  });
});
