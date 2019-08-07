import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from '../product.component';
import { TranslatePipe } from '../../../translate.pipe';
import {APP_BASE_HREF} from '@angular/common';

import { IntroductionComponent } from './introduction.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Kind } from '../../classes/kind';
import { Component } from '@angular/core';
import { GoodsComponent } from '../../goods.component';
import { LocalStorage } from 'src/app/commons/provider/local-storage';
import { HttpModule, Http } from '@angular/http';

@Component({
  selector: 'app-product',
  template: '<div></div>'
})

class SpyGoodsComponent {
  // public aGoods;
  // public goodsClass: Kind = new Kind(kinddata);
  public languageid = 1;
  // activeNode(id) {
  // }
}

describe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  const fakeActivatedRoute = {
    snapshot: {params: {id: 1}},
    params: of({id: 1}),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        ProductComponent,
        LocalStorage,
        // Router,
        // { provide: Router, useClass: RouterModule},
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        { provide: GoodsComponent, useClass: SpyGoodsComponent},
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      declarations: [ IntroductionComponent, TranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
