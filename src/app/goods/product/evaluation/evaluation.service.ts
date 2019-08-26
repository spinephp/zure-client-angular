import { Injectable } from '@angular/core';
import {RequestService} from '../../../commons/service/request.service';
// import {SettingsService} from '../../../commons/service/settings.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

import { Evaluation } from './classes/evaluation';
import { Grade } from './classes/grade';
import { UserGrade } from './classes/user-grade';
import { EvalReply } from './classes/eval-reply';
import { Consult } from './classes/consult';
import { Country } from './classes/country';
import { Label, ALabel } from './classes/label';
import { Note } from './classes/note';
import { User } from './classes/user';
import { ValuesService } from 'src/app/commons/service/values.service';
import { LocalStorage } from 'src/app/commons/provider/local-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private xevalreply: Subject<any> = new Subject<any>();
  private xevaluations: Subject<any> = new Subject<any>();
  private xdata: Subject<any> = new Subject<any>();
  constructor(
    public requestService: RequestService,
    public vs: ValuesService,
    public ls: LocalStorage
  ) {
}

  public setData(datas: any[]): void {
    this.xdata.next(datas);
  }

  public setEvaluation(selectedPointsIfo: any): void {
    this.xevaluations.next(selectedPointsIfo);
  }

  public currentEvaluation(): Observable<any> {
    return this.xevaluations.asObservable();
  }

  public setEvalReply(selectedPointsIfo: any): void {
    this.xevalreply.next(selectedPointsIfo);
  }

  public currentEvalReply(): Observable<any> {
    return this.xevalreply.asObservable();
  }

  public updateData(proid: any): void {
    const that = this;
    const data = [];
    Promise.all(this.get(proid)).then(rs => {
      if (rs[2].length > 0 || rs[4].length > 0) {
        Promise.all(that.getSecond(rs[2], rs[4])).then(rs1 => {
          Promise.all(that.getThird(rs[2], rs1[0])).then(rs2 => {
            Promise.all(that.getForth(rs2[0])).then(rs3 => {
              const labels = new Label(rs[0]); // 产品标签
              const usergrades = new UserGrade(rs1[1]); // 用户级别
              const grades = new Grade(rs[1], usergrades); // 会员级别
              const labelkinds = that.getLabelKinds(rs[2], rs[0]);
              const users = new User(rs2[0]);
              const countrys = new Country(rs3[0]);
              const evalreplys = new EvalReply(rs1[0], users); // 评价回复
              const notes = new Note(rs[3], users, countrys); // 使用心得
              const evaluations = new Evaluation(
                rs[2],
                grades,
                usergrades,
                users,
                countrys,
                evalreplys); // 产品评价
              that.setEvaluation(evaluations.setTypes());
              const consults = new Consult(
                rs[4],
                grades,
                usergrades,
                users);

              // evaluations,labels,notes,consults
              data.push(evaluations);
              data.push(labels);
              data.push(notes);
              data.push(consults);
              data.push(labelkinds);
              that.xdata.next(data);
            });
          });
        });
      } else {
        data.push(null); // 评价回复
        data.push(null); // 用户级别
        data.push(null); // user
        data.push(null); // country
        data.push(null); // country
        that.xdata.next(data);
      }
    });
  }

  public currentData(): Observable<any> {
      return this.xdata.asObservable();
  }
  // 统计指定评价的产品中，各种标签出现的数量
  getLabelKinds(evals, goodslabel) {
    const labelkind = [];
    for (const label of goodslabel) {
      labelkind[label.id] = 0;
    }
    for (const aeval of evals) {
      const alabel: number = aeval.label;
      if (alabel > -1) {
        for (const label of goodslabel) {
          // tslint:disable-next-line:no-bitwise
          if ((alabel & (1 << (+label.id - 1))) !== 0) {
            labelkind[label.id]++;
          }
        }
      }
    }
    return labelkind;
  }
  get(proid): Array<Promise<[]>> {
    const ps = [
      this.requestService.getUrl('ProductLabel', ['id', 'names']),
      this.requestService.getUrl('Grade', ['id', 'names', 'image']),
      this.requestService.getUrl(
        'ProductEval',
        ['id', 'proid', 'userid', 'label', 'useideas', 'star', 'date', 'useful', 'status', 'feelid'],
        [{field: 'proid', value: [proid], operator: 'in'}]
      ),
      this.requestService.getUrl(
        'ProductUse',
        ['id', 'proid', 'userid', 'title', 'content', 'images', 'date', 'status'],
        [{field: 'proid', value: [proid], operator: 'in'}]
      ),
      this.requestService.getUrl(
        'ProductConsult',
        ['id', 'proid', 'userid', 'type', 'content', 'time', 'reply', 'replytime'],
        [{field: 'proid', value: [proid], operator: 'in'}]
      ),
    ];
    return this.requestService._get(ps);
  }
  getSecond(evals: any[], consults: any[]) {
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
    const ps = [
      this.requestService.getUrl(
        'EvalReply',
        ['id', 'evalid', 'userid', 'parentid', 'content', 'time'],
        [{field: 'evalid', value: ids1, operator: 'in'}]
      ),
      this.requestService.getUrl(
        'CustomGrade',
        ['id', 'userid', 'gradeid'],
        [{field: 'userid', value: ids, operator: 'in'}]
      ),
    ];
    return this.requestService._get(ps);
  }
  getThird(evals: any[], replys: any[]) {
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
      if (!ids.includes(ev.parentid)) {
        ids.push(ev.parentid);
      }
    }
    if (ids.length === 0) {
      ids.push(-1);
    }
    const ps = [
      this.requestService.getUrl(
        'Person',
        ['id', 'username', 'picture', 'nick', 'country'],
        [{field: 'id', value: ids, operator: 'in'}]
      ),
    ];
    return this.requestService._get(ps);
  }
  getForth(users: any[]) {
    const ids = [];
    for (const ev of users) {
      if (!ids.includes(ev.country)) {
        ids.push(ev.country);
      }
    }
    if (ids.length === 0) {
      ids.push(-1);
    }
    const ps = [
      this.requestService.getUrl(
        'Country',
        ['id', 'names', 'code3', 'emoji'],
        [{field: 'id', value: ids, operator: 'in'}]
      ),
    ];
    return this.requestService._get(ps);
  }

  postEvalReply(evalid, pid, content) {
    const params = {
      item: {
      evalid,
      userid: '?userid',
      parentid: pid,
      content,
      time: '?time'
      },
      token: this.ls.get('sessionid')
    };
    return this.requestService.post('/woo/index.php?cmd=EvalReply', JSON.stringify(params)).then(rs => {
      return rs;
    });
  }

  putEvalUseful(aeval) {
    const params = {
      item: {
        // id: aeval.id,
        useful: aeval.useful + 1
      },
      token: this.ls.get('sessionid'),
      _method: 'PUT'
    };
    return this.requestService.put(`/woo/index.php?cmd=ProductEval/${aeval.id}`, JSON.stringify(params)).then(rs => {
      return rs;
    });
  }
}
