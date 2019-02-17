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
    this.item.labelids = Evaluation._getLabelIds(this.item['label']);
    const grade =  AEvaluation.grade.getByUser(this.item['userid']).item;
    this.item['usergradeimage'] = grade.image;
    this.item['usergradenames'] = grade.names;
    const _user = AEvaluation.user.find(this.item['userid']);
    this.item['username'] = _user.getName();
    const country = AEvaluation.country.find(+_user.item.country).item;
    this.item['countryimage'] = country.emoji;
    this.item['countrynames'] = country.names;
  }

  addReplys() {
    if (AEvaluation.evalreply.data.length > 0) {
      const replys1 = AEvaluation.evalreply.findAllByAttribute('evalid', +this.item['id']).reverse();
      let replyslen =  replys1.length;
      this.item['replyslength'] = replys1.length;
      if (replyslen > 5) {
        replyslen = 5;
      }
      this.item['replys'] = replys1.slice(0, replyslen);
      for (const rep of this.item['replys']) {
        rep.extends();
      }
    } else {
      this.item['replys'] = [];
    }
  }
}

export class Evaluation {
  private _pages: Page<AEvaluation>[] = [];
  private _currenttype: number;
  get currentType(): number { return this._currenttype; }
  set currentType(type: number) { this._currenttype = type; }
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
        if ((n & label) !== 0) {
          result.push(i);
        }
        n <<= 1;
        i++;
      }
      return result;
  }

  constructor(
    data: EvaluationData[],
    _grade: Grade,
    _usergrade: UserGrade,
    _user: User,
    _country: Country,
    _evalreply: EvalReply) {
    AEvaluation.grade = _grade;
    AEvaluation.usergrade = _usergrade;
    AEvaluation.evalreply = _evalreply;
    AEvaluation.user = _user;
    AEvaluation.country = _country;
    const type: [AEvaluation[], AEvaluation[], AEvaluation[], AEvaluation[]] = [[], [], [], []];
    for (const item of data) {
      const rec = new AEvaluation(item);
      type[0].push(rec);
      switch (item['star']) {
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
      this._pages.push(new Page(type[i]));
    }
    this._currenttype = 0;
  }

  public getRecords(): EvaluationData[] {
    const result = this._pages[this._currenttype].currentData;
    const evaluationdatas: EvaluationData[] = [];
    for (let i = 0; i < result.length; i++) {
      result[i].makeRecord();
      result[i].addReplys();
      evaluationdatas.push(result[i].item);
    }
    return evaluationdatas;
  }

  public datalength() {
      return this._pages[0].data.length || 0;
  }

  public pageCount() {
    return this._pages[this._currenttype].count();
  }

  public currentPage() {
    return this._pages[this._currenttype].current;
  }

  public currentPageSet(n: number) {
    let m = this._pages[this._currenttype].current;
    if (n === -1) { m--;  // prev Page
    } else if (n === -2) { m++;  // next Page
    } else { m = n; }
    this._pages[this._currenttype].current = m;
  }
  public find(id: number) {
      for (const rec of this._pages[0].data) {
          if (+rec.item['id'] === id) {
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
      for (const rec of this._pages[0].data) {
        const item = rec.item;
        sum += item['star'];
        switch (item['star']) {
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
      this.types[0].amount = this._pages[0].data.length;
      const s = sum / this._pages[0].data.length;
      const s0 = Math.floor(s);
      const s1 = Math.ceil(s - s0);
      const s2 = 5 - s0 - s1;
      return {stars: [new Array(s0), new Array(s1), new Array(s2)], records: this._pages[0].data.length};
  }

  public rate(index: number) {
      if (this.types[0].amount === 0) {
        return null;
      } else {
        if (index > 0) {
          const result = this.types[index].amount / this.types[0].amount;
          return Math.round(result * 100);
        }
      }
  }
}
