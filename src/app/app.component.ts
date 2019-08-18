import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import {HeaderService} from './header.service';
import {LocalStorage} from './commons/provider/local-storage';
import {ValuesService} from './commons/service/values.service';
import { LoginerData, ALoginer } from './classes/loginer';
import { SettingsService } from './commons/service/settings.service';
import { isDefined } from '@angular/compiler/src/util';
import { Userlogin } from './home/classes/userlogin';
import { TranslatePipe } from './translate.pipe';
import { APerson } from './classes/person';
import { ACustom } from './classes/custom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeaderService, ValuesService]
})
export class AppComponent implements OnInit {
  public languageid: number;
  public qiye: object = {introductions: ['xx', 'yy'], names: ['xx', 'yy']};
  public languages = [];
  public navigations = [];
  private aLoginer: ALoginer;
  private rooturl: string;
  constructor(
    private headerService: HeaderService,
    private ls: LocalStorage,
    private vs: ValuesService,
    private ss: SettingsService,
    private tr: TranslatePipe
    ) {
      this.rooturl = ss.rootUrl;
      this.aLoginer = new ALoginer(null);
    }
  aPerson = new APerson({id: undefined, username: undefined, picture: undefined, nick: undefined});
  aCustom = new ACustom({id: null, userid: null});

  logined = false;
  logtext = 'Login';
  urlValidate = '/woo/admin/checkNum_session.php';
  // usernameinfo = 'Enter user name';
  // usernameinfocolor = '#999';
  // model = new Userlogin(null, null, null, null, null);
  // @ViewChildren('formLogon') logonInputs; // : ElementRef[];
  // @ViewChildren('logonButton') logonButtons;
  ngOnInit() {
    const that = this;
    // $('[data-toggle="tooltip"]').tooltip();
    this.vs.currentLanguageId().subscribe((value: number) => {
      that.languageid = value;
    });
    this.vs.currentLoginer().subscribe((value: LoginerData) => {
      if (value === undefined) {
        that.logined = false;
        that.logtext = 'Sign in';
        that.aLoginer = new ALoginer(null);
      } else {
        that.logined = true;
        that.logtext = 'Sign out';
        that.aLoginer = new ALoginer(value);
      }
    });
    this.headerService.heart().then(res => {
      const sok = 'ok';
      const sdata = 'data';
      if (res[sok] === true) {
        that.ls.set('publickey', res[sdata][0].token);
        that.ls.set('sessionid', res[sdata][0].sessionid);
        Promise.all(this.headerService.get()).then(rs => {
          // console.log(rs);
          const sqq = 'qq';
          that.qiye = rs[0][0];
          that.vs.setQiye(rs[0][0]);
          that.languages = rs[1];
          that.navigations = rs[2];
          that.ls.set(sqq, rs[0][0][sqq]);
          const lid = that.ls.get('languageid') || 1;
          that.selectChangeLanguage(lid);
        });
      } else {
        const serror = 'error';
        console.log(res[serror]);
      }
    });
  }

  // 选择了新的语言
  selectChangeLanguage(id) {
    this.ls.set('languageid', id); // 把新语言保存在 local storage
    this.vs.setLanguageId(id); // 设置当前系统语言
  }
  // userclicked() {
  //   // $('.dropdown-toggle').dropdown();
  //   let disp = $('.dropdown-menu').css('display');
  //   if (disp === 'none') {
  //     disp = 'flex';
  //   } else {
  //     disp = 'none';
  //   }
  //   $('.dropdown-menu').css('display', disp);
  // }

  logout() {
    const that = this;
    // 登出
    if (this.logined && isDefined(this.aLoginer) && +this.aLoginer.item.id > 0) {
      const param = {
        user: this.aLoginer.item.name,
        action: 'custom_logout',
        token: this.ls.get('sessionid')
      };
      this.headerService.logout(param).then((rs: LoginerData) => {
        if (+rs.id >= 0) {
          that.vs.setLoginer(undefined);
        }
      });
    } else {
      // 未登录
    }
  }
}
