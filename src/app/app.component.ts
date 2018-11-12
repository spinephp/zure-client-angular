import { Component, OnInit } from '@angular/core';
import {HeaderService} from './header.service';
import {LocalStorage} from './commons/provider/local-storage';
import {ValuesService} from './commons/service/values.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeaderService, ValuesService]
})
export class AppComponent implements OnInit {
  public languageid: number;
  public qiye: Object = {introduction: function() {}};
  private languages = [];
  private navigations = [];
  constructor(
    private headerService: HeaderService,
    private ls: LocalStorage,
    private vs: ValuesService,
    ) {
  }
  ngOnInit() {
    const that = this;
    this.vs.currentLanguageId().subscribe((value: number) => {
      that.languageid = value;
    });
    this.headerService.heart().then(res => {
      if (res.ok === true) {
        that.ls.set('publickey', res.data[0].token);
        that.ls.set('sessionid', res.data[0].sessionid);
        Promise.all(this.headerService.get()).then(rs => {
          // console.log(rs);
          that.qiye = rs[0];
          that.vs.setQiye(rs[0]);
          that.languages = rs[1];
          that.navigations = rs[2];
          const lid = that.ls.get('languageid') || 1;
          this.selectChangeLanguage(lid);
        });
      } else {
        console.log(res.error);
      }
    });
  }

  // 选择了新的语言
  selectChangeLanguage(id) {
    this.ls.set('languageid', id); // 把新语言保存在 local storage
    this.vs.setLanguageId(id); // 设置当前系统语言
  }
}
