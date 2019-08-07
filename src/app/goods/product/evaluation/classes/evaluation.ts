import {Page} from '../../../../commons/provider/page';
import { Grade, GradeData } from './grade';
import { UserGrade } from './user-grade';
import { User, AUser } from './user';
import { Country } from './country';
import { EvalReply } from './eval-reply';
import { AItem } from 'src/app/commons/provider/yrrdb';
export interface EvaluationData {
  id: string;
  proid: number;
  userid: number;
  label: number;
  useideas: string;
  star: number;
  date: string;
  useful: number;
  status: string;
  feelid: number;
  labelids?: number[];
  replyslength?: number;
  replys?: any;
  usergradeimage?: string;
  usergradenames?: string[];
  username?: string;
  countryimage?: string;
  countrynames?: string[];
  userids?: number;
}
export class AEvaluation extends AItem<EvaluationData> {
  static grade: Grade;
  static user: User;
  static country: Country;
  static evalreply: EvalReply;
  static usergrade: UserGrade;
  constructor(data: EvaluationData) {
    super(data);
  }

  makeRecord() {
    this.item.labelids = Evaluation._getLabelIds(this.item.label);
    const grade =  AEvaluation.grade.getByUser(this.item.userid).item;
    this.item.usergradeimage = grade.image;
    this.item.usergradenames = grade.names;
    const xuser = AEvaluation.user.find(this.item.userid);
    this.item.username = xuser.getName();
    const country = AEvaluation.country.find(+xuser.item.country).item;
    this.item.countryimage = country.emoji;
    this.item.countrynames = country.names;
  }

  addReplys() {
    if (AEvaluation.evalreply.data.length > 0) {
      const replys1 = AEvaluation.evalreply.findAllByAttribute('evalid', +this.item.id).reverse();
      let replyslen =  replys1.length;
      this.item.replyslength = replys1.length;
      if (replyslen > 5) {
        replyslen = 5;
      }
      this.item.replys = replys1.slice(0, replyslen);
      for (const rep of this.item.replys) {
        rep.extends();
      }
    } else {
      this.item.replys = [];
    }
  }
}

export class Evaluation {
  private xpages: Page<AEvaluation>[] = [];
  private xcurrenttype: number;
  get currentType(): number { return this.xcurrenttype; }
  set currentType(type: number) { this.xcurrenttype = type; }
  private index = 0;
  private types = [
      {names: ['All evaluation', '所有评价'], amount: 100},
      {names: ['Good', '好评'], amount: 0},
      {names: ['Medium', '中评'], amount: 0},
      {names: ['Poor', '差评'], amount: 0}
  ];

  static _getLabelIds(label: number) {
      // const label: number = this.data[this.index]['label'];
      const result = [];
      let n = 1;
      let i = 1;
      while (n < 1024) {
        if ((n & label ) !== 0) {
          result.push(i);
        }
        n <<= 1;
        i++;
      }
      return result;
  }

  constructor(
    data: EvaluationData[],
    xgrade: Grade,
    xusergrade: UserGrade,
    xuser: User,
    xcountry: Country,
    xevalreply: EvalReply) {
    AEvaluation.grade = xgrade;
    AEvaluation.usergrade = xusergrade;
    AEvaluation.evalreply = xevalreply;
    AEvaluation.user = xuser;
    AEvaluation.country = xcountry;
    const type: [AEvaluation[], AEvaluation[], AEvaluation[], AEvaluation[]] = [[], [], [], []];
    for (const item of data) {
      const rec = new AEvaluation(item);
      type[0].push(rec);
      switch (item.star) {
        case 5:
        case 4:
            type[1].push(rec);
            break;
        case 3:
        case 2:
            type[2].push(rec);
            break;
        case 1:
        case 0:
            type[3].push(rec);
            break;
      }
    }

    for (const i of [0, 1, 2, 3]) {
      this.xpages.push(new Page(type[i]));
    }
    this.xcurrenttype = 0;
  }

  public getRecords(): EvaluationData[] {
    const result = this.xpages[this.xcurrenttype].currentData;
    const evaluationdatas: EvaluationData[] = [];
    for (const res of result) {
      res.makeRecord();
      res.addReplys();
      evaluationdatas.push(res.item);
    }
    return evaluationdatas;
  }

  public datalength() {
      return this.xpages[0].data.length || 0;
  }

  public pageCount() {
    return this.xpages[this.xcurrenttype].count();
  }

  public currentPage() {
    return this.xpages[this.xcurrenttype].current;
  }

  public currentPageSet(n: number) {
    let m = this.xpages[this.xcurrenttype].current;
    if (n === -1) { m--;  // prev Page
    } else if (n === -2) { m++;  // next Page
    } else { m = n; }
    this.xpages[this.xcurrenttype].current = m;
  }
  public find(id: number) {
      for (const rec of this.xpages[0].data) {
          if (+rec.item.id === id) {
              return rec;
          }
      }
      return null;
  }

  public getTypes() {
      return this.types;
  }

  public setTypes() {
      // 评价类型统计
      let sum = 0;
      for (const rec of this.xpages[0].data) {
        const item = rec.item;
        sum += item.star;
        switch (item.star) {
          case 5: // 好评
          case 4:
            this.types[1].amount++ ;
            break;
          case 3:  // 中评
          case 2:
          this.types[2].amount++ ;
          break;
          case 1:  // 差评
          case 0:
          this.types[3].amount++ ;
          break;
        }
      }
      this.types[0].amount = this.xpages[0].data.length;
      const s = sum / this.xpages[0].data.length;
      const s0 = Math.floor(s);
      const s1 = Math.ceil(s - s0);
      const s2 = 5 - s0 - s1;
      return {stars: [new Array(s0), new Array(s1), new Array(s2)], records: this.xpages[0].data.length};
  }

  public rate(index: number) {
    let result = null;
    if (this.types[0].amount > 0 && index && index > 0 && index < this.types.length) {
      const n = this.types[index].amount / this.types[0].amount;
      result = Math.round(n * 100);
    }
    return result;
  }
}
