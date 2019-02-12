import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoodsComponent } from '../goods.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GoodsService } from '../../goods//goods.service';
import { AKind } from '../classes/kind';

@Component({
  selector: 'app-kinds',
  templateUrl: './kinds.component.html',
  styleUrls: ['./kinds.component.scss']
})
export class KindsComponent implements OnInit, AfterViewInit {
  private selId: number;
  private aGoodsClass;
  private preNames: String;

  constructor(
    private _parent: GoodsComponent,
    private router: ActivatedRoute,
    private hs: GoodsService,

  ) { }

  ngOnInit() {
    const that = this;
    // this.router.queryParams.subscribe(params => {
    this.router.params.subscribe(params => {
      const id = params.id || that._parent.goodsClass.data[0]['item']['id'];
      that.aGoodsClass = that._parent.goodsClass.find(id);
      that.preNames = that._parent.goodsClass.longNames(id)[that._parent.languageid];
      that._parent.activeNode(id);
      });
  }
  ngAfterViewInit() {
  }
  introduction(): string[] {
    let result = [];
    if (this.aGoodsClass) {
      const s = this.aGoodsClass.item.introductions[this._parent.languageid];
      if (s) {
        result = s.split('^');
      }
    }
    return result;
  }

}
