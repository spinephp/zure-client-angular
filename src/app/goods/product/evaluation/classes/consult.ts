import { Yrrdb, AItem } from '../../../../commons/provider/yrrdb';
import { User, UserData, AUser } from './user';
import { UserGrade, UserGradeData } from './user-grade';
import { Grade, GradeData } from './grade';
export interface ConsultData {
    id: string;
    proid: number;
    userid: number;
    type: number;
    content: string;
    time: string;
    reply: string;
    replytime: string;
    username?: string;
    gradenames?: string[];
}

export class AConsult extends AItem<ConsultData> {
  static grade: Grade;
  static usergrade: UserGrade;
  static user: User;
  constructor(data: ConsultData) {
    super(data);
    this.extend();
  }

  extend() {
    const ausergrade = AConsult.usergrade.findByAttribute('userid', this.item.userid);
    const grade =  AConsult.grade.find(+ausergrade.item.gradeid).item;
    this.item.gradenames = grade.names;
    this.item.username = (AConsult.user.find(this.item.userid) as AUser).getName();
  }
}

export class Consult extends Yrrdb<AConsult, ConsultData> {
  private _type: number;
  get type(): number { return this._type; }
  set type(i: number) {
    this._type = i;
  }
  private _types: Object[];
  constructor(
    data: ConsultData[],
    _grade: Grade,
    _usergrade: UserGrade,
    _user: User
    ) {
      AConsult.grade = _grade;
      AConsult.user = _user;
      AConsult.usergrade = _usergrade;
      super(data, AConsult);
      this._type = 0;
      this._types = this.getTypes();
  }

  // 返回当前咨询内容记录数组
  public getRecords(): ConsultData[] {
      const rec0 = [];
      const rec1 = [];
      if (this.type === 0) {
        for (const aconsult of this.data) {
            rec0.push(aconsult.item);
        }
      } else {
        for (const aconsult of this.data) {
          if (aconsult.item.type === this.type) {
            rec0.push(aconsult.item);
          }
        }
      }
      return rec0;
  }

  // 统计各咨询内容的数量并返回
  public getTypes() {
      const types = [
          {names: ['All consulting', '全部咨询'], amount: 100},
          {names: ['Commodity', '商品咨询'], amount: 0},
          {names: ['Inventory distribution', '库存配送'], amount: 0},
          {names: ['Pay', '支付'], amount: 0},
          {names: ['Invoice warranty', '发票保修'], amount: 0},
          {names: ['Payment to help', '支付帮助'], amount: 0}
      ];
      for (const aconsult of this.data) {
          types[aconsult.item.type + 1].amount++ ;
      }
      types[0].amount = this.data.length;
      return types;
  }

  // 取当前咨询类型记录数
  public typeLength() {
    return this._types[this._type]['amount'];
  }

  // 咨询 tabs 点击事件处理
  public tabsClick(type: number) {
    this._type = type;
  }
}
