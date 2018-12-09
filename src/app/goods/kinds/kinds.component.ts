import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoodsComponent } from '../goods.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GoodsService } from '../../goods//goods.service';

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
    //this.router.queryParams.subscribe(params => {
    this.router.params.subscribe(params => {
      const id = params.id || that._parent.goodsClass[0].id;
      that.aGoodsClass = that._parent.goodsClass.find(id);
      that.preNames = that._parent.goodsClass['longNames'](id);
      const node = that._parent.tree.treeModel.getNodeById(id);
      node.expand();
      node.setActiveAndVisible();
      });
  }
  ngAfterViewInit() {
  }
  introduction(): string[] {
    const s = this.aGoodsClass.introductions[this._parent.languageid];
    return s.split('^');
  }

}
