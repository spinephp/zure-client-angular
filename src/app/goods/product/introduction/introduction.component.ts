import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductComponent } from '../product.component';
import { ValuesService } from 'src/app/commons/service/values.service';
import { LocalStorage } from 'src/app/commons/provider/local-storage';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { isNumber } from 'util';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  providers: [DatePipe],

})
export class IntroductionComponent implements OnInit {
  private languageid;
  private companyYears;
  constructor(
    private tparent: ProductComponent,
    private router: ActivatedRoute,
    private route: Router,
    private vs: ValuesService,
    private ls: LocalStorage,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const that = this;
    const date = new Date();
    const year: string | number = date.getFullYear();
    this.companyYears = +year - 2007;
    // this.languageid = this.ls.getLanguageId();
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
    });
    // this.router.queryParams.subscribe(params => {
    this.router.params.subscribe(params => {
      const id = params.id; // || that._parent.goods[0].id;
      // that.aGoods = that._parent.goods.find(id);
      // that.preNames = that._parent.goodsClass.longNames(that.aGoods.classid);
    });
    // this.route.navigate(['introduction']);
    // 页面监听
　　  fromEvent(window, 'resize')
  　　.pipe(debounceTime(100)) // 以免频繁处理
  　　.subscribe((event) => {
  　　  console.log('come on ..');
  　});
  }

}
