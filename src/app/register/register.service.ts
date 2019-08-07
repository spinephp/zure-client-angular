import { Injectable } from '@angular/core';
import { RequestService } from '../commons/service/request.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { TranslatePipe } from '../translate.pipe';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private requestService: RequestService,
    private ls: LocalStorage,
    private tr: TranslatePipe
  ) { }

  // 从远程服务器取用户名
  getUsername(username: string) {
    const param = {
      filter: ['id', 'username'],
      cond: [{ field: 'username', value: username, operator: 'eq' }],
      token: this.ls.get('sessionid')
    };
    const url = '/woo/index.php? cmd=Person&' + jQuery.param(param);
    return this.requestService.get(url, null).then(rs => {
      const item = {info: 'Pass', color: 'green'};
      if (rs.length !== 0) {
        item.info = 'User name already exists';
        item.color = 'red';
      }
      return item;
    });
  }

  logon(param) {
    return this.requestService.post('/woo/index.php?cmd=Custom', JSON.stringify(param)).then(rs => {
      return rs;
    });
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

  checkpass(pass, username) {
    const user = username || 'usrname';
    const score = this.testpass(pass, user);
    const passwordLabel = $('#password_label');
    if (score === -4) {
      passwordLabel.html('<span style="height:20px;line-height:20px;display:block;">' + this.tr.transform('Short') + '</span>');
    } else if (score === -2) {
      passwordLabel.html('<span style="height:20px;line-height:20px;display:block;">'
      + this.tr.transform('Same user name') + '</span>');
    } else {
      const color = score < 34 ? '#edabab' : (score < 68 ? '#ede3ab' : '#d3edab');
      const text = score < 34 ? 'Weak' : (score < 68 ? 'General' : 'Very good');
      const width = score + '%';
      passwordLabel.html('<span style="width:'
      + width + ';display:block;overflow:hidden;height:20px;line-height:20px;background:'
      + color + ';">' + this.tr.transform(text) + '</span>');
    }
  }
}
