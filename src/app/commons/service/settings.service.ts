import { Injectable } from '@angular/core';
import {LocalStorage} from '../provider/local-storage';
import { isFunction } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public languages;
  private dataCallBack;
  constructor(private ls: LocalStorage) { }
  baseUrl = 'http://192.168.1.16/woo/index.php';
  // baseUrl = 'http://127.0.0.1/woo/index.php';
  languageid = this.ls.get('languageid') || 1;
  sessionid = this.ls.get('sessionid') || '';
  language0 = {// 页眉
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
  setLanguage = function(language) {
    this.languages = Object.assign(language, this.language0);
    if (isFunction( this.dataCallBack)) {
      this.dataCallBack(this.languages);
    }
  };
  setCallBack(fun) {
    if (isFunction(fun)) {
      this.dataCallBack = fun;
      fun(this.languages);
    }
  }
  getLanguage = function(): {} {
    return this.languages;
  };
}
