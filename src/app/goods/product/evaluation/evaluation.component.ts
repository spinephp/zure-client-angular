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
  private notes;
  private type;
  private types;
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
   }

  ngOnInit() {
    const that = this;
    this.types = [
      {names: ['All evaluation', '所有评价'], amount: 100},
      {names: ['Good', '好评'], amount: 0},
      {names: ['Medium', '中评'], amount: 0},
      {names: ['Poor', '差评'], amount: 0}
    ];
    this.is.currentData().subscribe((rs: any) => {
      that.labels = rs[0]; // 产品标签
      that.grades = rs[1]; // 会员级别
      that.evaluations = rs[2]; // 产品评价
      that.notes = rs[3]; // 使用心得

      // 根据评价设置评价类型数据
      that.is.setEvaluationTypes(that.types, rs[2]);
      that.evalreplys = rs[4]; // 评价回复
      that.usergrades = rs[5]; // 用户级别
      that.labelkinds = that.is.getLabelKinds(rs[2], rs[0]);
      that.users = rs[6];
      that.countrys = rs[7];
    });
  }
  rate(index): number {
    if (this.types[0].amount === 0) {
      return null;
    } else {
      if (index > 0) {
        const result = this.types[index].amount / this.types[0].amount;
        return result * 100;
      }
    }
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
