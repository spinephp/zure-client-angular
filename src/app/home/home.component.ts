import { Component, OnInit } from '@angular/core';
import {HomeService} from '../home//home.service';
import {LocalStorage} from '../commons/provider/local-storage';
import { AppComponent } from '../app.component';
import {ValuesService} from '../commons/service/values.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private qiye;
  private goodsClass = [];
  private goods = [];
  public news = [];
  private languageid;
  constructor(
    private _parent: AppComponent,
    private hs: HomeService,
    private vs: ValuesService,
    private ls: LocalStorage) {
      this.qiye = _parent.qiye;
  }

  ngOnInit() {
    const that = this;
    const language = {'Sign in': ['登录']};
    this.hs.setLanguage(language);
    this.languageid = this.ls.get('languageid') as number;
    this.vs.currentLanguageId().subscribe((value: any) => {that.languageid = value; });
    this.vs.currentQiye().subscribe((value: any) => {that.qiye = value;});
    Promise.all(this.hs.get()).then(rs => {
      // console.log(rs);
      that.goodsClass = rs[0];
      that.goods = rs[1];
      that.news = rs[2];
    });
  }
  introduct() {
    return this.qiye.introducts[this.languageid].split('^');
  }
}
