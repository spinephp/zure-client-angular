import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '../../../translate.pipe';
import { ProductComponent } from '../product.component';

import { ParamComponent } from './param.component';
import { UnitPipe } from 'src/app/unit.pipe';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { LocalStorage } from 'src/app/commons/provider/local-storage';
import { Kind } from '../../classes/kind';
import { ProductData, Product } from '../../classes/product';

const kinddata = [
  {id: '1',
  parentid: 0, names: ['Si3N4 bonded SiC Products', '氮化硅结合碳化硅制品'], introductions: ['SiC Castables', '碳化硅浇注料'], picture: '1_4.png'},
  {id: '2',
  parentid: 0, names: ['Oxide bonded SiC Products', '氧化物结合碳化硅制品'], introductions: ['SiC Castables', '碳化硅浇注料'], picture: '1_4.png'},
  {id: '3', parentid: 0, names: ['SiC Castables', '碳化硅浇注料'], introductions: ['SiC Castables', '碳化硅浇注料'], picture: '1_4.png'},
  {
      id: '4',
      parentid: 1,
      names: ['Slab', '棚板'],
      introductions: [
          'Silicon nitride combined with silicon carbide plate is widely used in daily-use ceramics',
          '氮化硅结合碳化硅棚板广泛应用于日用陶瓷业、卫生陶瓷业'
      ],
      picture: '1_4.png'
  },
  {
      id: '5',
      parentid: 1,
      names: ['brick', '砖'],
      introductions: [
          'Is mainly made of silicon nitride combined with silicon carbide products',
          '以氮化硅为主要结合相的碳化硅制品。一般含碳化硅70%～75%'],
          picture: '1_5.png'
      },
  {id: '6', parentid: 1, names: ['other', '其它'], introductions: ['other', '包括氮化硅结合碳化硅'], picture: '1_4.png'},
];

const productdatas: ProductData[]  = [
  {
    id: '1',
    classid: 1,
    size: '12"x24"x10mm',
    length: 24,
    width: 12,
    think: 10,
    unitlen: '"',
    unitwid: '"',
    unitthi: 'mm',
    picture: '12_24_10.png',
    unit: 'PCS',
    sharp: '1',
    weight: 5.6,
    price: 16,
    returnnow: 6,
    amount: 100,
    cansale: true,
    physicoindex: 1,
    chemicalindex: 1
  }
];

@Component({
  selector: 'app-product',
  template: '<div></div>'
})
class SpyProductComponent {
  public aGoods;
  public kind;
  constructor() {
   const product = new Product(productdatas);
   this.aGoods = product.data[0];
   this.kind = new Kind(kinddata);
 }}

describe('ParamComponent', () => {
  let component: ParamComponent;
  let fixture: ComponentFixture<ParamComponent>;
  let element1;
  let translate;
  let unit;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorage,
        TranslatePipe,
        UnitPipe,
        // ProductComponent,
        {provide: ProductComponent, useClass: SpyProductComponent},
      ],
      declarations: [ ParamComponent, TranslatePipe, UnitPipe, ProductComponent ],
      schemas: [ NO_ERRORS_SCHEMA ] // 路由至新页面时，忽略组件没加载错误
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamComponent);
    component = fixture.componentInstance;
    element1 = fixture.nativeElement;
    const injector = fixture.debugElement.injector;
    translate = injector.get(TranslatePipe);
    unit = injector.get(UnitPipe);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a parameters table', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();        // update view with quote
      const s = element1.querySelectorAll('.table');
      const languageid = 1;
      const heads = ['Item ID', 'Item Name', 'Item ID', 'Item Name'];
      const bodys = [
        [
          translate.transform('Material'),
          translate.transform(['Si3N4 bonded SiC ', '氮化硅结合碳化硅']),
          translate.transform('Length'),
          productdatas[0].length + ' ' + unit.transform(productdatas[0].unitlen, languageid)
        ],
        [
          translate.transform('Type'),
          translate.transform(['Si3N4 bonded SiC Products', '氮化硅结合碳化硅制品']),
          translate.transform('Width'),
          productdatas[0].width + ' ' + unit.transform(productdatas[0].unitwid, languageid)
        ],
        [
          translate.transform('Weight'),
          productdatas[0].weight + 'kg',
          translate.transform('Think'),
          productdatas[0].think + ' ' + unit.transform(productdatas[0].unitthi, languageid)
        ]
      ];
      // console.log(s);
      expect(s).toBeDefined();
      expect(s[0].localName).toBe('table');
      expect(s[0].childNodes[0].localName).toBe('thead');
      expect(s[0].childNodes[0].childNodes[0].localName).toBe('tr');
      const ths = s[0].childNodes[0].childNodes[0].childNodes;
      expect(ths.length).toBe(heads.length);
      for (let i = 0; i < ths.length; i++) {
        expect(ths[i].localName).toBe('th');
        expect(ths[i].childNodes[0].data).toBe(translate.transform(heads[i]));
      }

      expect(s[0].childNodes[1].localName).toBe('tbody');
      const trs = s[0].childNodes[1].childNodes;
      expect(trs.length).toBe(bodys.length);
      for (let m = 0; m < trs.length; m++) {
        expect(trs[m].localName).toBe('tr');
        expect(trs[m].childNodes.length).toBe(bodys[m].length);
        const tds = trs[m].childNodes;
        for (let n = 0; n < tds.length; n++) {
          expect(tds[n].localName).toBe('td');
          expect(tds[n].childNodes[0].data).toBe(bodys[m][n]);
        }
      }
    });
  }));
});
