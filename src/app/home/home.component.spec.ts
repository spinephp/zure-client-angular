import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { KindData, Kind } from '../goods/classes/kind';
import { ProductData, Product } from '../goods/classes/product';
import { of } from 'rxjs';
import { News, NewsData } from '../news/classes/news';

const qiyedata = {
  id: '1',
  names: ['LIANYUNGANG YUNRUI REFRACTORY CO,.LTD', '连云港云瑞耐火材料有限公司'],
  addresses: ['12 Taishan Road,Lianyungang Eco. &amp; Tech. Developme', '江苏连云港经济技术开发区泰山路12号'],
  domain: 'http://www.yrr8.com',
  email: 'admin@yrr8.com',
  fax: '+86 518 82340137',
  icp: '苏ICP备1201145号',
  introductions: [
    'YunRui refractories co., LTD is a manufacturer specialized in the production',
    '　　连云港云瑞耐火材料有限公司系生产碳化硅耐火制品的专业厂家，年生产能力2000吨。'
  ],
  qq: '2531841386',
  tel: '+86 518 82340137',
  };

const kinddatas = [
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

const newsdatas: NewsData[] = [
    {
      id: '65',
      titles: ['The new website is formal open-minded', '改制后的新网站正式开通了'],
      contents: ['The new website which it is my company strypped-down is formal open-minded.', '我公司改制后的新网站正式开通了，欢迎新老客户光临访问。'],
      time: '2012-02-28'
    }
  ];

const fakeActivatedRoute = {
    snapshot: {params: {id: 1}},
    params: of({id: 1}),
    data: of({data: [new Kind(kinddatas), new Product(productdatas), new News(newsdatas)]})
  };

@Component({
  selector: 'app-product',
  template: `<div class='col-md-9 column'>
  <router-outlet></router-outlet>
</div>`
})
class SpyAppComponent {
  public qiye: object;
  constructor() {
    this.qiye = qiyedata;
 }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
        // HomeComponent
      ],
      providers: [
        {provide: AppComponent, useClass: SpyAppComponent},
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: APP_BASE_HREF, useValue : '/' }

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
