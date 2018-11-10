import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SettingsService} from '../commons/service/settings.service';
import { isObject } from 'util';
import { Observable } from 'rxjs';
import { HomeService } from '../home//home.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolveService implements Resolve<{}> {

  constructor(
    private router: Router,
    private cv: SettingsService,
    private hs: HomeService,
    ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): {} {
    const word: {} = {
      'News': ['新闻', 'zz']
    };
    this.cv.addLanguages(word);
    return Promise.all(this.hs.get()).then(rs => {
      // console.log(rs);
      return rs;
    });
    const language = this.cv.getLanguage();
    if (isObject(language)) {
      return language;
    } else {
      // this.router.navigate(['../'], {relativeTo: route});
      return {};
    }
  }
}
