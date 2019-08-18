import { Injectable } from '@angular/core';
import {RequestService} from '../commons/service/request.service';
import {SettingsService} from '../commons/service/settings.service';
import { Kind } from '../goods/classes/kind';
import { Product } from '../goods/classes/product';
import { of } from 'rxjs';
import { News } from '../news/classes/news';
// import { Userlogin } from './classes/userlogin';

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
    const ps = [
      this.requestService.getUrl(
        'ProductClass',
        ['id', 'parentid', 'names', 'introductions'],
      ),
      this.requestService.getUrl(
        'Product',
        ['id', 'classid', 'size', 'picture'],
        [{ field: 'homeshow', value: 'Y', operator: 'eq' }]
      ),
      this.requestService.getUrl(
        'News',
        ['id', 'titles', 'contents', 'time'],
      ),
    ];
    return this.requestService._get(ps);
  }

  // login(param: Userlogin) {
  //   return this.requestService.post('/woo/index.php?cmd=CheckLogin', JSON.stringify(param)).then(rs => {
  //     return rs;
  //   });
  // }
}
