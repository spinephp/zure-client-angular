import { Component, OnInit, ViewChildren } from '@angular/core';
import { Userlogin } from '../home/classes/userlogin';
import { LoginerData } from '../classes/loginer';
import { HomeService } from '../home/home.service';
import { ValuesService } from '../commons/service/values.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public languageid: number;

  constructor(
    private ss: LoginService,
    private vs: ValuesService,

  ) {
  }
  aLoginer = new Userlogin(null, null, null, null, null);
  loginFormSubmitted = false;
  urlValidate = '/woo/admin/checkNum_session.php';
  @ViewChildren('formLogin') loginInputs; // : ElementRef[];
  @ViewChildren('loginButton') loginButtons;
  ngOnInit() {
    const that = this;
    this.vs.currentLanguageId().subscribe((value: number) => {
      that.languageid = value;
    });
  }

  login() {
    this.loginFormSubmitted = true;
    this.aLoginer.action = 'custom_login';
    const that = this;
    this.ss.login(this.aLoginer).then((rs: LoginerData) => {
      that.vs.setLoginer(rs);
      that.loginButtons.first.nativeElement.click(); // 关闭登录框
    });
  }

  // 重获验证码
  resetValidate() {
    this.urlValidate = '/woo/admin/checkNum_session.php?' + Math.ceil(Math.random() * 1000);
    this.loginInputs.last.nativeElement.select(); // 全选验证码文本
  }
  // 转注册界面
  // 本方法只关闭登录框，打开注册框在 login.component.html 中，
  // 由 input 中的 data-toggle="modal" data-target="#logonModal" 实现
  logon() {
    this.loginButtons.first.nativeElement.click(); // 关闭登录框
  }
}
