import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from '../../../commons/service/settings.service';
import { IndexService } from '../index//index.service';

@Injectable({
  providedIn: 'root'
})
export class IndexResolveService {
  private cid;
  constructor(
    private router: Router,
    private cv: SettingsService,
    private is: IndexService
    ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): {} {
    const that = this;
    const word: {} = {
      'News': ['新闻', 'zz']
    };
    this.cv.addLanguages(word);
    return Promise.all(that.is.get()).then(rs => {
      return rs;
    });
}
}
