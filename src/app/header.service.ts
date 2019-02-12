import { Injectable } from '@angular/core';
import {RequestService} from './commons/service/request.service';
import {SettingsService} from './commons/service/settings.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private requestService: RequestService, private cv: SettingsService) {
    cv.setLanguage({});
  }
  heart() {
    return this.requestService.get(this.cv.baseUrl + '?cmd=IsLogin', undefined)
    .then(res => {
      return res;
    }, res => {
      return res;
    });
  }
  get() {
    const success = [
      function (data) {
        data[0].introduction = function (languaeid) {
          const doc = data[0].introductions[this.cv.languageid];
          return doc.split('^');
        };
        return data[0];
      },
      function (data) {
        return data;
      },
      function (data) {
        return data;
      }
    ];
    function error(err) {
      alert('error occured!\n' + err);
    }
    const token = this.cv.sessionid;

    const ps = [
      {'?cmd=Qiye':
          {
            'filter': JSON.stringify(['id', 'names', 'addresses', 'tel', 'fax', 'email', 'qq', 'domain', 'introductions', 'icp']),
            'token': token
          }
      },
      {'?cmd=Language':
          {
            'filter': JSON.stringify(['id', 'name_en']),
            'token': token
          }
      },
      {'?cmd=Navigation':
          {
            'filter': JSON.stringify(['id', 'names', 'command']),
            'token': token
          }
      }
    ];

    const promises = [];
    for (const i of Object.keys(ps)) {
      for (const k of Object.keys(ps[i])) {
        promises.push(this.requestService.get(this.cv.baseUrl + k, ps[i][k]).then(success[i], error));
      }
    }
    return promises;
  }
}
