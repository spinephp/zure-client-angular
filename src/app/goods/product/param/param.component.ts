import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product.component';
import { LocalStorage } from '../../../commons/provider/local-storage';
import { ValuesService } from '../../../commons/service/values.service';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.scss']
})
export class ParamComponent implements OnInit {
  private goods;
  private kind;
  private languageid;
  constructor(
    private _parent: ProductComponent,
    private vs: ValuesService,
    private ls: LocalStorage) {
  }

  ngOnInit() {
    const that = this;
    this.languageid = this.ls.get('languageid') as number | 1;
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
    });
    this.goods = this._parent.aGoods;
    this.kind = this._parent.kind;
  }

}
