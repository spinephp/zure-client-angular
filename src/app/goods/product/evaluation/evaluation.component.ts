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
  private evaluations;
  private notes;
  private type;
  private types;
  private users;
  private usergrades;
  private countrys;
  private evalreplys;
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
    Promise.all(that.is.get(this._parent.aGoods.id)).then(rs => {
      Promise.all(that.is.getSecond(rs[2])).then(rs1 => {
        Promise.all(that.is.getThird(rs[2], rs1[0])).then(rs2 => {
          Promise.all(this.is.getForth(rs2[0])).then(rs3 => {
            that.labels = rs[0]; // 产品标签
            that.grades = rs[1]; // 会员级别
            that.evaluations = rs[2]; // 产品评价
            that.notes = rs[3]; // 使用心得

            // 取评价(id 指定的)标签 id 数组
            that.evaluations.getLabelIds = (id) => {
              const item = that.evaluations.find(id);
              return item.getLabelIds();
            };

            // 根据评价设置评价类型数据
            that.is.setEvaluationTypes(that.types, rs[2]);
            that.evalreplys = rs1[0]; // 评价回复
            that.usergrades = rs1[1]; // 用户级别
            that.grades.getByUser = (userid: number) => {
              const item = that.usergrades['findByUserId'](userid);
              return that.grades.find(+item.gradeid);
            };
            that.labelkinds = that.is.getLabelKinds(rs[2], rs[0]);
            that.evalreplys.getUserName = (replyid: number) => {
              let result = '';
              const reply = that.evalreplys.find(replyid);
              if (reply) {
                const user = that.users.find(reply.userid);
                if (user) {
                  result = user.nick || user.username;
                }
              }
              return result;
            };
            that.users = rs2[0];
            that.countrys = rs3[0];
            that.countrys.getAttribute = (userid: number, name: string) => {
              const item = rs2[0].find(userid);
              const country = rs3[0].find((+item.country));
              return country[name];
            };
            that.countrys.getEmoji = (userid: number) => {
              const item = rs2[0].find(userid);
              const country = rs3[0].find((+item.country));
              return country.emoji;
            };
          });
        });
      });
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
    this.replys1 = this.evalreplys.findByEvalId(+aeval.id).reverse();
    aeval.replyslength = this.replys1.length;
    aeval.replyslen = this.replys1.length;
    if (aeval.replyslen > 5) {
      aeval.replyslen = 5;
    }
    return this.replys1.splice(0, aeval.replyslen);
  }

}
