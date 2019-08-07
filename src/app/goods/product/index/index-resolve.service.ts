import { Injectable } from '@angular/core';
import { SettingsService } from '../../../commons/service/settings.service';
import { IndexService } from '../index//index.service';

@Injectable({
  providedIn: 'root'
})
export class IndexResolveService {
  constructor(
    public cv: SettingsService,
    public is: IndexService
    ) { }
  resolve(): {} {
    const that = this;
    const word: {} = {
      ITEM: ['项目'],
      UNIT: ['单位'],
      SPEC: ['指标'],
      ENVIRONMENT: ['检测环境'],
      'Physico index': ['物理指标'],
      'Chemical index': ['化学指标']
    };
    this.cv.addLanguages(word);
    return Promise.all(that.is.get()).then(rs => {
      return rs;
    });
}
}
