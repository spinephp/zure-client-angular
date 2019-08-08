import { Injectable } from '@angular/core';
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

  constructor(
    private requestService: RequestService,
    private ls: LocalStorage,
    private tr: TranslatePipe
  ) { }
  model = [null, null, null, null, null];
  regex = [
    /^[a-zA-Z]{1}[a-zA-Z0-9\-\_\@\.]{4,16}[a-zA-Z0-9]{1}$/,
    /^[\w\-\!\@\#\$\%\^\&\*]{6,16}$/,
    /^[\w\-\!\@\#\$\%\^\&\*]{6,16}$/,
    /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.\w+$/,
    /^[a-zA-Z0-9]{4}$/
  ];
  info = ['Enter user name', 'Enter password', 'Re-enter password', 'Enter email', 'Enter code'];
  errinfo = ['Invalid user name', 'Invalid password', 'Invalid password', 'Invalid email', 'Invalid code'];
  color = ['#999', '#999', '#999', '#999', '#999'];
  fun = [this.checkUserName, undefined, this.check2password];
  enregister = false;
  pwdInfo = '';
  pwdColor = 'white';
  pwdWidth = '0';
  // AJAX 检查用户名是否存在，如用户名存在，用绿色在 username_err_info 指定处显示"通过"，
  // 否则用红色在 username_err_info 指定处显示"用户名已存在"或其它错误信息。
  // @param string value - 包含用户名的字符串
  checkUserName(that): boolean {
    // const that = this;
    const param = {
      filter: ['id', 'username'],
      cond: [{ field: 'username', value: that.model[0], operator: 'eq' }],
      token: that.ls.get('sessionid')
    };
    const url = '/woo/index.php? cmd=Person&' + jQuery.param(param);
    that.requestService.get(url, null).then(rs => { // 从远程服务器取用户名
      if (rs.length !== 0) {
        that.info[0] = 'User name already exists';
        that.color[0] = 'red';
      } else {
        that.info[0] = 'Pass';
        that.color[0] = 'green';
      }
    });
    return true;
  }
  check2password(that): boolean {
    let result = true;
    if (that.model[1] === that.model[2]) {
      that.info[2]  = 'Pass';
      that.color[2] = 'green';
    } else {
      if ( +that.model[2].length > 0) {
        that.info[2]  = 'Two passwords are different';
        that.color[2] = 'red';
        that.logonInputs._results[2].nativeElement.select();
      } else {
        that.info[2]  = 'Re-enter password';
        that.color[2] = '#999';
      }
      result = false;
    }
    return result;
  }

  logon(model) {
    const params = {
      custom: { type: 'P'},
      person: {
        username: model.username,
        pwd: model.pwd,
        email: model.email,
        times: '0'
      },
      code: model.code,
      action: 'custom_create',
      language: this.ls.getLanguageId() - 1,
      token: this.ls.get('sessionid')
    };
    return this.requestService.post('/woo/index.php?cmd=Custom', JSON.stringify(params)).then(rs => {
      return rs;
    });
  }
  canRegister(): boolean {
    let result = true;
    for (const item of this.info) {
      if (item !== 'Pass') {
        result = false;
        break;
      }
    }
    return result;
  }
  // 校验 input 输入框的值
  // @param index : integer, 指定要校验的 input 输入框
  validateInput(index) {
    let result = true;
    if (this.regex[index].test(this.model[index])) {
      if (isDefined(this.fun[index])) {
        result = this.fun[index](this);
      } else {
        this.info[index]  = 'Pass';
        this.color[index] = 'green';
      }
    } else {
      // ev.target.focus();
      this.info[index]  = this.errinfo[index];
      this.color[index] = 'red';
      result = false;
    }
    if (this.enregister !== this.canRegister()) {
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
    const user = this.model[0] || 'usrname';
    const score = this.testpass(this.model[1], user);
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
