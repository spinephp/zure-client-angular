import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SettingsService} from '../commons/service/settings.service';
import { NewsService } from '../news//news.service';

@Injectable({
  providedIn: 'root'
})
export class NewsResolveService implements Resolve<{}> {

  constructor(
    private router: Router,
    private cv: SettingsService,
    private ns: NewsService,
    ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): {} {
    const word: {} = {
      'News': ['新闻', 'zz']
    };
    this.cv.addLanguages(word);
    return this.ns.get().then(rs => {
      return rs;
    });
  }
}
