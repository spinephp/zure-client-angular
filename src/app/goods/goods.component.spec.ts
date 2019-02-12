import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AppModule } from '../app.module';
import { GoodsModule } from './goods.module';
// import { AppRoutingModule, rootroutes } from '../app-routing.module';
// import { GoodsRoutingModule, routes } from './goods-routing.module';
import { TranslatePipe } from '../translate.pipe';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { LocalStorage } from '../commons/provider/local-storage';
import { ValuesService } from '../commons/service/values.service';
import { GoodsService } from './goods.service';
import { GoodsComponent } from './goods.component';
// import { TreeModule, TreeDraggedElement} from 'angular-tree-component';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
// import { GoodsRoutingModule} from './goods-routing.module';
// import { KindsComponent } from './kinds/kinds.component';
// import { ProductComponent } from './product/product.component';
// import { IntroductionComponent } from './product/introduction/introduction.component';
// import { ParamComponent } from './product/param/param.component';
// import { IndexComponent } from './product/index/index.component';
// import { EvaluationModule } from './product/evaluation/evaluation.module';
// import { UnitPipe } from '../unit.pipe';
import { AppComponent } from '../app.component';
import { of } from 'rxjs';
import {APP_BASE_HREF} from '@angular/common';
import { Kind, KindData, AKind } from './classes/kind';
import { ProductData, Product, AProduct } from './classes/product';
import { Currency } from './classes/currency';
describe('GoodsComponent', () => {
  let fixture;
  let component: GoodsComponent;
  let element;
  let de;
  let translate;
  let vs;
  class RouterStub {
    navigateByUrl(url: string) {
      return url;
    }
  }

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

  const fakeActivatedRoute = {
    snapshot: {params: {id: 1}},
    params: of({'id': 1}),
    data: of({data: [new Kind(kinddatas), new Product(productdatas), new Currency(currencydatas)]})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        // RouterTestingModule.withRoutes(routes),
        AppModule,
        // GoodsModule,
        // TreeModule,
        // HttpModule,
        // GoodsRoutingModule,
        // EvaluationModule
      ],
      declarations: [
        // GoodsComponent,
        // KindsComponent,
        // ProductComponent,
        // IntroductionComponent,
        // ParamComponent,
        // IndexComponent,
        // UnitPipe
      ],
      providers: [
        TranslatePipe,
        ValuesService,
        GoodsService,
        // TreeDraggedElement,
        LocalStorage,
        // Router,
        // ActivatedRoute,
        // { provide: Router, useClass: RouterModule},
        // { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        // { provide: Router, useClass: RouterStub }
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    });
  }));

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
      entryComponents: [
        AppComponent,
      ]
      }
      });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoodsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
    translate = fixture.debugElement.injector.get(TranslatePipe);
    vs = fixture.debugElement.injector.get(ValuesService);
    fixture.detectChanges();
  }));

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('should show quote after getQuote promise (async)', async(() => {
    // fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote
      expect(component.goodsClass).toBeDefined();
      for (const field of ['id', 'parentid', 'names', 'introductions', 'picture']) {
        const akind: AKind = component.goodsClass['data'][0];
        expect(akind.item[field]).toBeDefined();
      }
      expect(component.goods).toBeDefined();
      for (const field of ['id', 'classid', 'size', 'length', 'width', 'think',
      'unitlen', 'unitwid', 'unitthi', 'picture', 'unit',
      'sharp', 'weight', 'price', 'returnnow', 'amount',
      'cansale', 'physicoindex', 'chemicalindex']) {
        const aproduct: AProduct = component.goods['data'][0];
        expect(aproduct.item[field]).toBeDefined();
      }
    });
  }));
});
