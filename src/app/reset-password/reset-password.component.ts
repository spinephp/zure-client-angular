import { Component, OnInit, ViewChildren } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { ValuesService } from '../commons/service/values.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private languageid;
  constructor(
    private rs: RegisterService,
    private vs: ValuesService,
  ) { }
  @ViewChildren('formResetpwd') resetpwdInputs; // : ElementRef[];
  @ViewChildren('resetpwdButton') resetpwdButtons;

  ngOnInit() {
    const that = this;
    this.vs.currentLanguageId().subscribe((value: number) => {
      that.languageid = value;
    });
  }

  resetpwd() {
    if (!this.rs.validateAll(this.resetpwdInputs)) {
      return false;
    }
    const that = this;
    this.rs.resetpwd().then((rs) => {
      if (rs.id === -1) {
        switch (rs.username) {
          case 'Invalid user name!':
            that.rs.model.info[0] = rs.username;
            that.resetpwdInputs._results[0].nativeElement.select();
            break;
          case 'Invalid email':
            that.rs.model.info[3] = rs.username;
            that.resetpwdInputs._results[1].nativeElement.select();
            break;
          case 'Validate Code Error':
            that.rs.model.info[4] = rs.username;
            that.resetpwdInputs._results[2].nativeElement.select();
            break;
          default:
            alert(rs.username);
            that.resetpwdButtons.first.nativeElement.click(); // 关闭登录框
        }
      } else {
        that.resetpwdButtons.first.nativeElement.click(); // 关闭登录框
      }
      return true;
    });
  }

}
