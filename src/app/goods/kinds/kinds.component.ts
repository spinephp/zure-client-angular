import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoodsComponent } from '../goods.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GoodsService } from '../../goods//goods.service';
import { AKind } from '../classes/kind';
import { SettingsService } from 'src/app/commons/service/settings.service';

@Component({
  selector: 'app-kinds',
  templateUrl: './kinds.component.html',
  styleUrls: ['./kinds.component.scss']
})
export class KindsComponent implements OnInit, AfterViewInit {
  private selId: number;
  private aGoodsClass;
  private preNames: string;
  private rooturl: string;
  constructor(
    private xparent: GoodsComponent,
    private router: ActivatedRoute,
    private hs: GoodsService,
    private cv: SettingsService,
  ) {
    this.rooturl = cv.rootUrl;
  }

  ngOnInit() {
    const that = this;
    // this.router.queryParams.subscribe(params => {
    this.router.params.subscribe(params => {
      const id = params.id || that.xparent.goodsClass.data[0].item.id;
      that.aGoodsClass = that.xparent.goodsClass.find(id);
      that.preNames = that.xparent.goodsClass.longNames(id)[that.xparent.languageid];
      that.xparent.activeNode(id);
      });
  }
  ngAfterViewInit() {
  }
  introduction(): string[] {
    let result = [];
    if (this.aGoodsClass) {
      const s = this.aGoodsClass.item.introductions[this.xparent.languageid];
      if (s) {
        result = s.split('^');
      }
    }
    return result;
  }

}
