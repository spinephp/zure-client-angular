import { Injectable, ElementRef } from '@angular/core';
import { RequestService } from '../commons/service/request.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { TranslatePipe } from '../translate.pipe';
import { isDefined } from '@angular/compiler/src/util';
import { Model } from './model/model';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public model: Model;
  public enregister: boolean;
  public pwdInfo: string;
  public pwdColor: string;
  public pwdWidth: string;
  public urlValidate: string;
  constructor(
    private requestService: RequestService,
    private ls: LocalStorage,
    private tr: TranslatePipe
  ) {
    this.model = new Model();
    this.init();
  }

  init() {
    this.model.init();
    this.enregister = false;
    this.pwdInfo = '';
    this.pwdColor = 'white';
    this.pwdWidth = '0';
    this.urlValidate = '/woo/admin/checkNum_session.php';
  }
  validateAll(eref: any) {
    let result = true;
    const i = this.model.validateAll(this) ;
    if (i >= 0) {
      eref._results[i].nativeElement.select();
      result = false;
    }
    return result;
  }

  // 重获验证码
  resetValidate(codeInput) {
    this.urlValidate = '/woo/admin/checkNum_session.php?' + Math.ceil(Math.random() * 1000);
    // this.loginInputs.last.nativeElement.select(); // 全选验证码文本
    codeInput.select();
  }

  logon() {
    const type = 'type';
    const param = 'param';
    const lang = 'language';
    const token = 'token';

    const obj = this.model.getRequestParam();
    const cmd = ['Custom', 'CheckLogin', 'ResetPassword'][obj[type]];
    const params = obj[param];
    switch (obj[type]) {
      case 0:
      case 2:
        params[lang] = this.ls.getLanguageId();
        break;
    }
    params[token] = this.ls.get('sessionid');

    return this.requestService.post(`/woo/index.php?cmd=${cmd}`, JSON.stringify(params)).then(rs => {
      rs[type] = obj[type];
      return rs;
    });
  }

  login() {
    const params = {
      username: this.model.data[0],
      pwd: this.model.data[1],
      code: this.model.data[4],
      action: 'custom_login',
      token: this.ls.get('sessionid')
    };
    return this.requestService.post('/woo/index.php?cmd=CheckLogin', JSON.stringify(params)).then(rs => {
      return rs;
    });
  }

  resetpwd() {
    const params = {
      username: this.model.data[0],
      email: this.model.data[3],
      code: this.model.data[4],
      type: 'ResetPassword',
      action: 'custom_resetPassword',
      language: this.ls.getLanguageId(),
      token: this.ls.get('sessionid')
    };
    return this.requestService.post('/woo/index.php?cmd=ResetPassword', JSON.stringify(params)).then(rs => {
      return rs;
    });
  }
  // 校验 input 输入框的值
  // @param index : integer, 指定要校验的 input 输入框
  validateInput(index) {
    const result = this.model.validateInput(index, this);
    if (this.enregister !== this.model.canSubmit()) {
      this.enregister = !this.enregister;
    }
    return result;
  }

  testpass(password, username) {
    let score = 0;
    if (password.length < 4) {return -4; }
    if (typeof (username) !== 'undefined' && password.toLowerCase() === username.toLowerCase()) { return -2; }
    score += password.length * 4;
    for (let i = 1; i < 5; i++) {
      score += (this.repeat(i, password).length - password.length) * 1;
    }
    if (password.match('/(.*[0-9].*[0-9].*[0-9])/')) {
      score += 5;
    }
    if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
      score += 5;
    }
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      score += 10;
    }
    if (password.match( /([a-zA-Z])/) && password.match( /([0-9])/)) {
      score += 15;
    }
    if (password.match( /([!,@,#,$,%,^,&,*,?,_,~])/) && password.match( /([0-9])/)) {
      score += 15;
    }
    if (password.match( /([!,@,#,$,%,^,&,*,?,_,~])/) && password.match( /([a-zA-Z])/)) {
      score += 15;
    }
    if (password.match( /^\w+$/) || password.match( /^\d+$/)) {
      score += 5;
    }
    if (score < 0) {
      score = 0;
    }
    if (score > 100) {
      score = 100;
    }
    return score;
  }
  repeat(len, str) {
    let res = '';
    for (let i = 0; i < str.length; i++) {
      let repeated = true;
      const max = str.length - i - len;
      let j;
      for (j = 0; j < len; j++) {
        if (j < max) {
          repeated = repeated && (str.charAt(j + i) === str.charAt(j + i + len));
        }
      }
      if (j < len) {
        repeated = false;
      }
      if (repeated) {
        i += len - 1;
        repeated = false;
      } else {
        res += str.charAt(i);
      }
    }
    return res;
  }

  checkpass() {
    const user = this.model.data[0] || 'usrname';
    const score = this.testpass(this.model.data[1], user);
    if (score === -4) {
      this.pwdInfo = 'Short';
    } else if (score === -2) {
      this.pwdInfo = 'Same user name';
    } else {
      this.pwdColor = score < 34 ? '#edabab' : (score < 68 ? '#ede3ab' : '#d3edab');
      this.pwdInfo = score < 34 ? 'Weak' : (score < 68 ? 'General' : 'Very good');
      this.pwdWidth = score + '%';
    }
  }
}
