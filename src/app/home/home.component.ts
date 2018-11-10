import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home//home.service';
import { LocalStorage } from '../commons/provider/local-storage';
import { AppComponent } from '../app.component';
import { ValuesService } from '../commons/service/values.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
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
    private router: ActivatedRoute,
    private route: Router,
    private ls: LocalStorage) {
      this.qiye = _parent.qiye;
  }

  ngOnInit() {
    const that = this;
    this.languageid = this.ls.get('languageid') as number;
    this.vs.currentLanguageId().subscribe((value: any) => {that.languageid = value; });
    this.vs.currentQiye().subscribe((value: any) => {that.qiye = value; });
    this.router.data.subscribe((data: {}) => {
      this.goodsClass = data['data'][0];
      this.goods = data['data'][1];
      this.news = data['data'][2];
    });
    }
  introduct() {
    return this.qiye.introducts[this.languageid].split('^');
  }
  newschoose = function(i) {
    this.route.navigate(['news'], { queryParams: { id: i } });
  };
}
