import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../goods//goods.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { ValuesService } from '../commons/service/values.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
  providers: [GoodsService]
})
export class GoodsComponent implements OnInit {
  private languageid: number;
  private goodsClass = [];
  private goods = [];
  private currency = [];
  private selRow: number;
  private nodes = [{id: 1, name: 'ss'}];
  options = {};

  constructor(
    private hs: GoodsService,
    private vs: ValuesService,
    private router: ActivatedRoute,
    private route: Router,
    private ls: LocalStorage) {
  }

  ngOnInit() {
    const that = this;
    this.languageid = this.ls.get('languageid') as number | 1;
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
      that.nodes = that.hs.makeTreeNodes([], that.goodsClass, that.goods, value || 1);
    });
    this.router.data.subscribe((data: {}) => {
      that.goodsClass = data['data'][0];
      that.goods = data['data'][1];
      that.currency = data['data'][2];
      that.nodes = that.hs.makeTreeNodes([], that.goodsClass, that.goods, that.languageid || 1);
    });
    this.router.queryParams.subscribe(params => {
      that.selRow = params.id || 0;
    });
  }

  introduction(): string[] {
    const s = this.goodsClass[this.selRow].introductions[this.languageid];
    return s.split('^');
  }
}
