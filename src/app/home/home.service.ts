import { Injectable } from '@angular/core';
import {RequestService} from '../commons/service/request.service';
import {SettingsService} from '../commons/service/settings.service';
import { Kind } from '../goods/classes/kind';
import { Product } from '../goods/classes/product';
import { of } from 'rxjs';
import { News } from '../news/classes/news';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private requestService: RequestService,
    private cv: SettingsService,
  ) {
  }
  setLanguage(language) {
    this.cv.setLanguage(language);
  }

  public updateData() {
    const that = this;
    const data = [];
    return Promise.all(this.get()).then(rs => {
      const kinds = new Kind(rs[0]);
      const products = new Product(rs[1]);
      const news = new News(rs[2]);
      return of([kinds, products, news]).toPromise();
    });
  }

  get() {
    const success = [
      function (data) {
        return data;
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
      {'? cmd=ProductClass':
          {
            'filter': JSON.stringify(['id', 'parentid', 'names', 'introductions']),
            'token': token
          }
      },
      {'?cmd=Product':
          {
            'filter': JSON.stringify(['id', 'classid', 'size', 'picture']),
            'cond': JSON.stringify([{ 'field': 'homeshow', 'value': 'Y', 'operator': 'eq' }]),
            'token': token
          }
      },
      {'?cmd=News':
          {
            'filter': JSON.stringify(['id', 'titles', 'contents', 'time']),
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
