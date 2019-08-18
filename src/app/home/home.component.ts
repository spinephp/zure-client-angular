import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home//home.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { AppComponent } from '../app.component';
import { ValuesService } from '../commons/service/values.service';
import { SettingsService } from '../commons/service/settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Kind } from '../goods/classes/kind';
import { Product } from '../goods/classes/product';
import { Userlogin } from './classes/userlogin';
import { ALoginer, LoginerData } from '../classes/loginer';
// import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  get languageid(): number { return this.xlanguageid; }
  set languageid(langid: number) { this.xlanguageid = langid; }
  get goodsClass(): Kind { return this.xgoodsClass; }
  set goodsClass(gclass: Kind) { this.xgoodsClass = gclass; }
  get goods(): Product { return this.xgoods; }
  set goods(goods: Product) { this.xgoods = goods; }
  get news(): Product { return this.xnews; }
  set news(news: Product) { this.xnews = news; }
  constructor(
    private xparent: AppComponent,
    private hs: HomeService,
    // private loginservice: LoginService,
    private vs: ValuesService,
    private ss: SettingsService,
    private router: ActivatedRoute,
    private route: Router,
    private ls: LocalStorage) {
      this.qiye = xparent.qiye;
      this.rooturl = ss.rootUrl;
  }
  private qiye;
  private xlanguageid: number;
  private xgoodsClass: Kind;
  private xgoods: Product;
  private xnews: Product;
  private introduct;
  private rooturl: string;
  // token = this.ls.get('sessionid');
  // loginModel = new Userlogin(null, null, null, null, null);
  // loginFormSubmitted = false;
  // urlValidate = '/woo/admin/checkNum_session.php';
  // onSubmit() {
  //   this.loginFormSubmitted = true;
  //   const that = this;
  //   this.loginservice.login().then((rs: LoginerData) => {
  //     that.vs.setLoginer(rs);
  //   });
  // }

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
      const sdata = 'data';
      that.goodsClass = data[sdata][0];
      that.goods = data[sdata][1];
      that.news = data[sdata][2];
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
  // resetValidate = () => {
  //   this.urlValidate = '/woo/admin/checkNum_session.php?' + Math.ceil(Math.random() * 1000);
  //   this.loginModel.code = null;
  // }

}
