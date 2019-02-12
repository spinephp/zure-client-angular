import { TestBed, async } from '@angular/core/testing';

import { RequestService } from './request.service';
import {Http, HttpModule, XHRBackend, BaseRequestOptions } from '@angular/http';
import { inject } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
function makeEnvironment() {
  return TestBed.configureTestingModule({
    providers: [
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backend, options) => {
          return new Http(backend, options);
        }, deps: [MockBackend, BaseRequestOptions],
      },
    ],
    imports: [HttpModule],
  });
}
describe('RequestService', () => {
  let service: RequestService;
  let spy: jasmine.Spy;
  let http: Http; // 还应该是DI系统的
  beforeEach(() => {
    const testBed = makeEnvironment();
    http = testBed.get(Http);

    service = new RequestService(http); // 这是自己new出来的
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('获取到的数据为空', async(() => {
    // 这样的使用才是正确的！！！
    spy = spyOn(service, 'get').and.returnValue(Promise.resolve([]));
    service.get('api/test', {search: []}).then(todos => {
      expect(todos.length).toBe(0);
      expect(todos).toEqual([]);
    });
  }));
});
