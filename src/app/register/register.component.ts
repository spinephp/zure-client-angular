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
    for (const i in this.logonInputs._results) {
      if (!this.rs.validateInput(i)) {
        this.logonInputs._results[i].nativeElement.select();
        return false;
      }
    }
    if (this.rs.model[1] !== this.rs.model[2]) {
      alert(this.tr.transform('The two passwords you typed are not consistent. \n please re-enter.'));
      this.logonInputs._results[2].nativeElement.select();
      return false;
    } else {
      // this.logonFormSubmitted = true;
      const that = this;
      this.rs.logon(this.rs.model).then((rs: any) => {
        if (rs.id > -1) {
          alert(that.tr.transform('Congratulations,') + rs.register + '\n' + rs.email);
          that.logonButtons.last.nativeElement.click(); // 关闭注册框
          return true;
        } else {
          switch (rs.error) {
            case 'Access Denied':
              window.location.reload();
              break;
            case 'Validate Code Error!':
              alert(that.tr.transform('Verify code error, please fill in.'));
              that.resetValidate();
          }
          return false;
        }
      });
    }
  }

  // 重获验证码
  resetValidate() {
    this.urlValidate = '/woo/admin/checkNum_session.php?' + Math.ceil(Math.random() * 1000);
    this.logonInputs.last.nativeElement.select(); // 全选验证码文本
  }
}

