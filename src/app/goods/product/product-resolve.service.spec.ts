import { TestBed, inject } from '@angular/core/testing';

import { ProductResolveService } from './product-resolve.service';
import { SettingsService } from 'src/app/commons/service/settings.service';
import { IndexService } from './index/index.service';
import { LocalStorage } from 'src/app/commons/provider/local-storage';
import { HttpModule } from '@angular/http';
import { TranslatePipe } from 'src/app/translate.pipe';

describe('ProductResolveService', () => {
  let service: ProductResolveService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpModule,
      // RouterTestingModule
    ],
    providers: [
      // RequestService,
      LocalStorage,
      SettingsService,
      IndexService,
      TranslatePipe
    ]
  }));

  beforeEach(inject([ProductResolveService], s => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should executed', () => {
    const word: {} = {
      Code: ['缟号'],
      Price: ['价格'],
      Evaluation: ['评价'],
      'Purchase quantity': ['购买数量'],
      'Add to cart': ['加入购物车'],
      'With focus on': ['加关注'],
      Introduction: ['详情'],
      Parameters: ['参数'],
      'Physicochemical index': ['理化指标'],

      'Over the past 12 years, Yunrui ': ['12 年来，云瑞'],
      ' has continuously improved its appearance and internal quality by virtue of its core technology and innovative spirit.':
      ['凭借核心工艺和创新精神，持续改进棚板的外观和内在质量。'],
    };
    spyOn(service.cv, 'addLanguages');
    service.resolve();
    expect(service.cv.addLanguages).toHaveBeenCalled();
    expect(service.cv.addLanguages).toHaveBeenCalledTimes(1);
    expect(service.cv.addLanguages).toHaveBeenCalledWith(word);
  });
});
