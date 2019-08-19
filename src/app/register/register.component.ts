import { Component, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
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

  @ViewChildren('formLogon') logonInputs; // : ElementRef[];
  @ViewChildren('logonButton') logonButtons;

  ngOnInit() {
    const that = this;
    this.vs.currentLanguageId().subscribe((value: number) => {
      that.languageid = value;
    });
    // this.rs.model.setActive([0, 1, 2, 3, 4]);
  }

  setType(type: number) {
    this.rs.model.setActive(type);
  }
  // 注册
  logon() {
    if (!this.rs.validateAll(this.logonInputs)) {
      return false;
    } else {
      // this.logonFormSubmitted = true;
      const that = this;
      this.rs.logon().then((rs: any) => {
        const type = 'type';
        if (rs.id > -1) {
          [that.successLogon, that.successLogin, that.successResetPassword][rs[type]](rs, that);
          that.logonButtons.first.nativeElement.click(); // 关闭登录框
          that.rs.init();
        } else {
          [that.errorLogon, that.errorLogin, that.errorResetPassword][rs[type]](rs, that);
        }
      });
    }
  }
  successLogon(rs, that) {
    alert(that.tr.transform('Congratulations,') + rs.register + '\n' + rs.email);
  }
  successLogin(rs, that) {
    that.vs.setLoginer(rs);
  }
  successResetPassword(rs, that) {
  }
  errorLogon(rs, that) {
    switch (rs.error) {
      case 'Access Denied':
        window.location.reload();
        break;
      case 'Validate Code Error!':
        alert(that.tr.transform('Verify code error, please fill in.'));
        that.rs.resetValidate(that.logonInputs.last.nativeElement);
    }
  }
  errorLogin(rs, that) {
    switch (rs.error) {
      case 'Access Denied':
        window.location.reload();
        break;
      case 'Validate Code Error!':
        alert(that.tr.transform('Verify code error, please fill in.'));
        that.rs.resetValidate(that.logonInputs.last.nativeElement);
    }
  }
  errorResetPassword(rs, that) {
    switch (rs.username) {
      case 'Invalid user name!':
        that.rs.model.info[0] = rs.username;
        that.logonInputs._results[0].nativeElement.select();
        break;
      case 'Invalid email':
        that.rs.model.info[3] = rs.username;
        that.logonInputs._results[1].nativeElement.select();
        break;
      case 'Validate Code Error':
        that.rs.model.info[4] = rs.username;
        that.logonInputs._results[2].nativeElement.select();
        break;
      default:
        alert(rs.username);
    }
  }
  hide() {
    this.rs.model.setActive(2);
    // this.logonButtons.first.nativeElement.click(); // 关闭登录框
  }
}

