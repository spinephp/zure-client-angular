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
  public languageid = 1;
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
    this.languageid = this.ls.get('languageid') as number;
    this.vs.currentLanguageId().subscribe((value: any) => {that.languageid = value; });
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
        });
      } else {
        console.log(res.error);
      }
    });
  }
  selectChangeLanguage(id) {
    this.ls.set('languageid', id);
    this.vs.setLanguageId(id);
  }
}
