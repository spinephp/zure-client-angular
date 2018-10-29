import { Injectable } from '@angular/core';
import {RequestService} from './commons/service/request.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private requestService: RequestService) { }
  isFirst() {
    return this.requestService.get('?cmd=IsLogin', undefined)
    .then(res => {
      return res;
    }, res => {
      return res;
    });
  }
  get(languageid, token) {
    const success = [
      function (data) {
        data[0].introduction = function (languaeid) {
          const doc = data[0].introductions[languageid];
          return doc.split('^');
        }
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

    const ps = [
      {'?cmd=Qiye':
          {
            'filter': JSON.stringify(['id', 'names', 'addresses', 'tel', 'fax', 'email', 'domain', 'introudctions', 'icp']),
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
    for(var i in ps) {
      for(var k in ps[i]) {
        promises.push(this.requestService.get(k, ps[i][k]).then(success[i], error));
      }
    }
    return promises;
  }
}
