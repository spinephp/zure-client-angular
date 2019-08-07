import { Injectable } from '@angular/core';
import {LocalStorage} from '../provider/local-storage';
import { isFunction } from 'util';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private xdatas = {};
  private xlanguages: Subject<{}> = new Subject<{}>();
  public languages;
  constructor(private ls: LocalStorage) { }
  // rootUrl = 'http://www.yrr8.com/woo/';
  // rootUrl = 'http://127.0.0.1/woo/';
  // rootUrl = 'http://192.168.1.107/woo/'; // 服务器无线
  rootUrl = 'http://192.168.1.22/woo/';  // 服务器有线
  baseUrl = this.rootUrl + 'index.php';
  imgUrl = this.rootUrl + 'images/';
  sessionid = this.ls.get('sessionid') || '';
  language0: {} = {// 页眉
    YunRui: ['云瑞'],
    Yunrui: ['云瑞'],
    'My YunRui': ['我的云瑞'],
    'Hello, please': ['您好，请'],
    Login: ['登录'],
    Logout: ['退出登录'],
    Logon: ['注册'],
    'Go my YunRui': ['去我的云瑞首页'],
    'The latest order status': ['最新订单状态'],
    'Check all order': ['查看所有订单'],
    'Pending orders': ['待处理订单'],
    'Consulting reply': ['咨询回复'],
    'Prices of goods': ['降价商品'],
    'My attention': ['我的关注'],
    'Go cart': ['购物车'],
    'The newest goods': ['最新加入的商品'],
    Delete: ['删除'],
    'Orders containing': ['订单包含'],
    'kinds of products': ['种产品'],
    'A combined': ['合计'],
    'Order settlement': ['订单结算'],
    AddFavorite: ['加入收藏'],
    SetHomepage: ['设为首页'],
    Home: ['首页'],
    Search: ['搜索'],
    // 页脚
    Address: ['地址'],
    ICP: ['备案号'],
    Tel: ['电话'],
    Copyright: ['版权'],
    'All right reserved': ['保留所有权利'],

    // 注册对话框
    'Enter user name': ['请输入用户名'],
    'Password format error': ['密码格式错误'],
    'User name already exists': ['用户名已存在'],
    'Email format error': ['邮箱格式错误'],
    'Invalid phone number': ['无效的手机号码'],
    'Invalid telephone number': ['无效的电话号码'],
    'Invalid user name': ['无效的用户名'],
    'User name can not be empty': ['用户名不能为空'],
    'User name cannot begin with a number': ['用户名不能以数字开头'],
    'Valid length 6-18 characters': ['合法长度为6-18个字符'],
    'The user name can only contain _, English letters, numbers': ['用户名只能包含_,英文字母,数字'],
    'User name can only be the end of the English letters or numbers': ['用户名只能英文字母或数字结尾'],
    'The two passwords you typed are not consistent. \n please re-enter.': ['分别键入的两个密码不一致!\n请重新输入。'],
    'Error form submission, please try again later': ['表单提交出错，请稍候再试'],
    'Congratulations,': ['恭喜您，'],
    'Verify code error, please fill in.': ['验证码错误，请重新填写。']
    };
  public addLanguages(langs: {}): void {
    this.languages = Object.assign(langs, this.languages);
    this.xlanguages.next(this.languages);
  }

  public getLanguages(): Observable<{}> {
      return this.xlanguages.asObservable();
  }
  setLanguage = function(language: {}) {
    this.languages = Object.assign(language, this.language0);
  };
  getLanguage = function(): {} {
    return this.languages;
  };
  set = function(name: string, value: any) {
    this.xdatas[name] = value;
  };
  get = function(name: string) {
    return this.xdatas[name];
  };
  delete = function(name: string) {
    if (this._datas[name]) {
      delete this.xdatas[name];
    }
  };
}
