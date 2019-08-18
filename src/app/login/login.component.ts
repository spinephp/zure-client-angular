import { Component, OnInit, ViewChildren } from '@angular/core';
import { LoginerData } from '../classes/loginer';
import { ValuesService } from '../commons/service/values.service';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public languageid: number;

  constructor(
    private rs: RegisterService,
    private vs: ValuesService,

  ) {
  }
  @ViewChildren('formLogin') loginInputs; // : ElementRef[];
  @ViewChildren('loginButton') loginButtons;
  ngOnInit() {
    const that = this;
    this.vs.currentLanguageId().subscribe((value: number) => {
      that.languageid = value;
    });
  }

  login() {
    const that = this;
    this.rs.login().then((rs: LoginerData) => {
      that.vs.setLoginer(rs);
      that.loginButtons.first.nativeElement.click(); // 关闭登录框
      that.rs.init();
    });
  }

  // 转注册界面
  // 本方法只关闭登录框，打开注册框在 login.component.html 中，
  // 由 input 中的 data-toggle="modal" data-target="#logonModal" 实现
  hide() {
    this.loginButtons.first.nativeElement.click(); // 关闭登录框
  }
}
