import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from '../commons/service/settings.service';
import { GoodsService } from '../goods//goods.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsResolveService {

  constructor(
    private router: Router,
    private cv: SettingsService,
    private hs: GoodsService,
    ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): {} {
    const word: {} = {
      'News': ['新闻', 'zz']
    };
    this.cv.addLanguages(word);
    return Promise.all(this.hs.get()).then(rs => {
      return rs;
    });
  }
}
