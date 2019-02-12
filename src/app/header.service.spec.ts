import { TestBed, inject, async } from '@angular/core/testing';
import {RequestService} from './commons/service/request.service';
import {SettingsService} from './commons/service/settings.service';
import { HeaderService } from './header.service';
import {Http, HttpModule, XHRBackend, BaseRequestOptions } from '@angular/http';
import { LocalStorage } from './commons/provider/local-storage';

describe('HeaderService', () => {
  let service: HeaderService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [  HttpModule ],
    providers: [ RequestService, SettingsService, LocalStorage ]
  }));
  beforeEach(inject([HeaderService], s => {
    service = s;
  }));
  it('should be created', () => {
    // service = TestBed.get(HeaderService);
    expect(service).toBeTruthy();
  });
  it('should return available data', async(() => {
    service.heart().then(res => {
      expect(res.data[0].token).toBeTruthy();
      expect(res.data[0].sessionid).toBeTruthy();
      Promise.all(service.get()).then(rs => {
        // console.log(rs);
        for (const field of ['id', 'names', 'addresses', 'tel', 'fax', 'email', 'qq', 'domain', 'introductions', 'icp']) {
          expect(rs[0][field]).toBeTruthy();
        }
        expect(rs[1].length).toBeGreaterThan(0);
        for (const language of rs[1]) {
          for (const field of ['id', 'name_en']) {
            expect(language[field]).toBeTruthy();
          }
        }
        expect(rs[2].length).toBeGreaterThan(0);
        for (const nav of rs[2]) {
          for (const field of ['id', 'names', 'command']) {
            expect(nav[field]).toBeTruthy();
          }
        }
      });
  });
  }));
});
