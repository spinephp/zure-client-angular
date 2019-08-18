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

  // 注册
  logon() {
    if (!this.rs.validateAll(this.logonInputs)) {
      return false;
    }
    if (!this.rs.model.equal2password()) {
      alert(this.tr.transform('The two passwords you typed are not consistent. \n please re-enter.'));
      this.logonInputs._results[2].nativeElement.select();
      return false;
    } else {
      // this.logonFormSubmitted = true;
      const that = this;
      this.rs.logon().then((rs: any) => {
        if (rs.id > -1) {
          alert(that.tr.transform('Congratulations,') + rs.register + '\n' + rs.email);
          that.logonButtons.last.nativeElement.click(); // 关闭注册框
          that.rs.init();
          return true;
        } else {
          switch (rs.error) {
            case 'Access Denied':
              window.location.reload();
              break;
            case 'Validate Code Error!':
              alert(that.tr.transform('Verify code error, please fill in.'));
              that.rs.resetValidate(that.logonInputs.last.nativeElement);
          }
          return false;
        }
      });
    }
  }
}

