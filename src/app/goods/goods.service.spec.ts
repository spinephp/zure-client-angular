import { TestBed, inject, async } from '@angular/core/testing';
import {RequestService} from '../commons/service/request.service';
import {SettingsService} from '../commons/service/settings.service';
import {Http, HttpModule, XHRBackend, BaseRequestOptions } from '@angular/http';
import { LocalStorage } from '../commons/provider/local-storage';
import { GoodsService } from './goods.service';

describe('GoodsService', () => {
  let service: GoodsService;
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
    Promise.all(service.get()).then(rs => {
      // console.log(rs);
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
      expect(rs[2].choose).toBeDefined();
      for (const currency of rs[2]) {
        for (const field of ['id', 'names', 'abbreviation', 'symbol', 'exchangerate']) {
          expect(currency[field]).toBeDefined();
        }
      }
    });
  }));
});
