import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product.component';
import { EvaluationService } from './evaluation.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  private labels;
  private grades;
  private evaluations = [];
  private consults = [];
  private consultTypes;
  private notes;
  private type;
  private consulttype;
  private users;
  private usergrades = [];
  private countrys;
  private evalreplys = [];
  private replys1 = [];
  private labelkinds = [];
  private replyslen: number;
  private medals = ['🏅', '🥉', '🥈', '🥇', '💎'];
  public languageid;
  constructor(
    private _parent: ProductComponent,
    private is: EvaluationService
  ) {
    this.languageid = this._parent.languageid;
    this.type = 0;
    this.consulttype = 0;
   }

  ngOnInit() {
    const that = this;
    this.is.currentData().subscribe((rs: any) => {
      that.labels = rs[0]; // 产品标签
      that.grades = rs[1]; // 会员级别
      that.evaluations = rs[2]; // 产品评价
      that.notes = rs[3]; // 使用心得
      that.consults = rs[4];
      // 根据评价设置评价类型数据
      // that.evaluations['setTypes']();
      that.evalreplys = rs[5]; // 评价回复
      that.usergrades = rs[6]; // 用户级别
      that.labelkinds = that.is.getLabelKinds(rs[2], rs[0]);
      that.users = rs[7];
      that.countrys = rs[8];
    });
  }
  rate(index): number {
    return this.evaluations['rate'](index);
  }
  starArray(stars) {
    return new Array(stars);
  }
  getRecords(type) {
    let result = [];
    if (this.evaluations) {
      result = this.is.getRecords(this.evaluations, type);
    }
    return result;
  }
  replys(aeval) {
    this.replys1 = this.evalreplys['findByEvalId'](+aeval.id).reverse();
    aeval.replyslength = this.replys1.length;
    aeval.replyslen = this.replys1.length;
    if (aeval.replyslen > 5) {
      aeval.replyslen = 5;
    }
    return this.replys1.splice(0, aeval.replyslen);
  }

}
