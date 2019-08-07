import { Component, OnInit, ViewChildren } from '@angular/core';
import { Model } from './model/model';
import { TranslatePipe } from '../translate.pipe';
import { LocalStorage } from '../commons/provider/local-storage';
import { RegisterService } from './register.service';
import { ValuesService } from '../commons/service/values.service';
import { TabHeadingDirective } from 'ngx-bootstrap';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public languageid: number;

  constructor(
    private rs: RegisterService,
    private ls: LocalStorage,
    private vs: ValuesService,
    private tr: TranslatePipe
  ) { }

  urlValidate = '/woo/admin/checkNum_session.php';
  usernameinfocolor = '#999';
  model = new Model();
  regex = [
    /^[a-zA-Z]{1}[a-zA-Z0-9\-\_\@\.]{4,16}[a-zA-Z0-9]{1}$/,
    /^[\w\-\!\@\#\$\%\^\&\*]{6,16}$/,
    /^[\w\-\!\@\#\$\%\^\&\*]{6,16}$/,
    /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.\w+$/,
    /^[a-zA-Z0-9]{4}$/
  ];
  info = ['Enter user name', 'Enter password', 'Re-enter password', 'Enter email', 'Enter code'];
  color = ['#999', '#999', '#999', '#999', '#999'];
  fun = [this.checkUserName, undefined, this.check2password];
  @ViewChildren('formLogon') logonInputs; // : ElementRef[];
  @ViewChildren('logonButton') logonButtons;

  ngOnInit() {
    const that = this;
    this.vs.currentLanguageId().subscribe((value: number) => {
      that.languageid = value;
    });
  }

  // 注册
  logon() {
    if (this.model.pwd !== this.model.repwd) {
      alert(this.tr.transform('The two passwords you typed are not consistent. \n please re-enter.'));
      // this.model.pwd = null;
      // this.model.repwd = null;
      this.logonInputs._results[2].nativeElement.select();
    } else {
      // this.logonFormSubmitted = true;
      const params = {
        custom: { type: 'P'},
        person: {
          username: this.model.username,
          pwd: this.model.pwd,
          email: this.model.email,
          times: '0'
        },
        code: this.model.code,
        action: 'custom_create',
        language: 1,
        token: this.ls.get('sessionid')
      };
      const that = this;
      this.rs.logon(params).then((rs: any) => {
        if (rs.id > -1) {
          // that.aPerson = new APerson(rs.person);
          // that.aCustom = new ACustom(rs.custom);
          alert(that.tr.transform('Congratulations,') + rs.register + '\n' + rs.email);
          that.logonButtons.last.nativeElement.click(); // 关闭注册框
        } else {
          switch (rs.error) {
            case 'Access Denied':
              window.location.reload();
              break;
            case 'Validate Code Error!':
              alert(that.tr.transform('Verify code error, please fill in.'));
              that.resetValidate();
              // that.logonInputs.nativeElement.
          }
        }
      });
    }
  }

  // 重获验证码
  resetValidate() {
    this.urlValidate = '/woo/admin/checkNum_session.php?' + Math.ceil(Math.random() * 1000);
    this.logonInputs.last.nativeElement.select(); // 全选验证码文本
  }

  // 校验 input 输入框的值
  // @param index : integer, 指定要校验的 input 输入框
  validateInput(index) {
    let result = true;
    if (this.regex[index].test(this.model.username)) {
      if (isDefined(this.fun[index])) {
        result = this.fun[index](this);
      } else {
        this.info[index]  = 'Pass';
        this.color[index] = 'green';
      }
    } else {
      // ev.target.focus();
      this.info[index]  = 'Invalid user name';
      this.color[index] = 'red';
      result = false;
    }
    return result
  }

  // AJAX 检查用户名是否存在，如用户名存在，用绿色在 username_err_info 指定处显示"通过"，
  // 否则用红色在 username_err_info 指定处显示"用户名已存在"或其它错误信息。
  // @param string value - 包含用户名的字符串
  checkUserName(that) {
    // const that = this;
    that.rs.getUsername(that.model.username).then(rs => {
      that.info[0]  = rs.info;
      that.color[0] = rs.color;
    });
  }
  check2password(that) {
    let result = true;
    if (that.model.pwd === that.model.repwd) {
      that.info[2]  = 'Pass';
      that.color[2] = 'green';
    } else {
      that.info[2]  = 'Two passwords are different';
      that.color[2] = 'red';
      result = false;
    }
    return result;
  }
}

