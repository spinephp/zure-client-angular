import { TestBed, inject, async } from '@angular/core/testing';
import {RequestService} from '../commons/service/request.service';
import {SettingsService} from '../commons/service/settings.service';
import {Http, HttpModule, XHRBackend, BaseRequestOptions } from '@angular/http';
import { LocalStorage } from '../commons/provider/local-storage';
import { GoodsService } from './goods.service';
import { KindData } from './classes/kind';
import { ProductData } from './classes/product';
import { of } from 'rxjs';

const kinddatas: KindData[] = [
  { id: '1', parentid: 0, names: [], introductions: [], picture: '' }
];

const productdatas: ProductData[]  = [
  {
    'id': '1',
    'classid': 1,
    'size': '12"x24"x10mm',
    'length': 24,
    'width': 12,
    'think': 10,
    'unitlen': '"',
    'unitwid': '"',
    'unitthi': 'mm',
    'picture': '12_24_10.png',
    'unit': 'PCS',
    'sharp': '1',
    'weight': 5.6,
    'price': 16,
    'returnnow': 6,
    'amount': 100,
    'cansale': true,
    'physicoindex': 1,
    'chemicalindex': 1
  }
];

const currencydatas = [
  { id: '0', names: ['rmb', '人民币'], abbreviation: '0', symbol: '$', exchangerate: 1 }
];

describe('GoodsService', () => {
  let service: GoodsService;
  let requestservice;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [  HttpModule ],
    providers: [ RequestService, SettingsService, LocalStorage ]
  }));
  beforeEach(inject([GoodsService], s => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return available data', async(() => {
    requestservice = TestBed.get(RequestService);
    spyOn(requestservice, '_get').and.callFake(() => {
      return [of(kinddatas).toPromise(), of(productdatas).toPromise(), of(currencydatas).toPromise()];
    });
    Promise.all(service.get()).then(rs => {
      // console.log(rs);
      expect(requestservice._get).toHaveBeenCalled();
      expect(requestservice._get).toHaveBeenCalledTimes(1);

      expect(rs[0].length).toBeGreaterThan(0);
      for (const goodsclass of rs[0]) {
        for (const field of ['id', 'parentid', 'names', 'introductions', 'picture']) {
          expect(goodsclass[field]).toBeDefined();
        }
      }
      expect(rs[1].length).toBeGreaterThan(0);

      for (const goods of rs[1]) {
        for (const field of [
          'id', 'classid', 'size', 'length', 'width', 'think',
          'unitlen', 'unitwid', 'unitthi', 'picture', 'unit',
          'sharp', 'weight', 'price', 'returnnow', 'amount',
          'cansale', 'physicoindex', 'chemicalindex'
        ]) {
          expect(goods[field]).toBeDefined();
        }
      }
      expect(rs[2].length).toBeGreaterThan(0);
      // expect(rs[2].choose).toBeDefined();
      for (const currency of rs[2]) {
        for (const field of ['id', 'names', 'abbreviation', 'symbol', 'exchangerate']) {
          expect(currency[field]).toBeDefined();
        }
      }
    });
  }));
});
