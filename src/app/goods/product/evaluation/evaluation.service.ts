import { Injectable } from '@angular/core';
import {RequestService} from '../../../commons/service/request.service';
import {SettingsService} from '../../../commons/service/settings.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
class Page {
  private length = 5;
  private currentPage = 0;
  getRecords(records, type): any[] {
    let rec0 = [];
    const rec1 = [];
    if (type === 0) {
      rec0 = records;
    } else {
      for (const item of records) {
        switch (item.star) {
          case 5:
          case 4:
            if ( type === 1 ) {
              rec0.push(item);
            }
            break;
          case 3:
          case 2:
            if ( type === 2 ) {
              rec0.push(item);
            }
            break;
          case 1:
          case 0:
            if ( type === 3 ) {
              rec0.push(item);
            }
            break;
          }
      }
    }
    const start = this.length * this.currentPage;
    if (rec0.length > start) {
      for (let i = start; i < this.length; i++) {
        if (i < rec0.length) {
          rec1.push(rec0[i]);
        }
      }
    }
    return rec1;
  }
}
@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private _evaluation: Subject<any> = new Subject<any>();
  private _data: Subject<any[]> = new Subject<any[]>();
  private _page;
  private types = [
    {names: ['All evaluation', '所有评价'], amount: 100},
    {names: ['Good', '好评'], amount: 0},
    {names: ['Medium', '中评'], amount: 0},
    {names: ['Poor', '差评'], amount: 0}
  ];
