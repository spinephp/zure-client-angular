import { Component, OnInit } from '@angular/core';
import {HeaderService} from './header.service';
import {LocalStorage} from './commons/provider/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeaderService]
})
export class AppComponent implements OnInit {
  public languageid = 1;
  public qiye: Object = {names: ['aa', 'nbb']};
  private languages = [];
  private curLanguage = 'chinese';
  private navigations = [];
  constructor(private headerService: HeaderService, private ls: LocalStorage) {
  }
  ngOnInit() {
    const that = this;
    this.headerService.heart().then(res => {
      if (res.ok === true) {
        that.ls.set('publickey', res.data[0].token);
        that.ls.set('sessionid', res.data[0].sessionid);
        Promise.all(this.headerService.get()).then(rs => {
          // console.log(rs);
          Object.assign(that.qiye, rs[0]);
          that.languages = rs[1];
          that.navigations = rs[2];
          that.languageid = parseInt(this.ls.get('languageid') as string, 10);
        });
      } else {
        console.log(res.error);
      }
    });
  }
}
