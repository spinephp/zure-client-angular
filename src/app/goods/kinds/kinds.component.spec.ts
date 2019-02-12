import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TranslatePipe } from '../../translate.pipe';
import { LocalStorage } from '../../commons/provider/local-storage';
import { ValuesService } from '../../commons/service/values.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { GoodsModule } from '../goods.module';
import { GoodsComponent } from '../goods.component';
import { KindsComponent } from './kinds.component';
import { of } from 'rxjs';
import {Location} from '@angular/common';
import { Component } from '@angular/core';
import { Kind } from '../classes/kind';

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

@Component({
  selector: 'app-product',
  template: '<div></div>'
})
class SpyGoodsComponent {
  public aGoods;
  public goodsClass: Kind = new Kind(kinddata);
  public languageid = 1;
  activeNode(id) {
  }
}

describe('KindsComponent', () => {
  let component: KindsComponent;
  let fixture: ComponentFixture<KindsComponent>;
  let element;
  let de;
  let translate;
  let vs;
  let router: Router;
  let location: Location;
  let goodscomponect;

  // const goodsClass = [{
  //     id: 1,
  //     names: ['english', '中文'],
  //     introductions: ['aaaa', '氮化硅结合碳化硅']
  //   }];
  //   goodsClass['find'] = function(id) { return goodsClass[0]; };
  //   goodsClass['longNames'] = function(id) { return goodsClass[0].names; };

    const fakeActivatedRoute = {
      snapshot: {params: {id: 1}},
      params: of({'id': 1}),
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        GoodsModule
      ],
      // declarations: [ GoodsComponent ],
      providers: [
        TranslatePipe,
        ValuesService,
        // TreeDraggedElement,
        LocalStorage,
        // {provide: Location, useClass: SpyLocation},
        { provide: GoodsComponent, useClass: SpyGoodsComponent},
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        // {provide: Router, useClass: RouterStub},
        // GoodsComponent
      ]
    });
  }));
  // beforeEach(async(() => {
  //   TestBed.overrideModule(BrowserDynamicTestingModule, {
  //     set: {
  //     entryComponents: [
  //       GoodsComponent,
  //     ]
  //     }
  //     });
  // }));
  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(KindsComponent);
      // advance();

      component = fixture.componentInstance;
      element = fixture.nativeElement;
      de = fixture.debugElement;
      const injector = fixture.debugElement.injector;
      translate = injector.get(TranslatePipe);
      vs = injector.get(ValuesService);
      location = injector.get(Location);
      console.log(location.path());
      router = injector.get(Router);
      goodscomponect = injector.get(GoodsComponent);
      spyOn(goodscomponect.goodsClass, 'find').and.returnValue(goodscomponect.goodsClass.data[0]);
      spyOn(goodscomponect.goodsClass, 'longNames').and.callThrough();
      spyOn(goodscomponect, 'activeNode');
      // router.initialNavigation();
      // router.navigateByUrl('/products/kinds/1');
      fixture.detectChanges();
      });
}));

  function advance(): void {
    // flush();
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called some function', () => {
    expect(goodscomponect.goodsClass.find).toHaveBeenCalled();
    expect(goodscomponect.goodsClass.longNames).toHaveBeenCalled();
    expect(goodscomponect.activeNode).toHaveBeenCalled();

    expect(goodscomponect.goodsClass.find).toHaveBeenCalledWith(1);
    expect(goodscomponect.goodsClass.longNames).toHaveBeenCalledWith(1);
    expect(goodscomponect.activeNode).toHaveBeenCalledWith(1);
  });

  it('introduction should be called', () => {
    spyOn(component, 'introduction');
    fixture.detectChanges();
    expect(component.introduction).toHaveBeenCalled();
    expect(component.introduction).toHaveBeenCalledTimes(2);
  });

  it('should be redered', () => {
    const title = element.querySelectorAll('h4');
    const prename = kinddata[0].names[goodscomponect.languageid];
    expect(title.length).toEqual(2);
    expect(title[0].textContent).toBe(prename);
    expect(title[1].textContent).toBe('Profile');

    const text = element.querySelectorAll('p');
    expect(text.length).toEqual(1);
    expect(text[0].textContent).toBe(kinddata[0].introductions[goodscomponect.languageid]);
  });
});