constructor(
    private requestService: RequestService,
    private cv: SettingsService,
  ) {
    this._page = new Page;
  }
  public setEvaluation(selectedPointsIfo: any): void {
    this._evaluation.next(selectedPointsIfo);
  }

  public currentEvaluation(): Observable<any> {
      return this._evaluation.asObservable();
  }
  public updateData(proid: any): void {
    const that = this;
    const data = [];
    Promise.all(this.get(proid)).then(rs => {
      // that.labels = rs[0]; // 产品标签
      // that.grades = rs[1]; // 会员级别
      // that.evaluations = rs[2]; // 产品评价
      // that.notes = rs[3]; // 使用心得
      data.push(rs[0], rs[1], rs[2], rs[3], rs[4]);
      if (rs[2].length > 0 || rs[4].length > 0) {
        // 取评价(id 指定的)标签 id 数组
        if (rs[2].length > 0) {
          rs[2]['getLabelIds'] = (id) => {
            const item = rs[2].find(id);
            return item['getLabelIds']();
          };
          rs[2].getTypes = () => {
            return that.types;
          };
          rs[2].setTypes = () => {
              // 评价类型统计
              let sum = 0;
              for (const item of rs[2]) {
                sum += item.star;
                switch (item.star) {
                  case 5: // 好评
                  case 4:
                    that.types[1].amount++ ;
                    break;
                  case 3:  // 中评
                  case 2:
                  that.types[2].amount++ ;
                    break;
                  case 1:  // 差评
                  case 0:
                  that.types[3].amount++ ;
                    break;
                }
              }
              that.types[0].amount = rs[2].length;
              const s = sum / rs[2].length;
              const s0 = Math.floor(s);
              const s1 = sum % rs[2].length;
              const s2 = 5 - s0 - s1;
              this.setEvaluation({stars: [new Array(s0), new Array(s1), new Array(s2)], records: rs[2].length});
          };
          rs[2].setTypes();
          rs[2].rate = (index: number) => {
            if (that.types[0].amount === 0) {
              return null;
            } else {
              if (index > 0) {
                const result = that.types[index].amount / that.types[0].amount;
                return result * 100;
              }
            }
          };
        }
        if (rs[4].length > 0) {
          rs[4].getRecords = (type): any => {
            let rec0 = [];
            const rec1 = [];
            if (type === 0) {
              rec0 = rs[4];
            } else {
              for (const item of rs[4]) {
                if (item.type === type) {
                  rec0.push(item);
                }
              }
            }
          };

          rs[4].getTypes = () => {
            const types = [
              {names: ['All consulting', '全部咨询'], amount: 100},
              {names: ['Commodity', '商品咨询'], amount: 0},
              {names: ['Inventory distribution', '库存配送'], amount: 0},
              {names: ['Pay', '支付'], amount: 0},
              {names: ['Invoice warranty', '发票保修'], amount: 0},
              {names: ['Payment to help', '支付帮助'], amount: 0}
            ];
            for (const item of rs[4]) {
              types[item.type].amount++ ;
            }
            types[0].amount = rs[4].length;
            return types;
          };

        }
        Promise.all(that.getSecond(rs[2], rs[4])).then(rs1 => {
          Promise.all(that.getThird(rs[2], rs1[0])).then(rs2 => {
            Promise.all(that.getForth(rs2[0])).then(rs3 => {
              // 根据评价设置评价类型数据
              // that.evalreplys = rs1[0]; // 评价回复
              // that.usergrades = rs1[1]; // 用户级别
              // that.users = rs2[0];
              // that.countrys = rs3[0];

              rs[1].getByUser = (userid: number) => {
                const item = rs1[1]['findByUserId'](userid);
                return rs[1].find(+item.gradeid);
              };

              rs1[0]['getUserName'] = (replyid: number) => {
                let result = '';
                const reply = rs1[0]['_find'](replyid);
                if (reply) {
                  const user = rs2[0].find(reply.userid);
                  if (user) {
                    result = user.nick || user.username;
                  }
                }
                return result;
              };

              rs1[0]['findByEvalId'] = (evalid: number) => {
                const replys = [];
                for (const rp of rs1[0]) {
                  if (+rp.evalid === evalid) {
                    replys.push(rp);
                  }
                }
                return replys;
              };

              rs1[1]['findByUserId'] = (userid: number) => {
                let replys = null;
                for (const rp of rs1[1]) {
                  if (+rp.userid === userid) {
                    replys = rp;
                  }
                }
                return replys;
              };

              // 取由 userid 指定的用户属性 name 的值
              rs3[0].getAttribute = (userid: number, name: string) => {
                const item = rs2[0].find(userid);
                const country = rs3[0].find((+item.country));
                return country[name];
              };

              // 取由 userid 指定的用户所在国的国旗
              rs3[0].getEmoji = (userid: number) => {
                const item = rs2[0].find(userid);
                const country = rs3[0].find((+item.country));
                return country.emoji;
              };

              data.push(rs1[0]);
              data.push(rs1[1]);
              data.push(rs2[0]);
              data.push(rs3[0]);
              that._data.next(data);
            });
          });
        });
      } else {
        data.push([]); // 评价回复
        data.push([]); // 用户级别
        data.push([]); // user
        data.push([]); // country
        that._data.next(data);
      }
    });
  }

  public currentData(): Observable<any> {
      return this._data.asObservable();
  }

  getRecords(records, type) {
    return this._page.getRecords(records, type);
  }
  // 统计指定评价的产品中，各种标签出现的数量
  getLabelKinds(evals, goodslabel) {
    const labelkind = [];
    for (const label of goodslabel) {
      labelkind[label.id] = 0;
    }
    for (const aeval of evals) {
      if (aeval.label !== 0) {
        for (const label of goodslabel) {
          if ((aeval.label & (1 << (label.id - 1))) !== 0) {
            labelkind[label.id]++;
          }
        }
      }
    }
    return labelkind;
  }
  _get(param, success) {
    function error(err) {
      alert('error occured!\n' + err);
    }
    const promises = [];
    for(let i in param) {
      for(var k in param[i]) {
        promises.push(this.requestService.get(this.cv.baseUrl + k, param[i][k]).then(success[i], error));
      }
    }
    return promises;
  }
  get(proid) {
    const token = this.cv.sessionid;
    const success = [
      function (data) {
        data.find = (id: number) => {
          for (const rec of data) {
            if (+rec.id === id) {
              return rec;
            }
          }
          return null;
        };
        return data;
      },

      function (data) {
        data.find = (id: number) => {
          for (const rec of data) {
            if (+rec.id === id) {
              return rec;
            }
          }
          return null;
        };
        return data;
      },

      function (data) {
        data.find = (id: number) => {
          for (const rec of data) {
            if (+rec.id === id) {
              rec.getLabelIds = () => {
                const label: number = rec.label;
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
              };
              return rec;
            }
          }
          return null;
        };
        return data;
      },

      function (data) {
        data.find = (id: number) => {
          for (const rec of data) {
            if (+rec.id === id) {
              return rec;
            }
          }
          return null;
        };
        return data;
      },
      function (data) {
        data.find = (id: number) => {
          for (const rec of data) {
            if (+rec.id === id) {
              return rec;
            }
          }
          return null;
        };
        return data;
      },
    ];
    const ps = [
      {'? cmd=ProductLabel':
          {
            'filter': JSON.stringify(['id', 'names']),
            'token': token
          }
      },
      {'?cmd=Grade':
          {
            'filter': JSON.stringify(['id', 'names', 'image']),
            'token': token
          }
      },
      {'?cmd=ProductEval':
          {
            'filter': JSON.stringify([
              'id', 'proid', 'userid', 'label', 'useideas', 'star', 'date',
              'useful', 'status', 'feelid']),
            'cond': JSON.stringify([{'field': 'proid', value: [proid], 'operator': 'in'}]),
            'token': token
          }
      },
      {'?cmd=ProductUse':
          {
            'filter': JSON.stringify(['id', 'proid', 'userid', 'title', 'content', 'images', 'date', 'status']),
            'cond': JSON.stringify([{'field': 'proid', value: [proid], 'operator': 'in'}]),
            'token': token
          }
      },
      {'?cmd=ProductConsult':
          {
            'filter': JSON.stringify([
              'id', 'proid', 'userid', 'type', 'content', 'time', 'reply', 'replytime']),
            'cond': JSON.stringify([{'field': 'proid', value: [proid], 'operator': 'in'}]),
            'token': token
          }
      },
    ];
    return this._get(ps, success);
  }
  getSecond(evals: any[], consults: any[]) {
    const success = [
      function (data) {
        data._find = (id: number) => {
          for (const rec of data) {
            if (+rec.id === id) {
              return rec;
            }
          }
          return null;
        };
        data.findByEvalId = (evalid: number) => {
          const result = [];
          for (const rec of data) {
            if (+rec.evalid === evalid) {
              result.push(rec);
            }
          }
          return result;
        };
        data.findByUserId = (userid: number) => {
          const result = [];
          for (const rec of data) {
            if (+rec.userid === userid) {
              result.push(rec);
            }
          }
          return result;
        };
        return data;
      },

      function (data) {
        data.findByUserId = (userid: number) => {
          for (const rec of data) {
            if (+rec.userid === userid) {
              return rec;
            }
          }
          return null;
        };
        data.findByEvalId = (evalid: number) => {
          const result = [];
          for (const rec of data) {
            if (+rec.evalid === evalid) {
              result.push(rec);
            }
          }
          return result;
        };
        return data;
      }
    ];
    const ids = [];
    const ids1 = [];
    for (const ev of evals) {
      if (!ids.includes(ev.userid)) {
        ids.push(ev.userid);
      }
      if (!ids1.includes(ev.id)) {
        ids1.push(ev.id);
      }
    }
    for (const consult of consults) {
      if (!ids.includes(consult.userid)) {
        ids.push(consult.userid);
      }
    }
    if (ids1.length === 0) {
      ids1.push(-1);
    }
    if (ids.length === 0) {
      ids.push(-1);
    }
    const token = this.cv.sessionid;
    const cond1 = JSON.stringify([{'field': 'evalid', 'value': ids1, 'operator': 'in'}]);
    const cond2 = JSON.stringify([{'field': 'userid', 'value': ids, 'operator': 'in'}]);
    const ps = [
      {'? cmd=EvalReply':
          {
            'filter': JSON.stringify(['id', 'evalid', 'userid', 'parentid', 'content', 'time']),
            'cond': cond1,
            'token': token
          }
      },
      {'?cmd=CustomGrade':
          {
            'filter': JSON.stringify(['id', 'userid', 'gradeid']),
            'cond': cond2,
            'token': token
          }
      },
    ];
    return this._get(ps, success);
  }
  getThird(evals: any[], replys: any[]) {
    const success = [
      function (data) {
        data.find = (id: number) => {
          for (const rec of data) {
            if (+rec.id === id) {
              rec.getName = () => {
                return rec.nick || rec.username;
              };
              return rec;
            }
          }
          return null;
        };
        return data;
      }
    ];
    const ids = [];
    for (const ev of evals) {
      if (!ids.includes(ev.userid)) {
        ids.push(ev.userid);
      }
    }
    for (const ev of replys) {
      if (!ids.includes(ev.userid)) {
        ids.push(ev.userid);
      }
    }
    if (ids.length === 0) {
      ids.push(-1);
    }
    const token = this.cv.sessionid;
    const cond0 = JSON.stringify([{'field': 'id', 'value': ids, 'operator': 'in'}]);
    const ps = [
      {'? cmd=Person':
          {
            'filter': JSON.stringify(['id', 'username', 'picture', 'nick', 'country']),
            'cond': cond0,
            'token': token
          }
      }
    ];
    return this._get(ps, success);
  }
  getForth(users: any[]) {
    const success = [
      function (data) {
        data.find = (id: number) => {
          for (const rec of data) {
            if (+rec.id === id) {
              return rec;
            }
          }
          return null;
        };
        return data;
      }
    ];
    const ids = [];
    for (const ev of users) {
      if (!ids.includes(ev.country)) {
        ids.push(ev.country);
      }
    }
    if (ids.length === 0) {
      ids.push(-1);
    }
    const token = this.cv.sessionid;
    const cond0 = JSON.stringify([{'field': 'id', 'value': ids, 'operator': 'in'}]);
    const ps = [
      {'? cmd=Country':
          {
            'filter': JSON.stringify(['id', 'names', 'code3', 'emoji']),
            'cond': cond0,
            'token': token
          }
      }
    ];
    return this._get(ps, success);
  }
}
