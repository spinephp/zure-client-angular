import { Injectable } from '@angular/core';
import { SettingsService } from '../../../commons/service/settings.service';
import { IndexService } from '../index//index.service';

@Injectable({
  providedIn: 'root'
})
export class IntroductionResolveService {
  constructor(
    public cv: SettingsService,
    public is: IndexService
    ) { }
  resolve() {
    const that = this;
    const word: {} = {
      'Brand name': ['品牌名称'],
      'Applicable industries': ['适用行业'],
      'Place of Origin': ['源产地'],
      'Valuation unit': ['估价单位'],
      'Chinese Mainland': ['中国大陆'],
      'CONTINUOUS IMPROVEMENT': ['持续改进'],
      'Over the past': ['过去的'],
      years: ['年'],
      // tslint:disable-next-line:max-line-length
      'on the basis of UK core technology, Yunrui continuously innovates and improves the appearance and internal quality of products.': ['云瑞在英国核心技术的基础上，持续创新，不断改进产品的外观和内在品质。'],
      'More stable quality': ['质量更稳定'],
      'Smoother surface': ['表面更光滑'],
      'The corners are more straight': ['边角更平直'],
      'More uniform density': ['密度更均匀'],
      'Longer life span': ['寿命更长久'],
    };
    this.cv.addLanguages(word);
  }
}
