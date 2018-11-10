import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news//news.service';
import {LocalStorage} from '../commons/provider/local-storage';
import {ValuesService} from '../commons/service/values.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  private news = [];
  private selRow = 0;
  private languageid;
  constructor(
    // private _brothod: HomeComponent,
    private _activeRouter: ActivatedRoute,
    private route: Router,
    private hs: NewsService,
    private vs: ValuesService,
    private ls: LocalStorage) {
    // this.news = _brothod.news;
  }

  ngOnInit() {
    const that = this;
    const language = {'News': ['新闻']};
    this.hs.setLanguage(language);
    this.languageid = this.ls.get('languageid') as number;
    this.vs.currentLanguageId().subscribe((value: any) => {that.languageid = value; });
    this.hs.get().then(rs => {
      that.news = rs;
    });
    this._activeRouter.queryParams.subscribe(params => {
      that.selRow = params.id;
    });
  }
  newschoose = function(i) {
    this.route.navigate(['news'], { queryParams: { id: i } });
  };
}
