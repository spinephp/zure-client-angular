import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoodsComponent } from '../goods.component';
import { Router, ActivatedRoute } from '@angular/router';
import {SettingsService} from '../../commons/service/settings.service';
import {IndexService} from './index/index.service';
import { EvaluationService } from './evaluation/evaluation.service';
import { AProduct } from '../classes/product';
import { ValuesService } from 'src/app/commons/service/values.service';
import { LocalStorage } from 'src/app/commons/provider/local-storage';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  public aGoods: AProduct;
  public kind;
  private preNames;
  private buynum;
  private languageid: number;
  private evaluation;
  private rooturl: string;

  constructor(
    private xparent: GoodsComponent,
    private router: ActivatedRoute,
    private route: Router,
    private cv: SettingsService,
    private is: IndexService,
    private es: EvaluationService,
    private vs: ValuesService,
    private ls: LocalStorage
  ) {
    this.buynum = 1;
    this.evaluation = {stars: [[], [], new Array(5)], records: 0};
    this.rooturl = cv.rootUrl;
  }

  ngOnInit() {
    const that = this;
// this.router.queryParams.subscribe(params => {
    // this.languageid = this.ls.getLanguageId();
    this.vs.currentLanguageId().subscribe((value: any) => {
    this.languageid = +value;
  });
    this.es.currentEvaluation().subscribe((value: any) => {
      that.evaluation = value;
    });
    this.router.params.subscribe(params => {
      if (that.xparent && that.xparent.goodsClass && that.xparent.goods) {
        const id = (params.id || that.xparent.goods[0].id);
        that.aGoods = that.xparent.goods.find(id);
        that.kind = that.xparent.goodsClass;
        that.preNames = that.xparent.goodsClass.longNames(that.aGoods.item.classid);
        that.is.setChemicalId(that.aGoods.item.chemicalindex);
        that.cv.set('chemicalid', that.aGoods.item.chemicalindex);
        that.cv.set('physicoid', that.aGoods.item.physicoindex);
        that.es.updateData(id);
        that.xparent.activeNode('p' + id);
      }
    });
      // this.route.navigate(['introduction']);
  }
  ngAfterViewInit() {
  }

}
