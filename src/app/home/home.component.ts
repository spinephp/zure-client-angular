import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home//home.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { AppComponent } from '../app.component';
import { ValuesService } from '../commons/service/values.service';
import { SettingsService } from '../commons/service/settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Kind } from '../goods/classes/kind';
import { Product } from '../goods/classes/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  private qiye;
  private _languageid: number;
  get languageid(): number { return this._languageid; }
  set languageid(langid: number) { this._languageid = langid; }
  private _goodsClass: Kind;
  get goodsClass(): Kind { return this._goodsClass; }
  set goodsClass(gclass: Kind) { this._goodsClass = gclass; }
  private _goods: Product;
  get goods(): Product { return this._goods; }
  set goods(goods: Product) { this._goods = goods; }
  private _news: Product;
  get news(): Product { return this._news; }
  set news(news: Product) { this._news = news; }
  private introduct;
  private rooturl: String;
  constructor(
    private _parent: AppComponent,
    private hs: HomeService,
    private vs: ValuesService,
    private ss: SettingsService,
    private router: ActivatedRoute,
    private route: Router,
    private ls: LocalStorage) {
      this.qiye = _parent.qiye;
      this.rooturl = ss.rootUrl;
  }

  ngOnInit() {
    const that = this;
    this.languageid = +this.ls.get('languageid');
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
    });
    this.vs.currentQiye().subscribe((value: any) => {
      that.qiye = value;
    });
    this.router.data.subscribe((data: {}) => {
      that.goodsClass = data['data'][0];
      that.goods = data['data'][1];
      that.news = data['data'][2];
    });
    }

  // 点击了新闻条目
  newschoose = function(i) {
    // 路由到 news 页面，显示第 i 条新闻
    this.route.navigate(['news'], { queryParams: { id: i } });
  };
  goodschoose = function(id) {
    this.route.navigate(['products/product', id ]);
    // this.route.navigate(['products/product'], { queryParams: { id: id } });
    // this.route.navigate(['products'], { queryParams: { id: 'p' + id } });
  };
}
