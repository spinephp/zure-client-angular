import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductComponent } from '../product.component';
import { EvaluationService } from './evaluation.service';
import { isNgTemplate } from '@angular/compiler';
import {LocalStorage} from '../../../commons/provider/local-storage';
import { ValuesService } from '../../../commons/service/values.service';
import { Label } from './classes/label';
import { Note } from './classes/note';
import { Evaluation } from './classes/evaluation';
import { Consult } from './classes/consult';

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
  constructor(
    private cdr: ChangeDetectorRef,
    private _parent: ProductComponent,
    private is: EvaluationService,
    private ls: LocalStorage,
    private vs: ValuesService,
  ) {
    this.languageid = this._parent.languageid;
   }

  ngOnInit() {
    const that = this;
    this.qq = this.ls.get('qq');
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
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
}
