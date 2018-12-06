import { Component, OnInit } from '@angular/core';
import { GoodsComponent } from '../goods.component';
import { Router, ActivatedRoute } from '@angular/router';
import {SettingsService} from '../../commons/service/settings.service';
import {IndexService} from './index/index.service';
import { EvaluationService } from './evaluation/evaluation.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public aGoods;
  public kind;
  private preNames;
  private buynum;
  public languageid;
  private evaluation;
  constructor(
    private _parent: GoodsComponent,
    private router: ActivatedRoute,
    private route: Router,
    private cv: SettingsService,
    private is: IndexService,
    private es: EvaluationService
  ) {
    this.buynum = 1;
    this.languageid = this._parent.languageid;
    this.evaluation = {stars: [[], [], new Array(5)], records: 0};
   }

  ngOnInit() {
    const that = this;
    // this.router.queryParams.subscribe(params => {
      this.es.currentEvaluation().subscribe((value: any) => {
        that.evaluation = value;
      });
      this.router.params.subscribe(params => {
      const id = params.id || that._parent.goods[0].id;
      that.aGoods = that._parent.goods.find(id);
      that.kind = that._parent.goodsClass;
      that.preNames = that._parent.goodsClass['longNames'](that.aGoods.classid);
      that.is.setChemicalId(that.aGoods.chemicalindex);
      that.cv.set('chemicalid', that.aGoods.chemicalindex),
      that.cv.set('physicoid', that.aGoods.physicoindex);
    });
    // this.route.navigate(['introduction']);
  }

}
