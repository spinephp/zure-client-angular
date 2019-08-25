import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { TranslatePipe } from 'src/app/translate.pipe';
import { Component } from '@angular/core';
import { ProductData, Product } from '../classes/product';
import { Kind } from '../classes/kind';
import { GoodsComponent } from '../goods.component';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IndexService } from './index/index.service';
import { SettingsService } from 'src/app/commons/service/settings.service';
import { EvaluationService } from './evaluation/evaluation.service';

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
  template: `<div class="col-md-9 column">
  <router-outlet></router-outlet>
</div>`
})
class SpyGoodsComponent {
  public goods: Product;
  public goodsClass: Kind;
  public languageid;
  constructor() {
   this.goods = new Product(productdatas);
   this.goodsClass = new Kind(kinddata);
   this.languageid = 1;
 }
 activeNode(id) {
  }
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let goodscomponent;
  let indexservice;
  let settingsservice;
  let evaluationservice: EvaluationService;

  const fakeActivatedRoute = {
    snapshot: {params: {id: 1}},
    params: of({id: 1}),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
        // ProductComponent
      ],
      providers: [
        // RequestService,
        // LocalStorage,
        // SettingsService,
        // IndexService,
        TranslatePipe,
        {provide: GoodsComponent, useClass: SpyGoodsComponent},
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    goodscomponent = fixture.debugElement.injector.get(GoodsComponent);
    indexservice = fixture.debugElement.injector.get(IndexService);
    settingsservice = fixture.debugElement.injector.get(SettingsService);
    evaluationservice = fixture.debugElement.injector.get(EvaluationService);
    spyOn(goodscomponent, 'activeNode');
    spyOn(goodscomponent.goods, 'find').and.callThrough();
    spyOn(goodscomponent.goodsClass, 'longNames').and.callThrough();
    spyOn(indexservice, 'setChemicalId').and.callThrough();
    spyOn(settingsservice, 'set').and.callThrough();
    spyOn(evaluationservice, 'updateData').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function should be called', () => {
    expect(goodscomponent.goods.find).toHaveBeenCalled();
    expect(goodscomponent.goods.find).toHaveBeenCalledTimes(1);
    expect(goodscomponent.goods.find).toHaveBeenCalledWith(1);

    expect(goodscomponent.goodsClass.longNames).toHaveBeenCalled();
    expect(goodscomponent.goodsClass.longNames).toHaveBeenCalledTimes(1);
    expect(goodscomponent.goodsClass.longNames).toHaveBeenCalledWith(productdatas[0].classid);

    expect(indexservice.setChemicalId).toHaveBeenCalled();
    expect(indexservice.setChemicalId).toHaveBeenCalledTimes(1);
    expect(indexservice.setChemicalId).toHaveBeenCalledWith(productdatas[0].chemicalindex);

    expect(settingsservice.set).toHaveBeenCalled();
    expect(settingsservice.set).toHaveBeenCalledTimes(2);
    expect(settingsservice.set).toHaveBeenCalledWith('chemicalid', productdatas[0].chemicalindex);
    expect(settingsservice.set).toHaveBeenCalledWith('physicoid', productdatas[0].physicoindex);

    expect(evaluationservice.updateData).toHaveBeenCalled();
    expect(evaluationservice.updateData).toHaveBeenCalledTimes(1);
    expect(evaluationservice.updateData).toHaveBeenCalledWith(1);

    expect(goodscomponent.activeNode).toHaveBeenCalled();
    expect(goodscomponent.activeNode).toHaveBeenCalledTimes(1);
    expect(goodscomponent.activeNode).toHaveBeenCalledWith('p1');
  });
});
