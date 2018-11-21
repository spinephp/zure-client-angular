import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../goods//goods.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { ValuesService } from '../commons/service/values.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNumber } from 'util';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
  providers: [GoodsService]
})
export class GoodsComponent implements OnInit {
  public languageid: number;
  public goodsClass = [];
  public goods = [];
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
    // this.router.queryParams.subscribe(params => {
    this.router.params.subscribe(params => {
        that.selRow = that.router.snapshot.params['id'];
        if (that.selRow === undefined || params.id === undefined) {
        that.selRow = params.id || that.goodsClass[0].id;
        // that.nodechoose(that.selRow);
      }
    });
  }

  // 点击了新闻条目
  nodechoose = function(id) {
    // 路由到 news 页面，显示第 i 条新闻
    let name: String;
    let cid: String;
    if (id[0] === 'p') {
      name = 'product';
      cid = id.slice(1);
    } else {
      name = 'kinds';
      cid = id;
    }
    this.route.navigate(['/products/' + name, cid]);
  };
  nodeActivate(event) {
    this.nodechoose(event.node.id);
  }
}
