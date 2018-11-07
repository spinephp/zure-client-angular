import { Component, OnInit } from '@angular/core';
import {HomeService} from '../home//home.service';
import {LocalStorage} from '../commons/provider/local-storage';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private qiye;
  private goodsClass = [];
  private goods = [];
  private news = [];
  private languageid;
  constructor(private _parent: AppComponent, private hs: HomeService, private ls: LocalStorage) {
    this.qiye = _parent.qiye;
  }

  ngOnInit() {
    const that = this;
    const language = {'Sign in': ['登录']};
    this.hs.setLanguage(language);
    Promise.all(this.hs.get()).then(rs => {
      // console.log(rs);
      that.goodsClass = rs[0];
      that.goods = rs[1];
      that.news = rs[2];
      that.languageid = parseInt(this.ls.get('languageid') as string, 10);
    });
}

}
