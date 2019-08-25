import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoodsService } from '../goods//goods.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { ValuesService } from '../commons/service/values.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNumber } from 'util';
import { ITreeState } from 'angular-tree-component';
import { Kind } from './classes/kind';
import { AProduct, Product } from './classes/product';
import { Currency } from './classes/currency';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
  providers: [GoodsService]
})
export class GoodsComponent implements OnInit {
  private xlanguageid: number;
  get languageid(): number { return this.xlanguageid; }
  set languageid(langid: number) { this.xlanguageid = langid; }
  private xgoodsClass: Kind;
  get goodsClass(): Kind { return this.xgoodsClass; }
  set goodsClass(gclass: Kind) { this.xgoodsClass = gclass; }
  private xgoods: Product;
  get goods(): Product { return this.xgoods; }
  set goods(goods: Product) { this.xgoods = goods; }
  private currency: Currency[] = [];
  private selRow: number;
  public nodes = [{id: 1, name: 'ss'}];
  @ViewChild('tree', {static: true}) tree;
  get state(): ITreeState {
    return this.ls.get('treeState') && JSON.parse(this.ls.get('treeState'));
  }
  set state(state: ITreeState) {
    this.ls.set('treeState', JSON.stringify(state));
  }

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
    // this.languageid = +this.ls.get('languageid') || 1;
    // this.hs.updateData();
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
      that.nodes = that.hs.makeTreeNodes([], that.goodsClass, that.goods, value);
    });
    this.router.data.subscribe((data: {}) => {
      const sdata = 'data';
      that.goodsClass = data[sdata][0];
      that.goods = data[sdata][1];
      that.currency = data[sdata][2];
      that.nodes = that.hs.makeTreeNodes([], that.goodsClass, that.goods, that.languageid || 1);
    });
    // this.router.queryParams.subscribe(params => {
    this.router.params.subscribe(params => {
      that.selRow = that.router.snapshot.params.id;
      if (that.selRow === undefined || params.id === undefined) {
        that.selRow = +params.id || +that.goodsClass.data[0].item.id;
        // that.nodechoose(that.selRow);
      }
    });
  }

  // 点击了新闻条目
  nodechoose = function(id) {
    // 路由到 news 页面，显示第 i 条新闻
    let name: string;
    let cid: string;
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
  activeNode(id) {
    const node = this.tree.treeModel.getNodeById(id);
    node.expand();
    node.setActiveAndVisible();
  }
}
