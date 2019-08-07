import { Injectable } from '@angular/core';
import { SettingsService } from 'src/app/commons/service/settings.service';
import { IndexService } from './index//index.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService {
  constructor(
    public cv: SettingsService,
    public is: IndexService
    ) { }
  resolve() {
    const that = this;
    const word: {} = {
      Code: ['缟号'],
      Price: ['价格'],
      Evaluation: ['评价'],
      'people to participate in the evaluation': ['人参加评估'],
      'Purchase quantity': ['购买数量'],
      'Add to cart': ['加入购物车'],
      'With focus on': ['加关注'],
      Introduction: ['详情'],
      Parameters: ['参数'],
      'Physicochemical index': ['理化指标']
    };
    this.cv.addLanguages(word);
  }
}
