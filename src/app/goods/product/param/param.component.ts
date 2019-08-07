import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product.component';
import { LocalStorage } from '../../../commons/provider/local-storage';
import { ValuesService } from '../../../commons/service/values.service';
import { AProduct } from '../../classes/product';
import { Kind } from '../../classes/kind';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.scss']
})
export class ParamComponent implements OnInit {
  private goods: AProduct;
  private kind: Kind[];
  private languageid;
  constructor(
    private xparent: ProductComponent,
    private vs: ValuesService,
    private ls: LocalStorage) {
  }

  ngOnInit() {
    const that = this;
    this.languageid = this.ls.getLanguageId();
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
    });
    this.goods = this.xparent.aGoods;
    this.kind = this.xparent.kind;
  }

}
