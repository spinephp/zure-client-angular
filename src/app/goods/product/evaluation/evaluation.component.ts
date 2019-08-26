import { Component, OnInit, ChangeDetectorRef, Input, ViewChildren } from '@angular/core';
import { ProductComponent } from '../product.component';
import { EvaluationService } from './evaluation.service';
import { isNgTemplate } from '@angular/compiler';
import {LocalStorage} from '../../../commons/provider/local-storage';
import { ValuesService } from '../../../commons/service/values.service';
import { Label } from './classes/label';
import { Note } from './classes/note';
import { Evaluation, AEvaluation, EvaluationData } from './classes/evaluation';
import { Consult } from './classes/consult';
import { LoginerData, ALoginer } from 'src/app/classes/loginer';
import { AEvalReply, EvalReplyData } from './classes/eval-reply';
import { isDefined } from '@angular/compiler/src/util';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';
import { AUser, UserData } from './classes/user';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  private qq;
  private labels: Label;
  private evaluations: Evaluation;
  private consults: Consult;
  private notes: Note;
  private labelkinds = [];
  public languageid;
  public loginer: LoginerData;
  public loginerid = '';
  constructor(
    private cdr: ChangeDetectorRef,
    private xparent: ProductComponent,
    private is: EvaluationService,
    private ls: LocalStorage,
    private vs: ValuesService,
  ) {
    // this.languageid = ls.getLanguageId();
    // this.loginerid = ''; // new ALoginer(null);
   }

   @ViewChildren('replyin') replyin;
  ngOnInit() {
    const that = this;
    this.qq = this.ls.get('qq');
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
    });

    this.vs.currentLoginer()
    // .pipe( map(item => (
    //   item !== undefined ) ? item.id : ''))
    .subscribe(( rs: any) => {
       that.loginer = rs;
       that.loginerid = rs === undefined ? '' : rs.id;
    });

    this.is.currentEvalReply().subscribe((rs: EvalReplyData) => {
      const data: UserData = {
        id: that.loginer.id,
        username: that.loginer.name,
        picture: that.loginer.picture,
        nick: null,
        country: null
      };
      const auser = new AUser(data);
      this.evaluations.addEvalReply(rs, auser);
    });

    this.is.currentData().subscribe((rs: any) => {
      // console.log(rs);
      that.evaluations = rs[0];
      that.labels = rs[1];
      that.notes = rs[2];
      that.consults = rs[3];
      that.labelkinds = rs[4];
    });
  }

  // 生成 n 个空数组，用于 ngFor
  makeArray(n: number) {
    return new Array(n);
  }

  evalPageChange(n: number) {
    this.evaluations.currentPageSet(n);
    this.cdr.detectChanges();
  }

  // 取给定评价回复数组中有共同父节点的评价回复
  public replyNodes(parentid: number, replys: AEvalReply[]) {
    const result = [];
    for (const areply of replys) {
      if (+areply.value('parentid') === parentid) {
        result.push(areply);
      }
    }
    return result;
  }

  ckReply(event, parentbtn, evalid: string) {
    const content = event.currentTarget.previousSibling.value;
    this.is.postEvalReply(evalid, 0, content).then(rs => {
      if (rs.id === -1) {
        alert(rs.error);
      } else {
        alert('Reply success!');
        this.is.setEvalReply(rs);
        parentbtn.click(); // 关闭输入框
      }
    });
  }

  evaluseful(aeval: EvaluationData) {
    if (aeval.userid !== +this.loginerid) {
      const that = this;
      this.is.putEvalUseful(aeval).then(rs => {
        console.log(rs);
        aeval.useful = rs.useful;
        // const rec: AEvaluation = that.evaluations.find(+aeval.id);
        // if (rec) {
        //   rec.item.useful = rs.useful;
        // }
      });
  }
  }
}

