import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {NewsService} from '../news//news.service';
import {LocalStorage} from '../commons/provider/local-storage';
import {ValuesService} from '../commons/service/values.service';
import {Router, ActivatedRoute} from '@angular/router';
import { News } from './classes/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService ]
})
export class NewsComponent implements OnInit {
  private news: News;
  private selRow: Number = 0;
  private languageid;
  constructor(
    private _activeRouter: ActivatedRoute,
    private route: Router,
    private ns: NewsService,
    private vs: ValuesService,
    private ls: LocalStorage) {
  }

  ngOnInit() {
    const that = this;
    const language = {'News': ['新闻']};
    this.ns.setLanguage(language);
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
    });
    this._activeRouter.data.subscribe((data: {}) => {
      that.news = data['data'][0];
    });
    // this._activeRouter.data.subscribe(params => {
    this._activeRouter.queryParams.subscribe(params => {
        that.selRow = +params.id || 0;
    });
  }
  newschoose = function(i) {
    this.route.navigate(['news'], { queryParams: { id: i } });
  };
}
