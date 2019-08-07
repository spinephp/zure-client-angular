import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from '../commons/service/settings.service';
import { HomeService } from '../home//home.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolveService {

  constructor(
    private router: Router,
    private cv: SettingsService,
    private hs: HomeService,
    ) { }
  resolve(): {} {
    const word: {} = {
      'Sign in': ['登录'],
      'Click get another pin': ['点击更换较验码'],
      'Sign up': ['注册'],
      'Forget Password': ['忘记密码'],
      News: ['新闻'],
      Contact: ['联系方式'],
      'Click here to send a message to me': ['点击给我发信息'],
      Tel: ['电话'],
      Fax: ['传真'],
      Email: ['邮箱'],
      Url: ['网址'],
      'Company profile': ['公司简介'],
      'Product recommendations': ['产品展示'],
      More: ['更多'],
    };
    this.cv.addLanguages(word);
    return this.hs.updateData().then(rs => {
      return rs;
    });
  }
}
