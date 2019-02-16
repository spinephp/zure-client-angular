import { Injectable } from '@angular/core';
import {RequestService} from '../commons/service/request.service';
import {SettingsService} from '../commons/service/settings.service';
import { findNode } from '@angular/compiler';
import { isNumber } from 'util';
import { Kind } from './classes/kind';
import { Product } from './classes/product';
import { Currency } from './classes/currency';
import { Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  private _data: Subject<any> = new Subject<any>();

  constructor(
    private requestService: RequestService,
    private cv: SettingsService,
  ) {
  }
  findParent(parentid, nodes) {
    for (const node of nodes) {
      if (+node.id === parentid) {
        return node;
      } else if (node.children) {
        const findnode = this.findParent(parentid, node.children);
        if (findnode) {return findnode; }
      }
    }
    return null;
  }
  makeTreeNodes(nodes, goodsClass, goods, languageid): [] {
    for (const akind of goodsClass.data) {
      const ci = {id: akind.item.id, name: akind.item.names[languageid], children: []};
      const findnode = this.findParent(akind.item.parentid, nodes);
      if (findnode) {
        findnode.children.push(ci);
      } else {
        nodes.push(ci);
      }
    }
    return this.makeTreeProduct(nodes, goods);
  }
  makeTreeProduct(nodes, products): [] {
    for (const aproduct of products.data) {
      const ci = {id: 'p' + aproduct.item.id, name: aproduct.item.size};
      const findnode = this.findParent(aproduct.item.classid, nodes);
      if (findnode) {
        if (findnode.children) {
          findnode.children.push(ci);
        } else {
          findnode.children = [ci];
        }
      }
    }
    return nodes;
  }
  setLanguage(language) {
    this.cv.setLanguage(language);
  }

  public currentData(): Observable<any> {
    return this._data.asObservable();
  }

  public updateData() {
    const that = this;
    const data = [];
    return Promise.all(this.get()).then(rs => {
      const kinds = new Kind(rs[0]);
      const products = new Product(rs[1]);
      const currencys = new Currency(rs[2]);
      return of([kinds, products, currencys]).toPromise();
    });
  }

  get() {
    const success = [
      function (data) {
        return data;
      },

      function (data) {
        data.find = function(id) {
          const cid = +id;
          if (cid > 0) {
            for (const pn in data) {
              if (+data[ pn ].id === cid) {
                return data[pn];
              }
            }
          }
          return null;
        };
        return data;
      },

      function (data) {
        data.choose = function(i) {
          // $location.path('/ShowNews').search({id: i});
          this.router.navigate(['ShowNews'], { queryParams: { id: 1 } });
        };
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
            'filter': JSON.stringify(['id', 'parentid', 'names', 'introductions', 'picture']),
            'token': token
          }
      },
      {'?cmd=Product':
          {
            'filter': JSON.stringify([
              'id', 'classid', 'size', 'length', 'width', 'think',
              'unitlen', 'unitwid', 'unitthi', 'picture', 'unit',
              'sharp', 'weight', 'price', 'returnnow', 'amount',
              'cansale', 'physicoindex', 'chemicalindex'
            ]),
            'token': token
          }
      },
      {'?cmd=Currency':
          {
            'filter': JSON.stringify(['id', 'names', 'abbreviation', 'symbol', 'exchangerate']),
            'token': token
          }
      }
    ];
    return this.requestService._get(ps, this.cv.baseUrl);

    // const promises = [];
    // for (const i of Object.keys(ps)) {
    //   for (const k of Object.keys(ps[i])) {
    //     promises.push(this.requestService.get(this.cv.baseUrl + k, ps[i][k]).then(success[i], error));
    //   }
    // }
    // return promises;
  }
}
