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
  private selRow = 0;
  private languageid;
  constructor(
    private xactiveRouter: ActivatedRoute,
    private route: Router,
    private ns: NewsService,
    private vs: ValuesService,
    private ls: LocalStorage) {
  }

  ngOnInit() {
    const that = this;
    const language = {News: ['新闻']};
    this.ns.setLanguage(language);
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
    });
    this.xactiveRouter.data.subscribe((data: {}) => {
      const sdata = 'data';
      that.news = data[sdata][0];
    });
    // this._activeRouter.data.subscribe(params => {
    this.xactiveRouter.queryParams.subscribe(params => {
        that.selRow = +params.id || 0;
    });
  }
  newschoose = function(i) {
    this.route.navigate(['news'], { queryParams: { id: i } });
  };
}
