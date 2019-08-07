import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {SettingsService} from './settings.service';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private options: any;
  constructor(private http: Http, private ss: SettingsService) {
    const header: any = new Headers();
    // header.append('Access-Control-Allow-Origin', '*'); // 允许跨域
    // header.append('Access-Control-Allow-Credentials', true); // 允许 cookie
    this.options = new RequestOptions({headers: header});
}

  /**
   * 统一发送请求
   * @param params 参数
   * @returns Promise<{success: boolean, msg: string}>|Promise<R>  返回数据
   */
//  public request(params: any): any {
//       if (params['method'] === 'post' || params['method'] === 'POST') {
//         return this.post(params['url'], params['data']);
//       } else {
//         return this.get(params['url'], params['data']);
//       }
//     }

  getUrl(cmd: string, filter: string[], condition: object[] = null) {
    const url = {};
    const cmdstr = `?cmd=${cmd}`;
    const data = {token: this.ss.sessionid, filter: '', cond: ''};
    if (filter && filter.length > 0) {
      data.filter = JSON.stringify(filter);
    }
    if (condition && condition.length > 0) {
      data.cond = JSON.stringify(condition);
    }
    url[cmdstr] = data;
    return url;
  }

  _get(param) {
    function success(data) {
      return data;
    }

    function error(err) {
      alert('error occured!\n' + err);
    }
    const promises = [];
    for (const i of Object.keys(param)) {
      for (const k of Object.keys(param[i])) {
        promises.push(this.get(this.ss.baseUrl + k, param[i][k]).then(success, error));
      }
    }
    return promises;
  }

  /**
   * get 请求
   * @param url 接口地址
   * @param params 参数
   * @returns Promise<R>|Promise<U> 返回数据
   */
  public get(url: string, params: any): any {
    return this.http.get(url, {search: params})
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(res => this.handleError(res));
  }

  /**
   * post请求
   * @param url 接口地址
   * @param params 参数
   * @returns Promise<R>|Promise<U> 返回数据
   */
  public post(url: string, params: any) {
    return this.http.post(url, params, this.options)
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(res => this.handleError(res));
  }

  /**
   * 处理请求成功
   * @param res  参数
   * @returns data:(string|null|((node:any)=>any) 返回数据
   */
  private handleSuccess(value: Response) {
      return value;
  }

  /**
   * 处理请求错误   // tslint:disable-next-line:no-redundant-jsdoc
   * @param error  参数
   * @returns void|Promise<string>|Promise<T>|any  返回数据
   */
  private handleError(error): Promise<any> {
    // console.log(error);
    // const msg = '请求失败';
    // if (error.status === 400) {
    //   console.log('请求参数正确');
    // }
    // if (error.status === 404) {

    //   console.error('请检查路径是否正确');
    // }
    // if (error.status === 500) {
    //   console.error('请求的服务器错误');
    // }
    return Promise.reject({success: false, error: error.message});

  }
}
