import { Injectable } from '@angular/core';
import {LocalStorage} from '../provider/local-storage';
import { isFunction } from 'util';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _datas = {};
  private _languages: Subject<{}> = new Subject<{}>();
  public languages;
  constructor(private ls: LocalStorage) { }
  // rootUrl = 'http://www.yrr8.com/woo/';
  // rootUrl = 'http://127.0.0.1/woo/';
  rootUrl = 'http://192.168.1.16/woo/';
  baseUrl = this.rootUrl + 'index.php';
  imgUrl = this.rootUrl + 'images/';
  sessionid = this.ls.get('sessionid') || '';
  language0: {} = {// 页眉
    'YunRui': ['云瑞'],
    'My YunRui': ['我的云瑞'],
    'Hello, please': ['您好，请'],
    'Go my YunRui': ['去我的云瑞首页'],
    'The latest order status': ['最新订单状态'],
    'Check all order': ['查看所有订单'],
    'Pending orders': ['待处理订单'],
    'Consulting reply': ['咨询回复'],
    'Prices of goods': ['降价商品'],
    'My attention': ['我的关注'],
    'Go cart': ['购物车'],
    'The newest goods': ['最新加入的商品'],
    'Delete': ['删除'],
    'Orders containing': ['订单包含'],
    'kinds of products': ['种产品'],
    'A combined': ['合计'],
    'Order settlement': ['订单结算'],
    'AddFavorite': ['加入收藏'],
    'SetHomepage': ['设为首页'],
    'Home': ['首页'],
    'Search': ['搜索'],
    // 页脚
    'Address': ['地址'],
    'ICP': ['备案号'],
    'Tel': ['电话'],
    'Copyright': ['版权'],
    'All right reserved': ['保留所有权利']
  };
  public addLanguages(langs: {}): void {
    this.languages = Object.assign(langs, this.language0);
    this._languages.next(this.languages);
  }

  public getLanguages(): Observable<{}> {
      return this._languages.asObservable();
  }
  setLanguage = function(language: {}) {
    this.languages = Object.assign(language, this.language0);
  };
  getLanguage = function(): {} {
    return this.languages;
  };
  set = function(name: string, value: any) {
    this._datas[name] = value;
  };
  get = function(name: string) {
    return this._datas[name];
  };
  delete = function(name: string) {
    delete this._datas[name];
  };
}
