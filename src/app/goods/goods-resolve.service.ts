import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from '../commons/service/settings.service';
import { GoodsService } from '../goods//goods.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsResolveService {

  constructor(
    // private router: Router,
    public cv: SettingsService,
    public hs: GoodsService,
    ) { }
  resolve(): {} {
    const word: {} = {
      'News': ['新闻', 'zz']
    };
    this.cv.addLanguages(word);
    return this.hs.updateData().then(rs => {
      return rs;
    });
  }
}
