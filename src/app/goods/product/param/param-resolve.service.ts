import { Injectable } from '@angular/core';
import { SettingsService } from '../../../commons/service/settings.service';
import { IndexService } from '../index//index.service';

@Injectable({
  providedIn: 'root'
})
export class ParamResolveService {
  constructor(
    public cv: SettingsService,
    public is: IndexService
    ) { }
  resolve() {
    const that = this;
    const word: {} = {
      'Product parameters': ['产品参数'],
      'Item ID': ['项目名称'],
      'Item Name': ['项目内容'],
      Material: ['材质'],
      Length: ['长度'],
      Type: ['类型'],
      Width: ['宽度'],
      Weight: ['重量'],
      Think: ['高度']
    };
    this.cv.addLanguages(word);
  }
}
